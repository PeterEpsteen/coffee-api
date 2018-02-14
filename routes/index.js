var express = require('express');
var router = express.Router();
var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/api/getUsers', db.getUsers);
router.get('/api/getUser/:id', db.getUser);
router.post('/api/addUser', db.addUser);
module.exports = router;
