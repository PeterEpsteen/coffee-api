
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
    let commentJson = JSON.parse(req.body.comment);
    let brewComment = {
        brew_id: commentJson['brewID'],
        user_id: commentJson['userID'],
        comment_text: commentJson['text'],
        comment_date: commentJson['date']
    };
    console.log(brewComment);
    db.task(t => {
        return t.one('INSERT INTO brew_comment (brew_id, user_id, comment_text, comment_date) VALUES ( ${brew_id}, ${user_id}, ${comment_text}, ${comment_date}) RETURNING brew_id', brewComment)
        .then((brew) => {
            return t.any("UPDATE brew SET comments = comments+1 WHERE brew_id = $1", brew.brew_id);
        });
    })
    .then(() => {res.status(200).json({
            status: "success",
            message: "successfully inserted brew comment: " + req.body.comment.text
        });
    })
    .catch(err => next(err));

     // db.none('INSERT INTO brew_comment (brew_id, user_id, comment_text, comment_date) VALUES ( ${brew_id}, ${user_id}, ${comment_text}, ${comment_date})', brewComment)
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