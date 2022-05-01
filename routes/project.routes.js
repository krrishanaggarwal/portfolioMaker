const express=require('express');
const controller=require('../controllers/projects.controller');
const imageUploadMiddleware=require('../middlewares/image-upload');
const router=express.Router();

router.get('/addProject',controller.getaddProjectForm)
router.get('/updateProject/:id',controller.getUpdateProjectform)
router.post('/updateProject/:id',imageUploadMiddleware,controller.updateProject)
router.post('/addProject',imageUploadMiddleware,controller.addProject)
router.get('/projectDetail/:id',controller.getProjectDetailPage)
router.delete('/projectRemove/:id',controller.deleteProject)


module.exports=router;