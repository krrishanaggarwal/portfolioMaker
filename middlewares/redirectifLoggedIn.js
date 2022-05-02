

function isLoggedIn(req,res,next){
    if (req.session.username){
        return res.redirect(`/profile/${req.session.username}`)
    }
    next();
    return;

}

module.exports=isLoggedIn;