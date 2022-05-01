function getPageNotFound(req,res){
    return res.render('errors/404')
}

function getNotAuthorisedPage(req,res){
    return res.render('errors/401')
}

function getServerErrorPage(req,res){
    return res.render('errors/500')
}


module.exports={
    getServerErrorPage:getServerErrorPage,
    getNotAuthorisedPage:getNotAuthorisedPage,
    getPageNotFound:getPageNotFound,

}