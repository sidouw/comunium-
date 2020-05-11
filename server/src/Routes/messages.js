const express = require('express')
const router = express.Router()
const Message = require('../models/message')
const Room = require('../models/room')
const User = require('../models/user')
const auth = require('../Utils/auth')



router.get('/messages/u/:id',async(req,res)=>{
    console.log('sidou')
    let response = []
    const rooms = await Room.find({users:req.params.id})
    rooms.forEach(async (room)=>{

        const ruser = room.users.filter((user)=>user!=req.params.id)[0]
        const user =await User.findById(ruser)
        const message = await Message.findOne({sender:req.params.id,room:room._id},null, { sort: {$natural: -1 } })
        if (message) {
            response.push({user:user.username,message:message.body})
        }
        
        
    })
    console.log(response)
    res.send(response)
})

router.get('/messages/r/:id',auth,async(req,res)=>{

 try {
     const messages =await Message.find({room:req.params.id})
     res.send(messages)
 } catch (error) {
    res.status(400).send(error)
 }

})


module.exports = router