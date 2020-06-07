import React,{useState,useEffect,useRef} from 'react'
import io from 'socket.io-client'
import {getUsersRoom} from '../utils/RoomsDataHandler'
import Chat from './Chat'
import ChatList from './ChatList'

const ChatPage = ()=>{

        const socket = io.connect('127.0.1.1:5001/chat')
        const [chatId,setChatId] = useState('5eae052a7aebb33270bfb599')
        const [room,setroom] = useState() 
        const [msg,setmsg] = useState('') 
        const [loading,setloading] = useState(true)

        const emitter =socket.on('message',setmsg)
        
        const emRef = useRef(emitter)
        // 
         

 
    useEffect(()=>{
        getUsersRoom(chatId).then((room)=>{      
            setroom(room)
            socket.emit('join',room._id)
            
            setloading(false)
        })
        
    },[])

        const setChat = (id)=>{
            if (id !==chatId ) {
                socket.emit('leave',room._id)
                socket.off('message',setmsg)
                setChatId(id)
                getUsersRoom(id).then((room)=>{      
                    setroom(room)
                    socket.emit('join',room._id)
                    emRef.current.off()
                    emRef.current=socket.on('message',setmsg)
                })
            }

        }
    return (
        loading ? 
        <p>Loading ...........</p>
        :

        <div className ="chat-page-container">
        <ChatList setChat= {setChat}/>
        <Chat room = {room} socket= {socket} message= {msg}/>
        </div>

        
    )

}


export default ChatPage