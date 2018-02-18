var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
// var db = require('../queries');
var brewController = require('../controllers/brewController');
var brewCommentsController = require('../controllers/brewCommentsController');
var userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/login', userController.login);


router.use((req, res, next) => {
  var token = req.body.token || req.query.token || req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, req.app.get('superSecret'), (err, decoded) => {
      if(err) {
        return res.json({success: false, message: "Failed authentication"});
      }
        else {
          console.log("token verified: " + token);
          req.decoded = decoded;
          next();
        }
      
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "No token provided"
    });
  }
});

/*  Brews  */
router.get('/api/getBrews', brewController.getBrews);
router.get('/api/getBrew/:id', brewController.getBrew);
router.put('/api/editBrew', brewController.editBrew);
router.post('/api/addBrew', brewController.addBrew);
router.delete('/api/deleteBrew/:id', brewController.deleteBrew);

/*  Users  */
router.get('/api/getUsers', userController.getUsers);
router.get('/api/getUser/:id', userController.getUser);
router.put('/api/editUser', userController.editUser);
router.post('/api/addUser', userController.addUser);
router.delete('/api/deleteUser', userController.deleteUser);

/*  Brew Comments  */
router.get('/api/getBrewComments/:id', brewCommentsController.getBrewComments);
router.put('/api/editBrewComment', brewCommentsController.editBrewComment);
router.post('/api/addBrewComment', brewCommentsController.addBrewComment);
router.delete('/api/deleteBrewComment/:id', brewCommentsController.deleteBrewComment);
// Test to 
router.post('/api/profile/:id', userController.getUser);

module.exports = router;
