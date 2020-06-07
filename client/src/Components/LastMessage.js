import React from 'react'


 const LastMessage = ({message,setChat})=>{
    
    const Clicked = ()=>{
        setChat(message.user._id)
    }

    return (  
    <a className = 'last-chat-elem__link' onClick = {Clicked}>  
    <li className = 'last-chat-elem' >
        <div className = 'last-chat-elem__container'>
        <img src='/img/Happiness.jpg' className ='last-chat-elem__image'  alt ='Profile pic '/>
        <div className ='last-chat-elem__content'>
        <span className = 'last-chat-elem__user'>{message.user.username}</span>
        <div className ='last-chat-elem__content__data'>
            <span className = 'last-chat-elem__message'>{message.message.body}</span>
            <span className = 'last-chat-elem__time'>16:45</span>
        </div>

        </div>
        </div>
    </li>
    </a>
    )}

    export default LastMessage