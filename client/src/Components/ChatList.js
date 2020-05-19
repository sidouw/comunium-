import React,{useContext,useEffect,useState} from 'react'
import LastMessage from './LastMessage'
import context from '../context/context'
import {getUser} from '../utils/UsersDataHandler'
import {getLastRoomMessage} from '../utils/RoomsDataHandler'



const ChatList = ()=>{
    const [loading,setLoading] = useState(true)
    const [Messages,setMessages] = useState([]) 
    const {user} = useContext(context)
    
    const getEntries =async ()=>{
        const entries =[]
        for (let index = 0; index < user.contacts.length; index++) {
            const entry = {}
            entry.user = await getUser(user.contacts[index])
            entry.message = await getLastRoomMessage(user.contacts[index])
            entries.push(entry)
          }

        entries.sort((a,b)=>{
                return a.message.icat < b.message.icat ? 1 :-1
        })
        return entries
    }
    useEffect(()=>{
        getEntries().then((data)=>{
            console.log(data)
            setMessages(Messages => [ ...Messages, ...data ])
            setLoading(false)
        })

    },[])

    return( 
        loading?
        <p>loading</p>
        :
        <div>
        <ul className="Chatitem-list">
        {
            Messages.map((message,index)=>(
                    <LastMessage key= {index} message ={message} />
    ))
        }
        </ul>
        </div>
    )
}

export default ChatList