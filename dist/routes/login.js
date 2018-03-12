'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Users = require('../models/Users');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
    var _req$body = req.body,
        username = _req$body.username,
        password = _req$body.password;

    return _Users.Users.query({
        where: { username: username },
        orWhere: { email: username }
    }).fetch().then(function (user) {
        if (user) {
            _bcrypt2.default.compare(password, user.attributes.password, function (err, resp) {
                if (resp) {
                    var cert = 'helloWorld';
                    var token = _jsonwebtoken2.default.sign({
                        username: username,
                        id: user.get('id')
                    }, cert);
                    res.json({ token: token });
                } else {
                    res.status(401).json({ errors: { form: 'invalid creditionals' } });
                }
            });
        } else {
            res.status(401).json({ errors: { form: 'invalid creditionals' } });
        }
    });
});

exports.default = router;
//# sourceMappingURL=login.js.map