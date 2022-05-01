const session = require("express-session");

function checkAuthStatus(req,res,next){
    const uid=req.session.uid;
    if(!uid){
        return next();

    }
    res.locals.uid=uid;
    res.locals.loggeduser=req.session.username;
    

    res.locals.isAuth=true;
    next();
}

module.exports=checkAuthStatus;