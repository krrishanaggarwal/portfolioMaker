const expressSession=require('express-session');
const mongoDbStore=require('connect-mongodb-session');
function createSessionStore(){
    const MongoDbStore=mongoDbStore(expressSession);
    const store =new MongoDbStore({
        uri: 'mongodb://localhost:27017',
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
