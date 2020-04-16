const express = require("express");
require('dotenv').config();

require('./db/mongoose');
const usersroute = require('./Routes/users')

const app = express()

app.use(express.json())
app.use(usersroute)

app.listen(process.env.PORT,()=>{
  console.log('server started on ',process.env.PORT);
  
})

