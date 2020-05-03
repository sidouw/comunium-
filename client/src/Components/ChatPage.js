import React,{useEffect,useState,useContext} from 'react'
import io from 'socket.io-client'
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Mesaage'
import context from '../context/context'
import {getUsersRoom,getRoomMessages} from '../utils/RoomsDataHandler'


const ChatPage = (props)=>{
    
    const socket = io.connect('127.0.1.1:5001/chat')
    const [users,setUsers] = useState([{}]) 
    const [loading,setloading] = useState(true) 
    const [Messages,setMessages] = useState([]) 
    const [room,setroom] = useState([]) 
    const {user} = useContext(context)

    useEffect(()=>{

        const id = props.match.params.id

        getUsersRoom(id).then((room)=>{
            
            setroom(room)
            setUsers(room.users)
            
            socket.emit('join',room._id)
            getRoomMessages(room._id).then((roomMessages)=>{
                setMessages(roomMessages)
                setloading(false)
            })
        })

        socket.on('message',(msg)=>{
            console.log(Messages)
            setMessages(Messages => [ ...Messages, msg ])
            console.log(msg)
        })

    },[])

    useEffect(()=>{
        Messages.forEach((msg)=>{
            users.forEach((user)=>{
                if(user._id===msg.sender){
                    return msg.sender=user.username
                }
            })
            
        })

    },[Messages])

    const handleSumbmit = (e)=>{
        e.preventDefault()
        const msg = e.target.elements[0].value
        socket.emit('sendMessage',{sender:user._id,body:msg,room:room._id})
        e.target.elements[0].value = ''
    }

    return(
        loading ?
        <p>Loading....</p>
        :
        <div className ="chatbox">
        <ScrollToBottom  className = "chatbox--messages">
            <ul>
            {Messages.map((message,index)=>(
                <Message key ={index} {...message}/>
            ))}
            </ul>
        </ScrollToBottom>
        <div className = "chatbox--input">
        
        <form className = "chatbox--input--form" onSubmit = {handleSumbmit}>
        
        <input className = "chatbox--input--form--input" placeholder="message" name ="message" required autoComplete="off"/>
        
        <button type="button" className = "chatbox--input--form--btn">
        <svg
         aria-hidden="true" focusable="false" data-prefix="far" data-icon="grin-alt" className="svg-inline--fa fa-grin-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M200.3 248c12.4-18.7 15.1-37.3 15.7-56-.5-18.7-3.3-37.3-15.7-56-8-12-25.1-11.4-32.7 0-12.4 18.7-15.1 37.3-15.7 56 .5 18.7 3.3 37.3 15.7 56 8.1 12 25.2 11.4 32.7 0zm128 0c12.4-18.7 15.1-37.3 15.7-56-.5-18.7-3.3-37.3-15.7-56-8-12-25.1-11.4-32.7 0-12.4 18.7-15.1 37.3-15.7 56 .5 18.7 3.3 37.3 15.7 56 8.1 12 25.2 11.4 32.7 0zM248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm105.6-151.4c-25.9 8.3-64.4 13.1-105.6 13.1s-79.6-4.8-105.6-13.1c-9.9-3.1-19.4 5.3-17.7 15.3 7.9 47.2 71.3 80 123.3 80s115.3-32.9 123.3-80c1.6-9.8-7.7-18.4-17.7-15.3z"></path>
        </svg>
        </button>
        
        <button  className = "chatbox--input--form--btn">
        <svg
         aria-hidden="true" focusable="false" data-prefix="fas" data-icon="external-link-square-alt" className="svg-inline--fa fa-external-link-square-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 80v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48zm-88 16H248.029c-21.313 0-32.08 25.861-16.971 40.971l31.984 31.987L67.515 364.485c-4.686 4.686-4.686 12.284 0 16.971l31.029 31.029c4.687 4.686 12.285 4.686 16.971 0l195.526-195.526 31.988 31.991C358.058 263.977 384 253.425 384 231.979V120c0-13.255-10.745-24-24-24z"></path>
        </svg>
        </button>

        </form>
        </div>
        </div>
    )

}


export default ChatPage