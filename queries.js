
// const client = new Pool({
//     user: 'coffee',
//     host: 'localhost',
//     database: 'coffee',
//     password: 'coffee',
//     port: 1111
// });
const os = require('os');
const hostname = os.hostname();
const port = (hostname.indexOf('droplet') !== -1) ?
    5432 : 1111;
const cn = {
    host: 'localhost',
    port: port,
    database: 'coffee',
    user: 'coffee',
    password: 'coffee'
};
const pgp = require('pg-promise')();
const db = pgp(cn);


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
        console.log(os.hostname());
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
// function getBeans(req, res, next) {
//     client.connect();
//     client.query('SELECT * from coffee_bean')
//     .then(data => {res.status(200).json({
//         status: 'success',
//         data: data,
//         message: 'Nice'
//     });})
//     .catch(e => {return next(err)});
// }

module.exports = {
    getUser: getUser,
    addUser: addUser,
    getUsers: getUsers
};