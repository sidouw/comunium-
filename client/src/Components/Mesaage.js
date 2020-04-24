import React from 'react'



 const Message = ({user,time,text})=>
(    <li>
    <p>{user}</p>
    <p>{time}</p>
    <p>{text}</p>
    </li>)

    export default Message