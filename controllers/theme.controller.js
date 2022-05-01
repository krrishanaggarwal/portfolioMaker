const Theme=require('../models/theme.model')


async function getUserTheme(req,res){
    user=req.params.id;
    console.log(user,"fetch theme")

    const themeInfo=await Theme.getInfo(user);
    console.log(themeInfo)
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
        console.log("i want to update Theme")
        console.log(req.body.user,req.body.theme)
       await Theme.updateTheme(req.body.user,req.body.theme)
       
        res.json({message:"Theme Updated"});
    }

  

}

module.exports={
    getUserTheme:getUserTheme,
    saveTheme:saveTheme,
    updateTheme:updateTheme,
}