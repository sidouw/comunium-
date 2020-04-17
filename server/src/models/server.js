const {Schema,model} = require('mongoose')
/************************** Room Schema **************************/
//name : String
//rooms -[ { Role : objectid } ] to check 
//password : String
const roomSchema = new Schema({

},{
    timestamps:true
})
const Room = model("room", roomSchema);
module.exports = Room;