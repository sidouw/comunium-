const express = require("express");
const cookieParser = require('cookie-parser')
require('dotenv').config();
require('./db/mongoose');
const cors = require('cors')
const http = require('http')

const usersroute = require('./Routes/users')
const roomsroute = require('./Routes/rooms')
const messagesroute = require('./Routes/messages')
const handleChat = require('./Utils/chat')



const app = express()
const server = http.createServer(app)



app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(usersroute)
app.use(roomsroute)
app.use(messagesroute)


handleChat(server)

// const Room = require('./models/room')
// const main = async()=>{
//     const room = await Room.findById('5eae2d1d7aebb33270bfb59d')
//     console.log(room);
//     console.log('_________________');
//     await room.populate('users').execPopulate()
//     console.log(room);

// }
// main()

module.exports = {server}


