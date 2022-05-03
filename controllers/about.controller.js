
const About = require('../models/about.model');

function getaddAboutForm(req, res) {
    res.render('Forms/about/addAbout');
}


async function getUpdateAboutform(req,res,next){
    try{

        const aboutInfo=await About.getInfoById(req.params.id);
        res.render('Forms/about/editAbout',{aboutData:aboutInfo})
    }catch(error){
        next(error);
        return;
    }

}
async function updateaboutform(req,res){

    const details =new About({
        ...req.body,
        _id:req.params.id,
        user:req.session.username,
    });
    if (req.file){
      
        details.replaceImage(req.file.filename);
    }
    await details.saveInfo();
    res.redirect(`/profile/${req.session.username}`);

}



async function addAbout(req, res) {
    const about = new About({...req.body,
        image:req.file.filename,
        user:req.session.username});
        try {
            await about.saveInfo();
        } catch (error) {
            return;
        }
    res.redirect(`/profile/${req.session.username}`);

}


module.exports = {
    getaddAboutForm:getaddAboutForm,
    addAbout: addAbout,
    updateaboutform:updateaboutform,
    getUpdateAboutform:getUpdateAboutform,

}
