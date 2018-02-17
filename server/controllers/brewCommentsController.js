
const db = require('../config/database');



//-----------Brew Comments-----------------------//
function getBrewComments(req, res, next) {
    let brewID = parseInt(req.params['brew-id']);
    db.any('SELECT * from brew_comment where brew_id = $1', brewID)
    .then(data => {
        res.status(200).json({
            status:'success',
            data: data
        });
    })
    .catch(err => {return next(err);});
}

function addBrewComment(req, res, next) {

}

function deleteBrewComment(req, res, next) {

}

function editBrewComment(req, res, next) {

}


module.exports = {
    addBrewComment: addBrewComment,
    editBrewComment: editBrewComment,
    deleteBrewComment: deleteBrewComment,
    getBrewComments: getBrewComments
};