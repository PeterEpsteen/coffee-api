
// const os = require('os');
// const hostname = os.hostname();
// const port = (hostname.indexOf('droplet') !== -1) ?
//     5432 : 1111;
// const cn = {
//     host: 'localhost',
//     port: port,
//     database: 'coffee',
//     user: 'coffee',
//     password: 'coffee'
// };
// const pgp = require('pg-promise')();
// const db = pgp(cn);

// //----------User Information -------------------//
// function getUsers(req, res, next) {
//     db.any('SELECT * FROM users')
//         .then(data => {
//             res.status(200).json({
//                 status:'success',
//                 data: data,
//                 message: 'Connection working'
//             });
//         })
//         .catch(err => {return next(err)});
// }

// function getUser(req, res, next) {
//     let userID = parseInt(req.params.id);
//     db.one('SELECT * FROM users where id = $1', userID)
//         .then(data => {
//             res.status(200).json({
//                 status:'success',
//                 data: data,
//                 message: 'Connection working'
//             });
//         })
//         .catch(err => {return next(err)});
// }
// function addUser(req, res, next){
//     db.none('insert into users (username, password, email)' +
//     ' Values (${username}, ${password}, ${email})', req.body)
//     .then(() => {
//         res.status(200).json({
//             status: 'success',
//             message: 'inserted user: ' + req.body.username
//         });
//     })
//     .catch((err) => {return next(err);})
// }
// function deleteUser(req, res, next) {

// }
// function editUser(req, res, next){

// }

// //--------------Brew----------------------/
// function getBrew(req, res, next) {
//     let brewId = parseInt(req.params.id);
//     db.one('SELECT * FROM brew where brew_id = $1', brewId)
//         .then(data => {
//             res.status(200).json({
//                 status:'success',
//                 data: data,
//                 message: 'Connection working'
//             });
//         })
//         .catch(err => {return next(err)});
// }
// function getBrews(req, res, next) {
//     db.any('SELECT * FROM brew')
//         .then(data => {
//             res.status(200).json({
//                 status:'success',
//                 data: data,
//                 message: 'Connection working'
//             });
//         })
//         .catch(err => {return next(err)});
// }
// function addBrew(req, res, next) {

// }

// function deleteBrew(req, res, next) {

// }

// function updateBrew(req, res, next) {

// }
// function editBrew(req, res, next) {

// }


// //-----------Brew Comments-----------------------//
// function getBrewComments(req, res, next) {
//     let brewID = parseInt(req.params['brew-id']);
//     db.any('SELECT * from brew_comment where brew_id = $1', brewID)
//     .then(data => {
//         res.status(200).json({
//             status:'success',
//             data: data
//         });
//     })
//     .catch(err => {return next(err);});
// }

// function addBrewComment(req, res, next) {

// }

// function deleteBrewComment(req, res, next) {

// }

// function editBrewComment(req, res, next) {

// }


// module.exports = {
//     getUser: getUser,
//     addUser: addUser,
//     deleteUser: deleteUser,
//     getUsers: getUsers,
//     editUser: editUser,
//     addBrew: addBrew,
//     getBrew: getBrew,
//     getBrews: getBrews,
//     editBrew: editBrew,
//     deleteBrew: deleteBrew,
//     addBrewComment: addBrewComment,
//     editBrewComment: editBrewComment,
//     deleteBrewComment: deleteBrewComment,
//     getBrewComments: getBrewComments
// };