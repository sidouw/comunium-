const {Schema,ObjectId} = require('mongoose');
/************************** Message Schema **************************/
//from : user_id
//to_user : bool
//to : (room/user)_id
//body :{}
//sent_le :

const messageSchema = new Schema({
    sender :{
        type:ObjectId,
        required:true
    },
    sent_to_user : {
        type:Boolean,
        required:true
    },
    reciever :{
        type:ObjectId,
        required:true
    },
    body :{
        type:String,
        required:true
    },
    Media:[String]  //url of pictures and stuff 
},
{
    timestamps:true
});
const Message = mongoose.model("message", messageSchema);
module.exports = Message;