import React,{useState,useContext} from 'react'
import context from '../context/context'
import moment from 'moment'
import {setMessageSeen} from '../utils/MessagesDataHandler'


 const LastMessage = ({message,setChat})=>{
     
    const {user} =useContext(context)
    
    const [online,setOnline] =  useState(false)
    const [seen,setSeen] =  useState(message.message.seen || message.message.sender === user._id )
    
    const Clicked = ()=>{
        setChat(message.user._id)
        if(!seen){
            setMessageSeen(message.message._id).then(()=>{

            }).catch(()=>{
    
            })
            setSeen(true)
        }

    }
    React.useEffect(()=>{
        setOnline(message.user.state)
    })

    return (  
    <a className = 'last-chat-elem__link' onClick = {Clicked}>  
    <li className = 'last-chat-elem' >
        <div className = 'last-chat-elem__container'>
        <img src='/img/Happiness.jpg' className ='last-chat-elem__image'  alt ='Profile pic '/>
        {online && <span className='last-chat-elem__status' ></span>}
        {!seen && <span>see</span>}
        <div className ='last-chat-elem__content'>
        <span className = 'last-chat-elem__user'>{message.user.username}</span>
        <div className ='last-chat-elem__content__data'>
            <span className = 'last-chat-elem__message'>{message.message.body}</span>
           {message.message.icat && <span className = 'last-chat-elem__time'>{moment.unix(message.message.icat).format("LT")}</span>}
        </div>

        </div>
        </div>
    </li>
    </a>
    )}

    export default LastMessage