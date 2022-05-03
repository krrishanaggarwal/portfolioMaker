const Theme=require('../models/theme.model')


async function getUserTheme(req,res){
    user=req.params.id;
    const themeInfo=await Theme.getInfo(user);
    res.json(themeInfo);
}

async function saveTheme(req,res,next){
    const themeData={
        theme:req.body.theme,
        user:req.session.username,
    }
    const theme=new Theme({...themeData})
    try {
      await  theme.saveTheme() 
    } catch (error) {
        next(error)
        return
    }

}

async function updateTheme(req,res){
    
    if (req.session.username===req.params.id){
       await Theme.updateTheme(req.body.user,req.body.theme)
       
        res.json({message:"Theme Updated"});
    }

  

}

module.exports={
    getUserTheme:getUserTheme,
    saveTheme:saveTheme,
    updateTheme:updateTheme,
}