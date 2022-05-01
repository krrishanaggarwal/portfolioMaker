const express=require('express');
const controller=require('../controllers/theme.controller')

const router=express.Router();

router.get('/themes/:id',controller.getUserTheme);
router.post('/updateTheme/:id',controller.updateTheme)


module.exports=router;