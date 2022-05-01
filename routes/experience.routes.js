const express=require('express');
const controller=require('../controllers/experience.controller');
const imageUploadMiddleware=require('../middlewares/image-upload');
const router=express.Router();

router.get('/addExperience',controller.getaddExperienceform)
router.get('/updateExperience/:id',controller.getUpdateExperienceform)
router.post('/updateExperience/:id',imageUploadMiddleware,controller.updateExperience)
router.post('/addExperience',imageUploadMiddleware,controller.addExperience)
router.delete('/removeExperience/:id',controller.deleteExperience)



module.exports=router;