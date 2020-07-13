import React,{useContext,useState} from 'react'
import {HandleRequest} from '../utils/UsersDataHandler'
import context from '../context/context'

const FriendRequest = ({Request})=>{
 const {user} = useContext(context)
 const [disable,setdisable] = useState(false)
 const accept = ()=>{
    setdisable(true)
    HandleRequest(Request._id,'A').then(data=>{
        user.contacts = [...user.contacts,Request._id]
    })
    
 }   

 const decline = ()=>{
    setdisable(true)
    HandleRequest(Request._id,'D').then(data=>{

    })
}   

return (
    <div className="Reqeust">
    <img src='/img/Happiness.jpg'  alt ='Profile pic '/>
    <span className="Reqeust__text">{Request.username}</span>
    <button onClick ={accept} disabled ={disable}>Accept</button>
    <button onClick = {decline} disabled ={disable}>decline</button>
    </div>
)
}

export default FriendRequest