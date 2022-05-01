const express=require('express');
const authController=require('../controllers/auth.controller');
const authrouter=express.Router();


authrouter.get('/signup',authController.getSignup)
authrouter.get('/login',authController.getLogin)
authrouter.post('/signup',authController.signUp)
authrouter.post('/login',authController.login)
authrouter.post('/logout',authController.logout)

module.exports=authrouter;