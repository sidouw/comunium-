
const {Schema,ObjectId} = require('mongoose');

/************************** User Schema **************************/
//Username-String
//password-String
//pdp url -String
//state -{online,occupé}
//contact - [user_ids]
//registred_date - Date
//last_login - Date
const userSchema = new Schema(
    {
        username:{
            type:String, 
            required:true
        },
        password:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        photo_url:String,
        contacts:[ObjectId], //Contact is an array of usersId
        last_login:{         
            type:Date,
            required:true
        }
    },
    {
        timestamp:true  //timestamp so mongoose will manage creation and updpate date 
    });

const User = mongoose.model("user", userSchema);
module.exports = User;
