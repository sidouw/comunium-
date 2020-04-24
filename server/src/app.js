const express = require("express");
const cookieParser = require('cookie-parser')
require('dotenv').config();
require('./db/mongoose');
const cors = require('cors')
const http = require('http')

const usersroute = require('./Routes/users')
const handleChat = require('./Utils/chat')



const app = express()
const server = http.createServer(app)



app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(usersroute)
handleChat(server)


module.exports = {server}