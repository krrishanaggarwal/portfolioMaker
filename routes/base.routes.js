
const express=require('express');
const router=express.Router();
const controller=require('../controllers/index.controller');
const redirectIfLoggedInMiddleware=require('../middlewares/redirectifLoggedIn');


router.get('/profile/:id',controller.getstartPage)
router.get('/',redirectIfLoggedInMiddleware,controller.getCoverPage)

module.exports=router;

