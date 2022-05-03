const About = require('../models/about.model');
const SkillModel=require('../models/skills.model')
const Project=require('../models/project.model')
const User=require('../models/user.model')
const Experience=require('../models/experience.model')




function getCoverPage(req,res){
    res.render('start');
}
async function getstartPage(req, res) {
    let username = req.params.id
    const checkUser= await User.findUserByUsername(username)
    if(!checkUser){  
        return res.redirect('/404');
    }
    const aboutInfo = await About.getInfo(username);
    if(!aboutInfo && req.session.username){
        res.render('Forms/about/addAbout');
        return;
    }

    const skillInfo=await SkillModel.fetchSkillByUser(username);
    const projectInfo=await Project.getAllProjectsbyUser(username);
    const experienceInfo=await Experience.getAllExperiencesbyUser(username);
  
    res.render('index', {
        user: username
        ,aboutInfo: aboutInfo,
        skillInfo:skillInfo,
        projectInfo:projectInfo,
        experienceInfo:experienceInfo

    });
}

module.exports={
    getstartPage: getstartPage,
    getCoverPage:getCoverPage,
}