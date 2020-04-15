const {Schema} = require('mongoose')
/************************** Room Schema **************************/
//name : String
//participant: [user_id]
//password :String
//roles : [{roles_name:[user_id]}]
const roomSchema = new Schema({

},{
    timestamps:true
})
const Room = mongoose.model("room", roomSchema);
module.exports = Room;