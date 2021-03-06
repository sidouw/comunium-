const express = require('express')
const router = express.Router()
const Message = require('../models/message')
const auth = require('../Utils/auth')



router.get('/messages/u/:id',auth,async(req,res)=>{
    try {

        let  msg = await Message.findOne({sender:req.user._id,receiver:req.params.id},null, { sort: {$natural: -1 } })
        if (msg) {
             const partnermsg = await Message.findOne({sender:req.params.id,receiver:req.user._id},null, { sort: {$natural: -1 } })        
                if (partnermsg && partnermsg.icat>msg.icat) {
                    res.send(partnermsg)
                    return
                }
            res.send(msg)
        }else{
            msg = await Message.findOne({sender:req.params.id,receiver:req.user._id},null, { sort: {$natural: -1 } })
            if (msg){                
                const partnermsg = await Message.findOne({sender:req.user._id,receiver:req.params.id},null, { sort: {$natural: -1 } })
                if (partnermsg && partnermsg.icat>msg.icat) {
                    res.send(partnermsg)
                    return
                }
             res.send(msg)
            }else{
                res.send({error:'No Message'})
            }
            
        }
    } catch (error) {
        res.status(400).send({error})
    }

    
})

router.get('/messages/r/:id',auth,async(req,res)=>{

 try {
     const messages =await Message.find({room:req.params.id})
     res.send(messages)
 } catch (error) {
    res.status(400).send(error)
 }

})

router.get('/messages/seen/:id',auth,async(req,res)=>{
    try {
        const message =await Message.findById(req.params.id)
        message.seen = true
        await message.save()
        res.send()
    } catch (error) {
       res.status(400).send(error)
    }
   
   })

module.exports = router