const express=require('express');
const skillscontroller=require('../controllers/skills.controller');
const router=express.Router();



router.get('/addSkill',skillscontroller.getaddSkillForm)
router.post('/addSkill',skillscontroller.addNewSkill)
router.get('/addSkill/:id',skillscontroller.getUpdateSkillform)
router.get('/skills/:id',skillscontroller.fetchSkills)



module.exports=router;