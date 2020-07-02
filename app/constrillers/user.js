var express = require('express');
// ルーティングするで
var router = express.Router();

var db = require('../utils/db')

// routerにルーティングの動作を書いてく

var mysql = require('mysql');
const { check, validationResult } = require('express-validator');
const { ValidatorsImpl } = require('express-validator/src/chain');
var mysql_setting = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test'
}

router.get('/', function (req, res) {

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();

  connection.query('SELECT * FROM user_test	', function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }

    res.json({
      message: result
    });
  });
  connection.end();
});

router.post('/delete', function (req, res) {
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();

  const id = req.body.id;
  connection.query('DELETE FROM user_test WHERE id=?', id, function (error, results, fields) {
    if (error) throw error;
    res.redirect('./');
  });

  res.json({
    message: id
  });
  connection.end();
});

router.get('/add', function (req, res, next) {
  const data = {
    errorMessage: ''
  }
  res.render('add', data);
})

router.post('/add', [
  check('userId')
    .not().isEmpty().trim().escape().withMessage('名前を入力してくさい'),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errors_array = errors.array();

    res.render('add', {
      errorMessage: errors_array,
    })
  } else {
    const userId = req.body.userId;
    const password = req.body.password;
    const post = { 'userId': userId, 'password': password };

    const connection = mysql.createConnection(mysql_setting);
    connection.query('INSERT INTO user_test SET ?', post, function (error, results, fields) {
      if (error) throw error;
      res.redirect('./');
      console.log('ID:', results.insertId);
    });

    connection.end();
  }
})

//localhost:3000/edit
router.get('/edit', function (req, res, next) {

  const id = req.query.id;

  const connection = mysql.createConnection(mysql_setting);
  connection.connect();

  connection.query('SELECT * FROM user_test WHERE id=?', id, function (error, results, fields) {
    if (error) throw error;

    if (!results.length) {
      res.redirect('../');
    } else {
      const data = {
        id: id,
        name: results[0].name,
        errorMessage: ''
      };
      res.render('edit', data);
    }

  });

  connection.end();
});

router.post('/edit', [
  check('userId')
    .not().isEmpty().trim().escape().withMessage('名前を入力して下さい'),
], (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    const errors_array = errors.array();

    res.render('edit', {
      id: req.body.id,
      userId: '名前',
      errorMessage: errors_array
    })
  } else {

    const id = req.body.id;
    const userId = req.body.userId;
    const post = { 'userId': userId };

    const connection = mysql.createConnection(mysql_setting);
    connection.connect();

    connection.query('UPDATE user_test SET ? WHERE id = ?', [post, id], function (error, results, fields) {
      if (error) throw error;
      res.redirect('../')
    });

    connection.end();

  }
});
//routerをモジュールとして扱う準備
module.exports = router;