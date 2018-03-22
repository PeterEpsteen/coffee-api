
const db = require('../config/database');
const pgp = require('pg-promise')();
const filter_methods = ["Chemex", "Aeropress", "Pour Over", "French Press",
"Espresso", "Moka Pot", "Other"];

//--------------Brew----------------------/
function getBrew(req, res, next) {
    let brewId = parseInt(req.params.id);
    db.one('SELECT b.*, COUNT(c.brew_id) AS comments FROM brew AS b LEFT JOIN brew_comment AS c ON c.brew_id = b.brew_id WHERE b.brew_id = $1 GROUP BY b.brew_id ORDER BY b.brew_id;', brewId)
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

    var filter = (req.query.hasOwnProperty("filter_method")) ? req.query.filter_method : "%";
    req.query.filter_method = filter;
    let sort = (req.query.hasOwnProperty("sort")) ? req.query.sort : "points";
    req.query.sort = sort;
    req.query.order = (req.query.sort == 'brew_name') ? "ASC" : "DESC"
    var query = pgp.as.format("(SELECT b.*, u.username FROM (SELECT b.*, COUNT(c.brew_id) AS comments FROM brew AS b LEFT JOIN brew_comment AS c ON c.brew_id = b.brew_id GROUP BY b.brew_id) AS b INNER JOIN users as u ON b.user_id = u.id WHERE b.brew_method LIKE ${filter_method}) ORDER BY ${sort^} DESC OFFSET ${offset} LIMIT ${limit}", req.query);
    console.log(query);
    db.any("(SELECT b.*, u.username FROM (SELECT b.*, COUNT(c.brew_id) AS comments FROM brew AS b LEFT JOIN brew_comment AS c ON c.brew_id = b.brew_id GROUP BY b.brew_id) AS b INNER JOIN users as u ON b.user_id = u.id WHERE b.brew_method LIKE ${filter_method}) ORDER BY ${sort^} ${order^} OFFSET ${offset} LIMIT ${limit}", req.query)
        .then(data => {
            res.status(200).json({
                status:'success',
                data: data,
                message: 'Connection working'
            });
        })
        .catch(err => {return next(err)});      

        // db.any("(SELECT b.*, u.username FROM (SELECT b.*, COUNT(c.brew_id) AS comments FROM brew AS b LEFT JOIN brew_comment AS c ON c.brew_id = b.brew_id GROUP BY b.brew_id) AS b INNER JOIN users as u ON b.user_id = u.id WHERE b.brew_method LIKE ${filter_method}) ORDER BY ${sort} DESC OFFSET ${offset} LIMIT ${limit}", req.query)
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
    .catch(err => {
        //add username to beginning of brew
        if(err.message.includes('duplicate')) {
            db.task(t => {
                return t.one("SELECT * FROM users WHERE id = $1", req.body.user_id)
                .then((user) => {
                    req.body.brew_name = user.username + "'s " + req.body.brew_name;
                   return t.none('INSERT INTO brew (user_id, brew_name, brew_date, '+
                   'brew_method, water_units, coffee_units, water_metric, coffee_metric, notes, grind, bloom_time, brew_time, temperature) VALUES (${user_id}, ${brew_name}, ${brew_date}, '+
                   '${brew_method}, ${water_units}, ${coffee_units}, ${water_metric}, ${coffee_metric}, ${notes}, ${grind}, ${bloom_time}, ${brew_time}, ${temperature})', req.body);
                });
            })
            .then( () => {
                res.status(200).json({
                    status: "success",
                    message: "Succesfully inserted brew " + req.body.brew_name
                });
            })
            .catch(error => {
                console.log(error);
                return next(error);
            })
        }

        else {
            return next(err);
        }
    });
}

function getBrewsByUser(req, res, next) {
    let userID = parseInt(req.params.id);
    db.any('SELECT b.*, COUNT(c.brew_id) AS comments FROM brew AS b LEFT JOIN brew_comment AS c ON c.brew_id = b.brew_id WHERE b.user_id = $1 GROUP BY b.brew_id ORDER BY b.brew_id;', userID)
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

function downloadBrew(req, res, next) {
    let brew_id = parseInt(req.params.brew_id);
    if(typeof brew_id === 'undefined')
        res.status(404).json({message: "No user id or brew id provided."});
    
    db.result("UPDATE brew SET downloads = downloads + 1 WHERE brew_id = $1", brew_id)
    .then((result) => {
        console.log(result.command + ": " + result.rowCount);
        if(result.rowCount > 0) {
            res.status(200).json({
                status: "Success",
                message: "Downloaded brew"
            });
        }
        else {
            res.status(500).json({
                status: "Error",
                message: result
            });
        }
    })
    .catch(error => {
        console.log(error);
        return next(error);
    });
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
    likeBrew: likeBrew,
    downloadBrew: downloadBrew
};