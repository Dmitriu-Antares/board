'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _signUp = require('./routes/signUp');

var _signUp2 = _interopRequireDefault(_signUp);

var _login = require('./routes/login');

var _login2 = _interopRequireDefault(_login);

var _boards = require('./routes/boards');

var _boards2 = _interopRequireDefault(_boards);

var _tasks = require('./routes/tasks');

var _tasks2 = _interopRequireDefault(_tasks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-core/register');
require('babel-polyfill');

var cors = require('cors');

var app = (0, _express2.default)();

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(_bodyParser2.default.json());
_http2.default.createServer(app);

app.get('/', function (req, res) {
    res.send("Hello");
});

app.use('/api/signup', _signUp2.default);
app.use('/api/login', _login2.default);
app.use('/api/boards', _boards2.default);
app.use('/api/tasks', _tasks2.default);
app.use('/api/hello', function (req, res) {
    res.json({ hello: 'Hello' });
});

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
//# sourceMappingURL=index.js.map