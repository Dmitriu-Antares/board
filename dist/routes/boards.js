'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Boards = require('../models/Boards');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/create', function (req, res) {
    var _req$body = req.body,
        user = _req$body.user,
        name = _req$body.name;

    _Boards.Boards.forge({ name: name, adminID: user }, { hasTimestamps: true }).save().then(function (table) {
        res.status(200).json({
            success: true
        });
    }).catch(function (err) {
        res.status(500).json({ success: false });
    });
});

router.get('/get_boards', function (req, res) {
    var userID = req.query.userID;

    _Boards.Boards.where('adminID', userID).fetchAll().then(function (boards) {
        res.status(200).json({ boards: boards });
    }).catch(function (err) {
        res.status(500).json({ err: err });
    });
});

exports.default = router;
//# sourceMappingURL=boards.js.map