const express = require('express')
const router = express.Router()
const User = require('../models/user')
const auth = require('../Utils/auth')



router.post('/users/login',async (req,res)=>{
    
    try {
        const user = await User.findByCred(req.body.username,req.body.password)
        const token = await user.genAuthToken()
        res.status(200).send({user,token})
    } catch (error) {
        res.status(400).send({error})
    }
})

router.post('/users/logout',auth,async (req,res)=>{
    try {
        req.user.tokens =req.user.tokens.filter((token)=> req.token !== token)
        await req.user.save()
        res.status(200).send({user:req.user})
    } catch (error) {
        res.status(400).send({error})
    }
})

router.post('/users/signup',async (req,res)=>{

    try {
        const user = new User(req.body)
        const token = await user.genAuthToken()
        res.status(201).send({user,token})
    } catch (error) {
        res.status(400).send({error:'email already in use'})
    }
})

router.patch('/users',auth,async(req,res)=>{
    const allowedupdates = ['username','password','state']
    
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

router.get('/users/auth',auth,(req,res)=>{
    res.send(req.user)
})

router.get('/users/:id',async (req,res)=>{
    try {
        const user =await User.findOne({_id:req.params.id})
        if(! user){
            return  res.status(400).send({error:'User Not Found'})
        }
        res.send(user)
    } catch (error) {
        res.status(400).send({error})
    }

})



router.delete('/users',auth,async (req,res)=>{
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(400).send()
    }


})

module.exports = router