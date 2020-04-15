
const {Schema,ObjectId} = require('mongoose')

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
        contacts:[ObjectId],
        last_login:{
            type:Date,
            required:true
        }
    },
    {
        timestamp:true
    }
)
