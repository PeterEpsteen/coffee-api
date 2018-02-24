
const db = require('../config/database');



//--------------Brew----------------------/
function getBrew(req, res, next) {
    let brewId = parseInt(req.params.id);
    db.one('SELECT * FROM brew where brew_id = $1', brewId)
        .then(data => {
            res.status(200).json({
                status:'success',
                data: data,
                message: 'Connection working'
            });
        })
        .catch(err => {return next(err)});
}
function getBrews(req, res, next) {
    db.any('SELECT * FROM brew')
        .then(data => {
            res.status(200).json({
                status:'success',
                data: data,
                message: 'Connection working'
            });
        })
        .catch(err => {return next(err)});
}
function addBrew(req, res, next) {
    db.none('INSERT INTO brew (user_id, brew_name, brew_date, '+
    'brew_method, water_units, coffee_units, water_metric, coffee_metric, notes, grind, bloom_time, brew_time, temperature) VALUES (${user_id}, ${brew_name}, ${brew_date}, '+
    '${brew_method}, ${water_units}, ${coffee_units}, ${water_metric}, ${coffee_metric}, ${notes}, ${grind}, ${bloom_time}, ${brew_time}, ${temperature})', req.body)
    .then( () => {
        res.status(200).json({
            status: 'Success',
            message: `Successfully inserted brew: ${req.body["brew_name"]}`
        });
    })
    .catch(err => {return next(err);});
}

function getBrewsByUser(req, res, next) {
    let userID = parseInt(req.params.id);
    db.any('SELECT * FROM brew WHERE user_id = $1;', userID)
    .then(data => {
        res.status(200).json({
            status:'success',
            data: data,
            message: 'Connection working'
        });
    })
    .catch(err => {return next(err)});
}

function deleteBrew(req, res, next) {
    let body = {
        user_id: parseInt(req.params.userID),
        brew_name: req.params.brewName
    };
    db.result('DELETE FROM brew WHERE user_id = ${user_id} AND brew_name = ${brew_name}', body)
    .then((result)=> {
        res.status(200).json({
            status: "success",
            message: result.command
        });
    })
    .catch( e => next(e));
}

function updateBrew(req, res, next) {

}
function editBrew(req, res, next) {

}


module.exports = {
    addBrew: addBrew,
    getBrew: getBrew,
    getBrews: getBrews,
    editBrew: editBrew,
    deleteBrew: deleteBrew,
    getBrewsByUser: getBrewsByUser
};