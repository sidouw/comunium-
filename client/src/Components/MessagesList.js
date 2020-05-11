import React from 'react'
import Message from './Mesaage'
import ScrollToBottom from 'react-scroll-to-bottom';




const MessagesList = ({Messages,Users})=>{

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
    <ScrollToBottom  className = "chatbox--messages">
        <ul className = 'MessagesList'>
        {Messages.map((message,index)=>{
            MapDataToMessage(message)
            return (
                <Message key ={index} {...message} />
            )
        })}
        </ul>
    </ScrollToBottom>
    )
}

export default MessagesList
