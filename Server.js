const express = require('express')
const path = require('path')
const app = express()
const PublicPath = path.join(__dirname,'./Public')

app.use(express.static(PublicPath))

app.get('*',(req,res)=>{
    res.sendFile(PublicPath.join('/index.html'))
})

app.listen(3000,()=>{
    console.log('listening')
})