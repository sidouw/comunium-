import React,{useEffect,useState,useContext} from 'react'
import io from 'socket.io-client'
import Message from './Mesaage'
import context from '../context/context'
import {getUsersRoom,getRoomMessages} from '../utils/RoomsDataHandler'


const ChatPage = (props)=>{
    
    const socket = io.connect('127.0.1.1:5001/chat')
    const [Messages,setMessages] = useState([]) 
    const [room,setroom] = useState([]) 
    const {user} = useContext(context)
    useEffect(()=>{

        const id = props.match.params.id

        getUsersRoom(id).then((room)=>{
            setroom(room)
            socket.emit('join',room._id)
            getRoomMessages(room._id).then((roomMessages)=>{
                console.log(roomMessages)
                setMessages(roomMessages)
            })
        })

        socket.on('message',(msg)=>{
            setMessages(Messages => [ ...Messages, msg ])
        })

    },[])


    const handleSumbmit = (e)=>{
        e.preventDefault()
        const msg = e.target.elements[0].value
        socket.emit('sendMessage',{sender:user._id,body:msg,room:room._id})
        e.target.elements[0].value = ''
    }

    return(
        <div>
        <div>
            <ul>
            {Messages.map((message,index)=>(
                <Message key ={index} {...message}/>
            ))}
            </ul>
        </div>
        <div>
        <form onSubmit = {handleSumbmit}>
        <input placeholder="message" name ="message" required autoComplete="off"/>
        <button>Send</button>
        </form>
        </div>
        </div>
    )

}


export default ChatPage