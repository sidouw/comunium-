
const socket = require('socket.io')
const Message = require('../models/message')
const User = require('../models/user')
const fs = require('fs')

const addMessageToRoom = async (msg)=>{
 
  try {
    const message = new Message(msg)
    await message.save()
  } catch (error) {
    console.log(error)
  }

}

const UpdateState = async (id,socketId)=>{

  try {
    const user = await User.findById(id)
    if(user){
      
      user.state.push(socketId)
      await user.save()
      user.contacts.forEach(contact => {   
        io.of('/chat').to(contact).emit('userconnected',user._id)
      })
    }
  } catch (error) {
    
  }

}

const handledisconnect = async (socketId,io) => {
  try {
    const user = await User.findOne({state:socketId})
    if (user) {
      user.state = user.state.filter(sId=>sId !== socketId)
      console.log(user.state.length)
      if (user.state.length === 0) {
        user.contacts.forEach(contact => {  
           
          io.of('/chat').to(contact).emit('userdisconnected',user._id)
        })
      }
      await user.save()
    }

  } catch (error) {
    
  }


}


const handleChat = (server)=>{

  const io = socket(server)
  
  io.of('/chat').on('connection',(socket)=>{
    socket.on('join',(room)=>{
      socket.join(room)
      UpdateState(room,socket.id)
    })

    socket.on('leave',(room)=>{
      socket.leave(room)
    })

     socket.on('sendMessage',(msg)=>{
      addMessageToRoom(msg).then(()=>{
 
      })
       const message = {...msg}
       io.of('/chat').to(message.receiver).emit('message',message)
     })


     socket.on('disconnect',()=>{
      
      handledisconnect(socket.id,io)
  })

  })

}


  module.exports = handleChat