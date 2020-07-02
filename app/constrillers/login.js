const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const path = require('path');

var mysql = require('mysql');
const { check, validationResult } = require('express-validator');
const { ValidatorsImpl } = require('express-validator/src/chain');
var mysql_setting = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test'
}

// 上で書き込んだpassport.useの部分を書き換えます。
passport.use(new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "password"
    },
    function (username, password, done) {
        var connection = mysql.createConnection(mysql_setting);
        connection.connect();
        connection.query("select * from user_test;", function (err, users) {
            // usernameもpasswordもユニーク前提
            var usernames = [];
            var passwords = [];
            for (i = 0; i < users.length; i++) {
                usernames.push(users[i].username);
                // input(type="password")で渡される値はstringのようなので、
                // データベースから取り出した値もstringにしています。
                var pw = users[i].password.toString();
                passwords.push(pw);
            }
            if (usernames.includes(username) && passwords.includes(password)) {
                return done(null, username);
            }
            return done(null, false, { message: "invalid" });
        });
    }
));

passport.serializeUser((user, done) => {
    console.log('Serialize ...');
    done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log('Deserialize ...');
    done(null, user);
});

router.use(passport.initialize());
router.use(passport.session());


router.get('/', (req, res) => {
    console.log(req.session);
    res.render('index', { user: req.user });
});

router.get('/failure', (req, res) => {
    console.log(req.session);
    res.send('Failure');
});

router.get('/success', (req, res) => {
    console.log(req.session);
    res.sendFile('index.html', { root: path.join(__dirname, '../views') });
});

router.post('/',
    passport.authenticate('local',
        {
            failureRedirect: '/route/login/failure',
            successRedirect: '/route/login/success'
        }
    )
);

router.post('/logout', (req, res) => {
    req.session.passport.user = undefined;
    res.redirect('/');
});

module.exports = router;