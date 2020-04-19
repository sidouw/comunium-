const express = require("express");
const cookieParser = require('cookie-parser')
require('dotenv').config();
const cors = require('cors')
require('./db/mongoose');
const usersroute = require('./Routes/users')

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(usersroute)

app.listen(process.env.PORT,()=>{
  console.log('server started on ',process.env.PORT);
  
})

