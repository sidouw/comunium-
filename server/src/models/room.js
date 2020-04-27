const {Schema,model,ObjectId} = require('mongoose')
/************************** Room Schema **************************/
//name : String
//participant: [user_id]
//n_participant
//
//password :String
//roles : [{roles_name:[user_id]}]
const roomSchema = new Schema({
 name :{
     type:String,
     required :true
 },
 users : [{
     type : ObjectId,
     ref : 'user',
     required : true
 }]
},{
    timestamps:true
})

roomSchema.virtual('messages',{
    ref: 'message',
    localField :'_id',
    foreignField :'room'
})

const Room = model("room", roomSchema);
module.exports = Room;