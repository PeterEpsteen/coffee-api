
const db = require('../config/database');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();
var config = require('../config/config');
const saltRounds = 10;
//----------User Information -------------------//
function getUsers(req, res, next) {

    db.any('SELECT * FROM users')
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
    db.one('SELECT * FROM users where id = $1', userID)
        .then(data => {
            res.status(200).json({
                status:'success',
                data: data,
                message: 'Connection working'
            });
        })
        .catch(err => {return next(err)});
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
                    expiresIn: "1440m"
                });
                res.status(200).json({
                    status: true,
                    token: token,
                    id: data.id,
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