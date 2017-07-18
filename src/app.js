var express       = require('express'),
    path          = require('path'),
    logger        = require('morgan'),
    bodyParser    = require('body-parser'),
    routes        = require('./routes');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use(routes.public);

app.listen(3000);
console.log('Server started on Port 3000');

module.exports = app;