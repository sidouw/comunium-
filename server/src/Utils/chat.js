
const socket = require('socket.io')
const Message = require('../models/message')
const Room = require('../models/room')

const addMessageToRoom = async (msg)=>{
  // const room = Room.findById(room_id)
  try {
    const message = new Message(msg)
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
       io.of('/chat').to(msg.room).emit('message',msg)

     })
  })

}


  module.exports = handleChat