import React,{useEffect,useState,useMemo} from 'react'
import Message from './Mesaage'
import io from 'socket.io-client'


const ChatPage = ()=>{
    
    const socket = io.connect('127.0.1.1:5001/chat')
    const [Messages,setMessages] = useState([]) 

    useMemo(()=>{

    },[])
    useEffect(()=>{
        socket.on('message',(msg)=>{
            console.log(msg)
            setMessages(Messages => [ ...Messages, msg ])
            console.log(Messages)
        })
    },[])


    const handleSumbmit = (e)=>{
        e.preventDefault()
        const msg = e.target.elements[0].value
        socket.emit('sendMessage',{user:'doku',time:'now',text:msg})
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