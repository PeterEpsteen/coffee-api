
const db = require('../config/database');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();
var config = require('../config/config');
const saltRounds = 10;
//----------User Information -------------------//
function getUsers(req, res, next) {

    db.any('SELECT id, username FROM users')
        .then(data => {
            res.status(200).json({
                status:'success',
                data: data,
                message: 'Connection working'
            });
        })
        .catch(err => {return next(err)});
}

function getUser(req, res, next) {
    let userID = parseInt(req.params.id);
    db.one('SELECT e.*, l.comment_count FROM (SELECT u.id as user_id, u.username, SUM(b.points) AS points, COUNT(b.brew_id) AS brew_count FROM users AS u LEFT JOIN brew AS b ON b.user_id = u.id where u.id = $1 GROUP BY u.id)  as e FULL JOIN (SELECT SUM(z.comments) as comment_count, z.user_id as user_id FROM (SELECT b.*, COUNT(c.brew_id) AS comments FROM brew AS b LEFT JOIN brew_comment AS c ON c.brew_id = b.brew_id WHERE b.user_id = $1 GROUP BY b.brew_id ORDER BY b.brew_id) as z GROUP BY z.user_id) as l on l.user_id = e.user_id;', userID)
        .then(data => {
            res.status(200).json({
                status:'success',   
                data: data,
                message: 'Connection working'
            });
        })
        .catch(err => {return next(err)});

        //SELECT SUM(z.comments) FROM (SELECT b.*, COUNT(c.brew_id) AS comments FROM brew AS b LEFT JOIN brew_comment AS c ON c.brew_id = b.brew_id WHERE b.user_id = 92 GROUP BY b.brew_id ORDER BY b.brew_id) as z GROUP BY z.user_id

        //SELECT e.*, l.comment_count FROM (SELECT u.id as user_id, u.username, SUM(b.points) AS points, COUNT(b.brew_id) AS brew_count FROM users AS u LEFT JOIN brew AS b ON b.user_id = u.id where u.id = 92 GROUP BY u.id)  as e FULL JOIN (SELECT SUM(z.comments) as comment_count, z.user_id as user_id FROM (SELECT b.*, COUNT(c.brew_id) AS comments FROM brew AS b LEFT JOIN brew_comment AS c ON c.brew_id = b.brew_id WHERE b.user_id = 92 GROUP BY b.brew_id ORDER BY b.brew_id) as z GROUP BY z.user_id) as l on l.user_id = e.id;
}

function addUser(req, res, next){
    bcrypt.hash(req.body.password, saltRounds, function(err, hash){
        let user = {
            username: req.body.username,
            password: hash,
            email: req.body.email
        };
        db.none('insert into users (username, password, email)' +
    ' Values (${username}, ${password}, ${email})', user)
    .then(() => {
        res.status(200).json({
            status: 'success',
            message: 'inserted user: ' + user.username
        });
    })
    .catch((err) => {
        return next(err);
    });
    });
    
}

function login(req, res, next){
    db.one('SELECT * FROM users WHERE username = ${username}', req.body)
    .then(data => {
        bcrypt.compare(req.body.password, data.password, function(err, response){
            if(response){
                const payload = {
                    username: data.username
                };
                var token = jwt.sign(payload, req.app.get('superSecret'), {
                    expiresIn: "5d"
                });
                res.status(200).json({
                    status: true,
                    token: token,
                    user: {
                        id: data.id,
                        username: data.username,
                        points: data.points
                    },
                    message: "You got a token"
                });
            }
            else
                res.status(500).json({status:"failed", data: "please try again", message: "bad"});
    });})
    .catch(error => {return next(error);});
}
function deleteUser(req, res, next) {
    db.none('DELETE FROM users WHERE id = ${id}', req.body)
    .then(()=> {
        res.status(200).json({
            status: "success",
            message: "Deleted user: " + req.body.username
        });
    })
    .catch( e => next(e));
}
function editUser(req, res, next){

}



module.exports = {
    getUser: getUser,
    addUser: addUser,
    deleteUser: deleteUser,
    getUsers: getUsers,
    editUser: editUser,
    login: login,
};