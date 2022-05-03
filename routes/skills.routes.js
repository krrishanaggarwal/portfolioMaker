const express=require('express');
const skillscontroller=require('../controllers/skills.controller');
const protectRoutesMiddleware=require('../middlewares/protectRoutes');
const router=express.Router();



router.get('/addSkill',protectRoutesMiddleware,skillscontroller.getaddSkillForm)
router.post('/addSkill',protectRoutesMiddleware,skillscontroller.addNewSkill)
router.get('/addSkill/:id',protectRoutesMiddleware,skillscontroller.getUpdateSkillform)
router.get('/skills/:id',skillscontroller.fetchSkills)



module.exports=router;