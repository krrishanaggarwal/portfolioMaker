
const Project=require('../models/project.model')

function getaddProjectForm(req,res){
    res.render('Forms/project/addProject')
}

async function getUpdateProjectform(req,res,next){
    id=req.params.id;
    const projectInfo=await Project.getInfoById(id);
    console.log(projectInfo);
    res.render('Forms/project/editProject',{projectInfo:projectInfo})
}

async function addProject(req,res){
    if (!req.body.techUsed){
        res.redirect('/addProject')
        return;
    }
    const projectDetails= new Project({
        ...req.body,
        image:req.file.filename,
        user:req.session.username
    })
    await projectDetails.saveInfo();
    res.redirect(`/profile/${req.session.username}`);
}

async function getProjectDetailPage(req,res){
    
    id=req.params.id;
    const projectInfo=await Project.getInfoById(id);
    console.log(projectInfo);
    res.render('projectDetail',{projectInfo:projectInfo})
}

async function deleteProject(req,res){
    id=req.params.id;
    await Project.remove(id)
    res.json({});

}

async function updateProject(req,res){
    if (!req.body.techUsed){
        res.redirect('/updateProject/req.params.id')
        return;
    }
    id=req.params.id
    const details=new Project({
        ...req.body,
        _id:id,
        user:req.session.username
    });
    if (req.file){
        details.replaceImage(req.file.filename);
    }

    await details.saveInfo();
    res.redirect(`/profile/${req.session.username}`);
}

module.exports={
    updateProject:updateProject,
    addProject:addProject,
    getUpdateProjectform:getUpdateProjectform,
    getaddProjectForm:getaddProjectForm,
    getProjectDetailPage:getProjectDetailPage,
    deleteProject:deleteProject,
}