const ObjectId = require('mongodb').ObjectId;
const db = require('../data/database')
class About {
    constructor(aboutData) {
        this.image = aboutData.image;
        this.resume=aboutData.resume;
        this.fullname=aboutData.fullname;
        this.contact=aboutData.contact;
        this.address=aboutData.address;
        this.designation=aboutData.designation;
        this.linkedIn=aboutData.linkedIn;
        this.github=aboutData.github;
        this.leetcode=aboutData.leetcode;
        this.email=aboutData.email;
        this.description = aboutData.description;
        this.updateImageData();
        this.user = aboutData.user;
        if (aboutData._id) {
            this.id = aboutData._id.toString();
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
        const aboutInfo = {
            image: this.image,
            contact:this.contact,
            address:this.address,
            description: this.description,
            user: this.user,
            fullname:this.fullname,
            resume:this.resume,
            linkedIn:this.linkedIn,
            github:this.github,
            designation:this.designation,
            leetcode:this.leetcode,
            email:this.email,

        }
        if(this.id){
            const aboutId= ObjectId(this.id);
            if(!this.image){
                delete aboutInfo.image;
            }
            await db.getDb().collection('about').updateOne({ _id:aboutId},{
                $set:
                    aboutInfo,   
            })

        }
        else{
            await db.getDb().collection('about').insertOne(aboutInfo);
        }


    }

    static async getInfo(username) {
        const about = await db.getDb().collection('about').findOne({
            user: username
        });
        if (!about) {
            return
        }
        else {
            const aboutdata = new About(about);
            return aboutdata;
        }
    }

    static async getInfoById(id) {
        let aboutid;
        try {
            aboutid = new ObjectId(id);
            
        } catch (error) {
            error.code=404;
            throw error;
        }
        const aboutdata = await db.getDb().collection('about').findOne({
            _id: aboutid
        });

        if(!aboutdata){
            const error=new Error(' No data');
            error.code=404;
            throw error;
        }
        return new About(aboutdata);
    }

}
module.exports = About;
