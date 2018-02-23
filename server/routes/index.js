var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
// var db = require('../queries');
var brewController = require('../controllers/brewController');
var brewCommentsController = require('../controllers/brewCommentsController');
var userController = require('../controllers/userController');


router.post('/login', userController.login);
router.post('/register', userController.addUser);


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
router.get('/brews', brewController.getBrews);
router.get('/brews/:id', brewController.getBrew);
router.get('/brews/user/:id', brewController.getBrewsByUser)
router.put('/brews', brewController.editBrew);
router.post('/brews', brewController.addBrew);
router.delete('/brews/:id', brewController.deleteBrew);


/*  Users  */
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);
router.put('/users', userController.editUser);
router.post('/users', userController.addUser);
router.delete('/users', userController.deleteUser);

/*  Brew Comments  */
router.get('/comments/:brewID', brewCommentsController.getBrewComments);
router.put('/comments/:commentID', brewCommentsController.editBrewComment);
router.post('/comments', brewCommentsController.addBrewComment);
router.delete('/comments/:commentID', brewCommentsController.deleteBrewComment);
// Test to 
router.post('/profile/:id', userController.getUser);

module.exports = router;
