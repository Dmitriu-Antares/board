require('babel-core/register');
require('babel-polyfill');
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import signUp from './routes/signUp';
import login from './routes/login';
import boards from './routes/boards';
import tasks from './routes/tasks';
var cors = require('cors');

const app = express();

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(bodyParser.json());
http.createServer(app);


app.get('/',(req,res) => {
    res.send("Hello")
});

app.use('/api/signup', signUp);
app.use('/api/login', login);
app.use('/api/boards', boards);
app.use('/api/tasks', tasks);
app.use('/api/hello', (req,res)=>{
    res.json({hello:'Hello'})
});

app.set('port', (process.env.PORT || 8080));

const server = app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});