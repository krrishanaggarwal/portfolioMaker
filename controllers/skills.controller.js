

const SkillModel=require('../models/skills.model')
function getaddSkillForm(req, res) {
    res.render('Forms/skills/addNewskill');
}

async function addNewSkill(req, res) {
    const skills=req.body.skill;
    const levels=req.body.level;
    await SkillModel.deleteAll(req.session.username);
    if (typeof(skills)==="string"){
        const skill=new SkillModel(req.session.username,skills,levels)
        await skill.saveSkill();
        res.redirect(`/profile/${req.session.username}`);
        return;
    }
   
    for (var i=0;i<skills.length;i++){
        if (skills[i].length>0 && levels[i].length>0){
            const skill=new SkillModel(req.session.username,skills[i],levels[i])
            await skill.saveSkill();
        }
        }
        res.redirect(`/profile/${req.session.username}`);
    }

    async function fetchSkills(req,res){
        username=req.params.id
        const skillInfo=await SkillModel.fetchSkillByUser(username);
        res.json(skillInfo);
    }   

async function getUpdateSkillform(req, res, next) {
        const username=req.params.id
        const skillInfo=await SkillModel.fetchSkillByUser(username);
        res.render('Forms/skills/editSkills',{skillInfo:skillInfo})
    }

    module.exports = {
        getaddSkillForm: getaddSkillForm,
        getUpdateSkillform: getUpdateSkillform,
        addNewSkill:addNewSkill,
        fetchSkills:fetchSkills,
    }