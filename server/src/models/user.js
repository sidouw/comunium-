
const {Schema,ObjectId,model} = require('mongoose');
const jwt = require('jsonwebtoken')
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
        tokens : [{
            type:String,
            required:true
        }],
        photo_url:String,
        contacts:[ObjectId], //Contact is an array of usersId
        last_login:{
            type:Date
        }
    },
    {
        timestamp:true  //timestamp so mongoose will manage creation and updpate date 
    });


userSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.genAuthToken =async function(){
    try {
        const token = jwt.sign({id:this._id.toString()},process.env.SECRET)
        this.tokens.push(token)
        await this.save()
        return token
    } catch (error) {
        throw Error(error)
    }
}

userSchema.statics.findByCred = async (username,password)=>{
    //TODO encrypt Password
    try {
        const user = await User.findOne({username,password})
        if (!user) {
            throw new Error('Unable to login')
        }
        return user
    } catch (error) {
        throw Error(error)
    }
}

const User = model("user", userSchema);
module.exports = User;
