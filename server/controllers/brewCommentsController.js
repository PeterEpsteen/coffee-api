
const db = require('../config/database');



//-----------Brew Comments-----------------------//
function getBrewComments(req, res, next) {
    let brewID = parseInt(req.params.brewID);
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
    let brewComment = {
        brew_id: req.body.comment['brewID'],
        user_id: req.body.comment['userID'],
        comment_text: req.body.comment['text'],
        comment_date: req.body.comment['date']
    };
    console.log(brewComment);
    console.log(req.body.comment.text);
    db.none('INSERT INTO brew_comment (brew_id, user_id, comment_text, comment_date) VALUES ( ${brew_id}, ${user_id}, ${comment_text}, ${comment_date})', brewComment)
    .then(() => {res.status(200).json({
            status: "success",
            message: "successfully inserted brew comment: " + req.body.comment.text
        });
    })
    .catch(err => next(err));
}

function deleteBrewComment(req, res, next) {
    let commentID = parseInt(req.params.commentID);
    db.none('DELETE FROM brew_comment WHERE comment_id = $1', commentID)
    .then(() => {res.status(200).json({
            status: "success",
            message: "successfully deleted brew comment: " + commentID
        });
    })
    .catch(err => next(err));
}


function editBrewComment(req, res, next) {

}


module.exports = {
    addBrewComment: addBrewComment,
    editBrewComment: editBrewComment,
    deleteBrewComment: deleteBrewComment,
    getBrewComments: getBrewComments
};