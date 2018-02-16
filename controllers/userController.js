
const db = require('../database');

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
    db.none('insert into users (username, password, email)' +
    ' Values (${username}, ${password}, ${email})', req.body)
    .then(() => {
        res.status(200).json({
            status: 'success',
            message: 'inserted user: ' + req.body.username
        });
    })
    .catch((err) => {return next(err);})
}
function deleteUser(req, res, next) {

}
function editUser(req, res, next){

}



module.exports = {
    getUser: getUser,
    addUser: addUser,
    deleteUser: deleteUser,
    getUsers: getUsers,
    editUser: editUser,
};