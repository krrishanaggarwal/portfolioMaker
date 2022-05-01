function protectRoutes(req,res,next){

    if (!res.locals.isAuth && !req.path.startsWith('/projectDetail')){
        return res.redirect('/401');
    }

    next();

}


module.exports=protectRoutes;