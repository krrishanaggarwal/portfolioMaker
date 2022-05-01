function handleErrors(error,req,res,next){
    res.status(500).render('errors/500');

}

module.exports=handleErrors;