
const express=require('express');
const router=express.Router();
const controller=require('../controllers/index.controller');


router.get('/profile/:id',controller.getstartPage)

module.exports=router;

