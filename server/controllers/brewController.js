
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
    //pagination - must have page number > 0
    var pageNo = parseInt(req.query.pageNo);
    var size = (req.query.hasOwnProperty("size")) ? parseInt(req.query.size) : 100;
    if(pageNo < 0 || pageNo === 0) {
        res.status(500).json({
            "error": true,
            "message": "invalid page number"
        });
    }
    req.query.offset = size * (pageNo - 1);
    req.query.limit = (size > 0) ? size : 50;
    db.any('SELECT b.*, u.username FROM brew AS b INNER JOIN users as u ON b.user_id = u.id OFFSET ${offset} LIMIT ${limit}', req.query)
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
            message: result.command + " " + result.rowCount
        });
    })
    .catch( e => next(e));
}
function likeBrew(req, res, next) {
    let brewID = parseInt(req.params.id);
    let userID = parseInt(req.params.userID);

    const vote = {
        user_id: userID,
        brew_id: brewID
    };
    db.task(t => {
        return t.one("INSERT INTO votes (user_id, brew_id) VALUES (${user_id}, ${brew_id}) RETURNING brew_id", vote)
        .then((user) => {
           return t.any("UPDATE brew SET points = points + 1 WHERE brew_id = $1", user.brew_id);
        });
    })
    .then(events => {
        res.status(200).json({
            status: "success",
            message: events
        });
    })
    .catch(error => {
        console.log(error);
        return next(error);
    })
   
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
    getBrewsByUser: getBrewsByUser,
    likeBrew: likeBrew
};