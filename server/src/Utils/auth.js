const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async (req,res,next)=>{

    try {
        const token = req.header('Authorization').replace('Bearer ','')
        
        const decoded = jwt.verify(String(token),process.env.SECRET)
        const user =await User.findOne({_id:decoded.id,tokens:token})
        
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user=user
        next()
    } catch (error) {        
        res.status(401).send('Please authenticate')
    }

}


module.exports = auth