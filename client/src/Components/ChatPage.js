import React,{useState,useEffect,useRef,useContext} from 'react'
import io from 'socket.io-client'
import {getUsersRoom} from '../utils/RoomsDataHandler'
import context from "../context/context";
import Chat from './Chat'
import ChatList from './ChatList'
import ChatListFilter from './ChatListFilter'
import serverURL from '../utils/ServerURL'
const ChatPage = (props)=>{

        const socket = useRef()
        const [room,setroom] = useState() 
        const [msg,setmsg] = useState('') 
        const [LastMsg,setLastMsg] = useState('')
        const [chatFilter,setchatFilter] = useState('')
        const [loading,setloading] = useState(true)
        const [loadingChat,setloadingChat] = useState(true)
        const {user} = useContext(context)
        const chatIdRef = useRef('') 
        const urlChatId = useRef(undefined) 

 
    useEffect(()=>{
        socket.current = io.connect(serverURL+'/chat')
        socket.current.emit('join',user._id,user.contacts)
        socket.current.on('message',msg=>{   
                      
            if(chatIdRef.current === msg.sender){
                msg.seen=true
                setLastMsg(msg) 
                setmsg(msg)
                
            }else{
                setLastMsg(msg)  
            }
            
        })

        socket.current.on('ping',(pong)=>{
            if (pong){
                pong()
            }
            
        })
        
        if(props.match.params.id){
            urlChatId.current = props.match.params.id
        }

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
        if(urlChatId.current){
            if (id !==chatIdRef.current ) {
                chatIdRef.current = urlChatId.current
                window.history.replaceState('', '', 'chat/'+id)
                getUsersRoom(urlChatId.current).then((room)=>{      
                    setroom(room)
                    setloadingChat(false)
                })
            }   
            urlChatId.current=undefined
        }else{
                if (id !==chatIdRef.current ) {
                    chatIdRef.current = id
                    window.history.replaceState('', '', 'chat/'+id)
                    getUsersRoom(id).then((room)=>{      
                        setroom(room)
                        setloadingChat(false)
                    })
                }       
        }

    }

    return (
        loading ? 
        <p>Loading ...........</p>
        :

        <div className ="chat-page-container">
        <div className ="Chat-List-container">
        <ChatListFilter setchatFilter = {setchatFilter} chatFilter={chatFilter}/>
        <ChatList setChat= {setChat} LastMsg={LastMsg} chatFilter={chatFilter} socket={socket.current} />
        </div>
        
        {!loadingChat && <Chat room = {room} sendMessage= {sendMessage} message= {msg}/>}
        </div>

        
    )

}


export default ChatPage