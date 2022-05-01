const mongoDb=require('mongodb');
const MongoDbClient=mongoDb.MongoClient;

let database;

async function connectToDataBase(){
    const client=await MongoDbClient.connect('mongodb://localhost:27017');
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