const ObjectId = require('mongodb').ObjectId;
const db = require('../data/database')
class SkillModel{
    constructor(user,skill,proficiency,id){
        this.user=user;
        this.skill=skill;
        this.proficiency=proficiency
        if(id){
            this.id=id.toString()
        }

    }


    async saveSkill(){
        if (this.id){
            // update
            const skillId=ObjectId(this.id);
            await db.getDb().collection('skills').updateOne({
             _id:skillId   
            },{
                $set:{
                    user:this.user,
                    skill:this.skill,
                    proficiency:this.proficiency,
                }
            })
        }
        else{
            await db.getDb().collection('skills').insertOne({
                user:this.user,
                skill:this.skill,
                proficiency:this.proficiency,
            });
        }

    }

    static async fetchSkillByUser(username){
       const  skillInfo=await db.getDb().collection('skills').find({
            user:username
        }).toArray()

        return skillInfo
    }
    static async deleteSkill(id){
        const delId=new ObjectId(id)
        db.getDb().collection('skills').deleteOne({_id:delId})

    }
    static async deleteAll(username){
        await db.getDb().collection('skills').deleteMany({user:username})
    }

}

module.exports=SkillModel;