
const db = require('../data/database')

class Theme{
    constructor(themeData){
        this.theme=themeData.theme;
        this.user=themeData.user;
    }



    async saveTheme(){

        const themeData={
            theme:this.theme,
            user:this.user,

            }
        await db.getDb().collection('themes').insertOne(themeData);
    }

    static async updateTheme(username,theme){
        await db.getDb().collection('themes').updateOne({
            user:username
        },{
            $set:{theme:theme},
        });


    }

    static async getInfo(username) {
        const theme = await db.getDb().collection('themes').findOne({
            user: username
        });
        if (!theme) {
            return
        }
        else {
            const themedata = new Theme(theme);
            return themedata;
        }

    }
}

module.exports=Theme