import React,{useEffect,useState,useContext} from 'react'
import  moment  from 'moment';
import context from '../context/context'
import {getRoomMessages} from '../utils/RoomsDataHandler'
import MessagesList from './MessagesList';

const Chat = ({room,sendMessage,message})=>{

    
    const [partner,setPartner] = useState([{}]) 
    const [loading,setloading] = useState(true) 
    const [Messages,setMessages] = useState([]) 
    const {user} = useContext(context)



    useEffect(()=>{
        getRoomMessages(room._id).then((roomMessages)=>{
            setMessages(roomMessages)
            if(!room.error){
                room.users.forEach(ruser => {
                    if(ruser._id !== user._id ){
                        setPartner(ruser)
                    }
                })
                setloading(false)
            }

            
        })

    },[room])

    useEffect(()=>{
        setMessages(Messages => [ ...Messages, message ])
    },[message])


    const handleSumbmit = (e)=>{
        e.preventDefault()
        const msg = e.target.elements[0].value
        if(msg.trim()!==''){
            const message = {sender:user._id,body:msg,room:room._id,receiver:partner._id,icat: moment().unix()}
            sendMessage(message)
            e.target.elements[0].value = ''
        }
    }

    return(
        loading ?
        <p>Loading....</p>
        :
        room.error?
         <p>Empty</p>
        :
        <div className ="chatbox">
        <div className = 'chatbox__header'>
        <span className = 'chatbox__header__title'>{partner.username }</span>
        </div>
        <MessagesList Messages = {Messages} Users = {[partner,user]}/>

        <div className = "chatbox--input">
        
        <form className = "chatbox--input--form" onSubmit = {handleSumbmit}>
        
        <input className = "chatbox--input--form--input" placeholder="message" name ="message" required autoComplete="off"/>
         
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


export default Chat