import React from 'react'
import moment from 'moment'


 const Message = ({sender,icat,body,profilepic,includeExtra})=>
(    
    <li className= 'Message'>

    {includeExtra && <div className = 'Message__info'>
    <span className = 'Message__sender'>{sender}</span>
    <span className = 'Message__time'>{moment.unix(icat).format("LT")}</span> 
    </div>}

    { includeExtra && (true?
        <img src='/img/Happiness.jpg' className = 'Message__pp' alt ='Profile pic '/>
        :
        <span className = 'Message__pp'>{sender.toUpperCase()[0]}</span>)
    }
    
    <p className = 'Message__body'>{body}</p>
    </li>
    )

    export default Message