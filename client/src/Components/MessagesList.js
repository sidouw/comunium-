import React, {useRef,useLayoutEffect } from 'react'
import Message from './Mesaage'





const MessagesList = ({Messages,Users})=>{

    const messagesEndRef = useRef(null)
    const chatboxref  = useRef()


    useLayoutEffect(()=>{
        messagesEndRef.current.scrollIntoView({ behavior: "smooth",block: "end", inline: "nearest"})
    },[])
    useLayoutEffect(()=>{
        const shouldScrollToBottom = chatboxref.current.scrollTop + chatboxref.current.clientHeight + 200 >= chatboxref.current.scrollHeight
        if (shouldScrollToBottom) {
            messagesEndRef.current.scrollIntoView({ block: "end", inline: "nearest"})
        }
    },[Messages])
    const MapDataToMessage = (msg)=>{
        Users.forEach(user => {
            if(user._id===msg.sender){
                if (Messages[Messages.length-1] === msg.sender) {
                    msg.includeExtra = true
                }else{
                    msg.includeExtra = true
                }
                
                return msg.sender=user.username
            }
        });

    }

    return (        
    <div ref={chatboxref}  className = "chatbox--messages">
        <ul className = 'MessagesList'>
        {Messages.map((message,index)=>{
            MapDataToMessage(message)
            return (
                <Message key ={index} {...message} />
            )
        })}
        </ul>
        <div ref={messagesEndRef} />
    </div>
    )
}

export default MessagesList
