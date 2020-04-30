import React from 'react'
import {HandleRequest} from '../utils/UsersDataHandler'

const FriendRequest = ({Request})=>{

 const accept = ()=>{
    HandleRequest(Request._id,'A').then(data=>{

    })
 }   

 const decline = ()=>{
    HandleRequest(Request._id,'D').then(data=>{

    })
}   

return (
    <div>
    <span>{Request.username}</span>
    <button onClick ={accept}>Accept</button>
    <button onClick = {decline}>decline</button>
    </div>
)
}

export default FriendRequest