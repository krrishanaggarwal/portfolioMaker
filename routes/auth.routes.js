const express=require('express');
const authController=require('../controllers/auth.controller');
const authrouter=express.Router();
const redirectIfLoggedInMiddleware=require('../middlewares/redirectifLoggedIn');

authrouter.get('/signup',redirectIfLoggedInMiddleware,authController.getSignup)
authrouter.get('/login',redirectIfLoggedInMiddleware,authController.getLogin)
authrouter.post('/signup',authController.signUp)
authrouter.post('/login',authController.login)
authrouter.post('/logout',authController.logout)

module.exports=authrouter;