

const Experience=require('../models/experience.model')

function getaddExperienceform(req,res){
    res.render('Forms/experience/addExperience')
}

async function getUpdateExperienceform(req,res,next){
    id=req.params.id;
    const experienceInfo=await Experience.getInfoById(id);
    console.log(experienceInfo);
    res.render('Forms/experience/editExperience',{experienceInfo:experienceInfo})
}

async function addExperience(req,res){
    const experienceDetails= new Experience({
        ...req.body,
        companyLogo:req.file.filename,
        user:req.session.username,
    })
    await experienceDetails.saveInfo();
    res.redirect(`/profile/${req.session.username}`);
}

async function updateExperience(req,res){
    id=req.params.id
    const details=new Experience({
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

async function deleteExperience(req,res){
    id=req.params.id;
    await Experience.remove(id)
    res.json({});

}

module.exports={
    updateExperience:updateExperience,
    addExperience:addExperience,
    getUpdateExperienceform:getUpdateExperienceform,
    getaddExperienceform:getaddExperienceform,
    deleteExperience:deleteExperience,
}