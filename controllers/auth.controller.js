const User = require('../models/user.model');
const Theme = require('../models/theme.model')
const authUtil = require('../utils/authentication')
const validate = require('../utils/validations')
const sessionFlash = require('../utils/session-flash')
function getSignup(req, res) {
    let sessionData=sessionFlash.getSessionData(req);

    if(!sessionData){
        sessionData={
            email:'',
            password:'',
            name:'',
            
        }
    }
    res.render('auth/signup',{data:sessionData});
}

function getLogin(req, res) {
    let sessionData=sessionFlash.getSessionData(req);

    if(!sessionData){
        sessionData={
            email:'',
           
            
        }
    }
   
    res.render('auth/login',{data:sessionData});
}




async function signUp(req, res, next) {

    if (!validate(req.body.email, req.body.password, req.body.email.substring(0, req.body.email.lastIndexOf("@")))) {
        sessionFlash.flashDataTosession(req,{
            errorMessage:"Please check Your Input,password must be atleast 6 characters",
            email:req.body.email,
            name:req.body.email.substring(0, req.body.email.lastIndexOf("@")),
        },function(){

            res.redirect('/signup');
        });
        return
    }
    const user = new User(req.body.email, req.body.email.substring(0, req.body.email.lastIndexOf("@")), req.body.password);

    try {
        const existAlreadyinDb = await user.existAlreadyinDb()
        if (existAlreadyinDb) {
            sessionFlash.flashDataTosession(req,{
                errorMessage:"User Already Exists With same Email",
                email:req.body.email,
                name:req.body.email.substring(0, req.body.email.lastIndexOf("@")),
    
            },function(){
                res.redirect('/signup');
            });
           
            return
        }
    const themeData={
        theme:"Light",
        user:req.body.email.substring(0, req.body.email.lastIndexOf("@")),
    }

    const theme= new Theme({...themeData});
    await theme.saveTheme()
        await user.signup();
    } catch (error) {
        return next(error);
    }

    res.redirect('/login');

}

async function login(req, res, next) {
    const user = new User(req.body.email,"", req.body.password);
    let existingUser;
    try {
        existingUser = await user.getUserWithSameEmail();
    } catch (error) {
        next(error);
        return;
    }

    if (!existingUser) {
        sessionFlash.flashDataTosession(req,{
            errorMessage:"No such User Exist!",
            email:req.body.email,
            
        },function(){
            res.redirect('/login');
        });
    
        return;
    }
    const validatePassword = await user.hasMatchingPassword(existingUser.password);

    if (!validatePassword) {
        sessionFlash.flashDataTosession(req,{
            errorMessage:"Incorrect Password",
            email:req.body.email,
            
        },function(){
            res.redirect('/login');
        });
       
        return;
    }

    authUtil.createUserSession(req, existingUser, function () {
        res.redirect(`/profile/${req.session.username}`);
    });
}

function logout(req, res) {
  
    req.session.username = null;
    req.session.uid = null;
  
    res.redirect('/login');
}


module.exports = {
    login: login,
    getSignup: getSignup,
    signUp: signUp,
    getLogin: getLogin,
    logout: logout,

}