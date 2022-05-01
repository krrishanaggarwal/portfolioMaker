
const express=require('express');
const router=express.Router();
const controller=require('../controllers/error.controller');


router.get('/404',controller.getPageNotFound)
router.get('/401',controller.getNotAuthorisedPage)
router.get('/500',controller.getServerErrorPage)


module.exports=router;

