'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _Users = require('../models/Users');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var saltRounds = 10;
var salt = _bcrypt2.default.genSaltSync(saltRounds);

function validateInput(data) {
    var errors = {};
    return _Users.Users.query({
        where: { email: data.email },
        orWhere: { username: data.username }
    }).fetch().then(function (user) {
        if (user) {
            if (user.get('username') === data.username) {
                errors.username = 'This username is already in use';
            }
            if (user.get('email') === data.email) {
                errors.email = 'This email is already in use';
            }
            return {
                errors: errors,
                isValid: (0, _isEmpty2.default)(errors)
            };
        } else return { errors: errors, isValid: true };
    });
}

router.post('/', function (req, res) {
    var _req$body = req.body,
        email = _req$body.email,
        fullname = _req$body.fullname,
        username = _req$body.username,
        password = _req$body.password;

    var hashedPassword = _bcrypt2.default.hashSync(password, salt);
    validateInput(req.body).then(function (_ref) {
        var errors = _ref.errors,
            isValid = _ref.isValid;

        console.log(errors, isValid);
        if (isValid) {
            _Users.Users.forge({ fullname: fullname, username: username, email: email, password: hashedPassword }, { hasTimestamps: true }).save().then(function (user) {
                res.status(200).json({
                    success: true
                });
            }).catch(function (err) {
                res.status(500).json({ error: err });
            });
        } else {
            res.status(400).json({ error: errors });
        }
    });
});

exports.default = router;
//# sourceMappingURL=signUp.js.map