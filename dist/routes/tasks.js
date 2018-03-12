'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Tasks = require('../models/Tasks');

var _Tasks2 = _interopRequireDefault(_Tasks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/add', function (req, res) {
   console.log(req);
});

exports.default = router;
//# sourceMappingURL=tasks.js.map