const express=require('express');
const controller=require('../controllers/about.controller');
const imageUploadMiddleware=require('../middlewares/image-upload');
const aboutrouter=express.Router();

aboutrouter.get('/addAbout',controller.getaddAboutForm)
aboutrouter.get('/addAbout/:id',controller.getUpdateAboutform)
aboutrouter.post('/addAbout/:id',imageUploadMiddleware,controller.updateaboutform)
aboutrouter.post('/addAbout',imageUploadMiddleware,controller.addAbout)





module.exports=aboutrouter;