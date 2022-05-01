const expressSession=require('express-session');
const mongoDbStore=require('connect-mongodb-session');
let mongoDbUrl='mongodb://localhost:27017'
if(process.env.MONGODB_URL){
    mongoDbUrl=process.env.MONGODB_URL
    }
function createSessionStore(){
    const MongoDbStore=mongoDbStore(expressSession);
    const store =new MongoDbStore({
        uri: mongoDbUrl,
        databaseName:'Portfolio',
        collection:'sessions'
    
    });
    return store;
}

function createSessionConfig(){
    return {
        secret: 'None',
        resave:false,
        saveUninitialized:false,
        store:createSessionStore(),
        cookie:{
            maxAge:3600000,
        }

    }
}

module.exports=createSessionConfig
