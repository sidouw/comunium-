const {Schema,model} = require('mongoose')
/************************** Room Schema **************************/
//name : String
//participant: [user_id]
//n_participant
//
//password :String
//roles : [{roles_name:[user_id]}]
const roomSchema = new Schema({

},{
    timestamps:true
})
const Room = model("room", roomSchema);
module.exports = Room;