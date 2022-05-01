function createUserSession(req,user,action){
    console.log(user);
    req.session.username  = user.email.substring(0, user.email.lastIndexOf("@"));
    req.session.uid=user._id.toString();
    req.session.save(action);

}


module.exports={
    createUserSession:createUserSession
}