
const socket = require('socket.io')


const handleChat = (server)=>{

  const io = socket(server)
  
  io.of('/chat').on('connection',(socket)=>{
    
     socket.on('sendMessage',(msg)=>{
       io.of('/chat').emit('message',msg)
     })
     

  })

}


  module.exports = handleChat