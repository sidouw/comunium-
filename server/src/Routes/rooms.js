const express = require('express')
const router = express.Router()
const Room = require('../models/room')
const auth = require('../Utils/auth')




router.post('/rooms',auth,async (req,res)=>{
    console.log(req.body)
    try {
        const room = new Room(req.body)
        room.users.push(req.user._id)
        await room.save()
        res.status(201).send({room})
    } catch (error) {
        res.status(400).send({error})
    }
})

router.patch('/rooms',auth,async(req,res)=>{
    const allowedupdates = ['name','users']
    
    const updates = Object.keys(req.body)
    const isValid = updates.every(update=> allowedupdates.includes(update))
    if(!isValid){
        return res.status(400).send()
    }
    try {

        updates.forEach((update)=>req.user[update]= req.body[update])

        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/rooms/:id',auth,async (req,res)=>{
    console.log('1dt')
    try {
        const room =await Room.findOne({_id:req.params.id})
        if(! room){
            return  res.status(400).send({error:'Room Not Found'})
        }
        res.send(room)
    } catch (error) {
        res.status(400).send({error})
    }

})


router.get('/rooms/u/:id',auth,async (req,res)=>{
    try {
        const room =await Room.findOne({users:{$all:[req.params.id,req.user._id]}})
        if(room){
            await room.populate('users').execPopulate()
        }
        if(! room){
            const room = new Room({name:req.params.id+req.user._id})
            room.users= [req.params.id,req.user._id]
            await room.save()
            res.send(room)
        }
        res.send(room)
    } catch (error) {
        res.status(400).send({error})
    }
})

router.delete('/rooms',auth,async (req,res)=>{
    try {

    } catch (error) {
        res.status(400).send()
    }


})



module.exports = router