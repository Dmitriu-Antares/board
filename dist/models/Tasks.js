'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tasks = undefined;

var _bookshelf = require('../../bookshelf');

var _bookshelf2 = _interopRequireDefault(_bookshelf);

var _Boards = require('./Boards');

var _Boards2 = _interopRequireDefault(_Boards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tasks = exports.Tasks = _bookshelf2.default.Model.extend({
    tableName: 'tasks',
    author: function author() {
        return this.belongsTo(_Boards2.default);
    }
});
//# sourceMappingURL=Tasks.js.map