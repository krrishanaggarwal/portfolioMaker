const mongoDb=require('mongodb');
const MongoDbClient=mongoDb.MongoClient;

let database;

let mongoDbUrl='mongodb://localhost:27017'

if(process.env.MONGODB_URL){
mongoDbUrl=process.env.MONGODB_URL
}
async function connectToDataBase(){
    const client=await MongoDbClient.connect(mongoDbUrl);
    database=client.db('Portfolio');

}

function getDb(){
    if(!database){
        throw new Error("Not connected to Db");
    }

    return database;
}

module.exports={
    connectToDataBase:connectToDataBase,
    getDb:getDb,
}