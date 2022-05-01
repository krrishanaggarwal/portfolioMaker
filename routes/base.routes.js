
const express=require('express');
const router=express.Router();
const controller=require('../controllers/index.controller');


router.get('/profile/:id',controller.getstartPage)
router.get('/',controller.getCoverPage)

module.exports=router;

