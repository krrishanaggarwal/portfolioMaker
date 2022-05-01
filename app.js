
// To do
// To add validation of form submission 
// About image update failing
// Skill delete funtionality
// check if session expired meanwhile before submission and dont save give error
// wrapping all in try catch
// preventing user manualling entering url to alter db need to have authorization first


const express=require('express');
const path=require('path')
const db=require('./data/database')
const authroutes=require('./routes/auth.routes')
const aboutroutes=require('./routes/about.routes')
const baseroutes=require('./routes/base.routes')
const skillroutes=require('./routes/skills.routes')
const projectroutes=require('./routes/project.routes')
const experienceroutes=require('./routes/experience.routes')
const errorroutes=require('./routes/error.routes')
const themeroutes=require('./routes/theme.route')
const expressSession=require('express-session');
const createSessionConfig=require('./config/session');
const csrfTokenMiddleware=require('./middlewares/csrf-token')
const errorHandlerMiddleware=require('./middlewares/error-handler');
const checkAuthStatusrMiddleware=require('./middlewares/check-auth');
const protectRoutesMiddleware=require('./middlewares/protectRoutes')
const csrf=require('csurf');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static('public')); 
app.use('/gallery/assets',express.static('gallery')); 
app.use(express.urlencoded({extended:true}));
app.use(express.json())


const sessionConfig=createSessionConfig();
app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(csrfTokenMiddleware);
app.use(errorHandlerMiddleware);
app.use(checkAuthStatusrMiddleware);
app.use(authroutes);
app.use(baseroutes);
app.use(errorroutes); 
app.use(themeroutes); 
app.use(protectRoutesMiddleware);
app.use(aboutroutes);
app.use(skillroutes);
app.use(projectroutes);
app.use(experienceroutes);


let port=3600;
if (process.env.PORT){
    port=process.env.PORT;
}
db.connectToDataBase().then(function(){
    app.listen(port);
}).catch(function(error){
    console.log("Error");
})