const {Schema,model,ObjectId} = require('mongoose');
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
    Reciever :{
        type:ObjectId,
        required:true
    },
    body :{
        type:String,
        required:true
    },
    icat:{
        type:Number
    },
    Media:[String]  //url of pictures and stuff 
}
);
const Message = model("message", messageSchema);
module.exports = Message;