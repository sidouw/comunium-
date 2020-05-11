
const socket = require('socket.io')
const Message = require('../models/message')
const moment = require('moment')

const addMessageToRoom = async (msg)=>{
 
  try {
    const message = new Message(msg)
    message.icat = moment().unix()
    await message.save()
  } catch (error) {
    console.log(error)
  }

}

const handleChat = (server)=>{

  const io = socket(server)
  
  io.of('/chat').on('connection',(socket)=>{
    
    socket.on('join',(room)=>{
      socket.join(room)
    })

     socket.on('sendMessage',(msg)=>{
      addMessageToRoom(msg).then(()=>{
 
      })
       const message = {...msg,icat:moment().unix()}
       io.of('/chat').to(message.room).emit('message',message)

     })
  })

}


  module.exports = handleChat