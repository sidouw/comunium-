const express = require('express')
const router = express.Router()
const Message = require('../models/message')
const auth = require('../Utils/auth')



router.get('/messages/r/:id',auth,async(req,res)=>{

 try {
     const messages =await Message.find({room:req.params.id})
     res.send(messages)
 } catch (error) {
    res.status(400).send(error)
 }

})


module.exports = router