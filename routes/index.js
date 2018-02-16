var express = require('express');
var router = express.Router();
// var db = require('../queries');
var brewController = require('../controllers/brewController');
var brewCommentsController = require('../controllers/brewCommentsController');
var userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*  Users  */
router.get('/api/getUsers', userController.getUsers);
router.get('/api/getUser/:id', userController.getUser);
router.put('/api/editUser', userController.editUser);
router.post('/api/addUser', userController.addUser);
router.delete('/api/deleteUser', userController.deleteUser);
/*  Brews  */
router.get('/api/getBrews', brewController.getBrews);
router.get('/api/getBrew/:id', brewController.getBrew);
router.put('/api/editBrew', brewController.editBrew);
router.post('/api/addBrew', brewController.addBrew);
router.delete('/api/deleteBrew/:id', brewController.deleteBrew);
/*  Brew Comments  */
router.get('/api/getBrewComments/:id', brewCommentsController.getBrewComments);
router.put('/api/editBrewComment', brewCommentsController.editBrewComment);
router.post('/api/addBrewComment', brewCommentsController.addBrewComment);
router.delete('/api/deleteBrewComment/:id', brewCommentsController.deleteBrewComment);

module.exports = router;
