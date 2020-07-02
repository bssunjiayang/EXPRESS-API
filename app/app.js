var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

const { doesNotMatch } = require('assert');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session(
    {
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: false,
    }
));

var port = process.env.PORT || 3000;

app.use('/route', require('./routes/router'));
app.use('/homepage', express.static('./views/login.html'));
app.use('/public', express.static('./public'));
app.use('/',express.static('./views/index.html'));
//サーバ起動
app.listen(port);
console.log('listen on port ' + port);