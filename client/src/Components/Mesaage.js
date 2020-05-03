import React from 'react'



 const Message = ({sender,time,body})=>
(    <li>
    <p>{sender}</p>
    <p>now</p>
    <p>{body}</p>
    </li>)

    export default Message