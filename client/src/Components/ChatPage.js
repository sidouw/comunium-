import React,{useState,useEffect,useRef,useContext} from 'react'
import io from 'socket.io-client'
import {getUsersRoom} from '../utils/RoomsDataHandler'
import context from "../context/context";
import Chat from './Chat'
import ChatList from './ChatList'
import ChatListFilter from './ChatListFilter'

const ChatPage = (props)=>{

        const socket = useRef()
        const [room,setroom] = useState() 
        const [msg,setmsg] = useState('') 
        const [LastMsg,setLastMsg] = useState('')
        const [discUser,setdiscUser] = useState('') 
        const [conUser,setConUser] = useState('')
        const [chatFilter,setchatFilter] = useState('')
        const [loading,setloading] = useState(true)
        const [loadingChat,setloadingChat] = useState(true)
        const {user} = useContext(context)
        const chatIdRef = useRef('') 


 
    useEffect(()=>{
        socket.current = io.connect('127.0.1.1:5001/chat')
        socket.current.emit('join',user._id)
        socket.current.on('message',msg=>{   
                      
            if(chatIdRef.current === msg.sender){
                msg.seen=true
                setLastMsg(msg) 
                setmsg(msg)
                
            }else{
                setLastMsg(msg)  
            }
            
        })

        socket.current.on('userdisconnected',duser=>{
            setdiscUser(duser)
            console.log('the ooozz')
        })

        socket.current.on('userconnected',cuser=>{
            setConUser(cuser)
        })

        setloading(false)
        return ()=>{
            socket.current.emit('leave',user._id)
        }
    },[])

    const sendMessage = message=>{
        setLastMsg(message)
        setmsg(message)
        socket.current.emit('sendMessage',message)
    }
        const setChat = (id)=>{
            if (id !==chatIdRef.current ) {
                chatIdRef.current = id
                window.history.replaceState('', '', id)
                getUsersRoom(id).then((room)=>{      
                    setroom(room)
                    setloadingChat(false)
                })
            }
        }

    return (
        loading ? 
        <p>Loading ...........</p>
        :

        <div className ="chat-page-container">
        <div className ="Chat-List-container">
        <ChatListFilter setchatFilter = {setchatFilter} chatFilter={chatFilter}/>
        <ChatList setChat= {setChat} LastMsg={LastMsg} chatFilter={chatFilter} discUser={discUser} conUser={conUser} />
        </div>
        
        {!loadingChat && <Chat room = {room} sendMessage= {sendMessage} message= {msg}/>}
        </div>

        
    )

}


export default ChatPage