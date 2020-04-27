import React from 'react'



 const Message = ({user,time,body})=>
(    <li>
    <p>{user}</p>
    <p>now</p>
    <p>{body}</p>
    </li>)

    export default Message