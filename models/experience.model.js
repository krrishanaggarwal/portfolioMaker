const ObjectId = require('mongodb').ObjectId;
const db = require('../data/database')
class Experience {
    constructor(experienceData) {
        this.companyLogo = experienceData.companyLogo;
        this.companyName=experienceData.companyName;
        this.description = experienceData.description;
        this.updateImageData();
        this.website=experienceData.website;
        this.user = experienceData.user;
        this.startDate=experienceData.startDate
        this.endDate=experienceData.endDate
        if (experienceData._id) {
            this.id = experienceData._id.toString();
        }
    }


    updateImageData(){
        this.imagePath = `gallery/images/${this.companyLogo}`;
        this.imageUrl = `/gallery/assets/images/${this.companyLogo}`;
    }

    async replaceImage(newImage){
        this.companyLogo=newImage;
        this.updateImageData();
    }

    async saveInfo() {
        const experienceInfo = {
            companyLogo: this.companyLogo,
            companyName: this.companyName,
            description: this.description,
            user: this.user,
            website:this.website,
            startDate:this.startDate,   
            endDate:this.endDate,   
        }
        if(this.id){
            const experienceId= ObjectId(this.id);

            if(!this.companyLogo){
                delete experienceInfo.companyLogo;
            }
            await db.getDb().collection('experience').updateOne({ _id:experienceId},{
                $set:
                experienceInfo,
                
            })

        }
        else{
            await db.getDb().collection('experience').insertOne(experienceInfo);
        }


    }

    static async getAllExperiencesbyUser(username) {
        const experiences = await db.getDb().collection('experience').find({
            user: username
        }).toArray();
        if (!experiences) {
            return
        }
        else {
            
            return experiences.map(function(expDoc){
                return new Experience(expDoc);
            });
        }
    }
    static async remove(id){
        let expId;
        try {
            expId = new ObjectId(id);
            
        } catch (error) {
            error.code=404;
            throw error;
        }
     await db.getDb().collection('experience').deleteOne({
            _id: expId
        })

    }

    static async getInfoById(id) {
        let experienceId;
        try {
            experienceId = new ObjectId(id);
            
        } catch (error) {
            error.code=404;
            throw error;
        }
        const experienceData = await db.getDb().collection('experience').findOne({
            _id: experienceId
        });

        if(!experienceData){
            const error=new Error(' No data');
            error.code=404;
            throw error;
        }
        return new Experience(experienceData);
    }

}
module.exports = Experience;
