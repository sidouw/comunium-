const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");


/************************** configuration section **************************/

//  setup the env variable found in .env
require("dotenv").config();

//  Setup the mongoDB connection with mongoose
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
