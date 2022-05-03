
const db=require('../data/database')
const bcrypt=require('bcrypt');
class User {
    constructor(email, name, password) {
        this.email = email;
        this.password = password;
        this.name = name;
    }


    async signup(){
        const hashedPassword=await bcrypt.hash(this.password,12)
        await db.getDb().collection('users').insertOne({
            email:this.email,
            name:this.name,
            password:hashedPassword,
        });

    }

    getUserWithSameEmail(){
        return db.getDb().collection('users').findOne({
            email:this.email
        });
    }
    async existAlreadyinDb(){
        const existingUser=await this.getUserWithSameEmail();

        if (existingUser){
            return true;
        }
        return false;
    
    }
    static async  findUserByUsername(username){
        
        const existingUser= await db.getDb().collection('users').findOne({
            name:username
        });
     
        if(existingUser){
            return true
        }
        return false
    }

    hasMatchingPassword(hashedPassword){
        return bcrypt.compare(this.password,hashedPassword);
    }

}

module.exports=User;