const ObjectId = require('mongodb').ObjectId;
const db = require('../data/database')
class Project {
    constructor(projectData) {
        this.image = projectData.image;
        this.projectName=projectData.projectName;
        this.description = projectData.description;
        this.updateImageData();
        this.user = projectData.user;
        this.github=projectData.github;
        this.techUsed=projectData.techUsed
        this.duration=projectData.duration
        this.website=projectData.website
        if (projectData._id) {
            this.id = projectData._id.toString();
        }
    }


    updateImageData(){
        this.imagePath = `gallery/images/${this.image}`;
        this.imageUrl = `/gallery/assets/images/${this.image}`;
    }

    async replaceImage(newImage){
        this.image=newImage;
        this.updateImageData();
    }

    async saveInfo() {
        const projectInfo = {
            image: this.image,
            description: this.description,
            user: this.user,
            github:this.github,
            website:this.website,
            techUsed:this.techUsed,
            projectName:this.projectName,
            duration:this.duration
        }
        if(this.id){
            const projectId= ObjectId(this.id);

            if(!this.image){
                delete projectInfo.image;
            }
            await db.getDb().collection('projects').updateOne({ _id:projectId},{
                $set:
                    projectInfo,
                
            })

        }
        else{
            await db.getDb().collection('projects').insertOne(projectInfo);
        }


    }

    static async getAllProjectsbyUser(username) {
        const projects = await db.getDb().collection('projects').find({
            user: username
        }).toArray();
        if (!projects) {
            return
        }
        else {
            
            return projects.map(function(projectDoc){
                return new Project(projectDoc);
            });
        }
    }

    static async remove(id){
        let projectId;
        try {
            projectId = new ObjectId(id);
            
        } catch (error) {
            error.code=404;
            throw error;
        }
     await db.getDb().collection('projects').deleteOne({
            _id: projectId
        })

    }

    static async getInfoById(id) {
        let projectId;
        try {
            projectId = new ObjectId(id);
            
        } catch (error) {
            error.code=404;
            throw error;
        }
        const projectData = await db.getDb().collection('projects').findOne({
            _id: projectId
        });

        if(!projectData){
            const error=new Error(' No data');
            error.code=404;
            throw error;
        }
        return new Project(projectData);
    }

}
module.exports = Project;
