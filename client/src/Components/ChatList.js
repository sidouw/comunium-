import React,{useContext,useEffect,useState} from 'react'
import { useAsync } from 'react-async-hook'
import LastMessage from './LastMessage'
import context from '../context/context'
import {getUser} from '../utils/UsersDataHandler'
import {getLastRoomMessage} from '../utils/RoomsDataHandler'
import friendsSelector from '../Selectors/FriendsSelector'


const ChatList = ({setChat,LastMsg,chatFilter,discUser,conUser})=>{
    const [loading,setLoading] = useState(true)
    const [chatListData,setChatListData] = useState([])
    const [chatList,setChatList] = useState([])
    const {user} = useContext(context)
    
    const getEntries =async ()=>{
        const Friends =[]
        for (let index = 0; index < user.contacts.length; index++) {
            const entry = {}
            entry.user = await getUser(user.contacts[index])
            entry.message = await getLastRoomMessage(user.contacts[index])
            Friends.push(entry)
          }
        
        return friendsSelector(Friends,chatFilter)
    }
    useEffect(()=>{
        getEntries().then((data)=>{
            if (!user.contacts.length==0) {
                setChat(data[0].user._id)
                setChatListData([...data])
                setChatList([ ...data])   
            }
            setLoading(false)
        })
    },[])

    useEffect(()=>{
        
        chatListData.forEach(chat=>{
            if (chat.user._id===discUser) {
                chat.user.state = []
            }
        })
        setChatListData([...chatListData])
        setChatList([...chatListData])
        console.log(chatListData)
        
        
    },[discUser])

    useEffect(()=>{
        
        chatListData.forEach(chat=>{
            if (chat.user._id===conUser) {
                chat.user.state = [1]
            }
        })
        setChatListData([...chatListData])
        setChatList([...chatListData])
        console.log(chatListData)
        
    },[conUser])

    useEffect(()=>{
        chatListData.forEach((chat)=>{
            if(chat.user._id === LastMsg.sender ||   chat.user._id === LastMsg.receiver){
                chat.message = LastMsg
            }
        })
    setChatList([ ...chatListData])
    },[LastMsg])

    useEffect(()=>{
    setChatList([ ...friendsSelector(chatListData,chatFilter)])

    },[LastMsg,chatFilter])

    return( 
        loading?
        <p>loading</p>
        :
        user.contacts.length==0?
         <p>Empty</p>
        :
        <div>
        <ul className="Chatitem-list">
        {
            chatList.map((message,index)=>(
                    <LastMessage key= {index} message ={message} setChat={setChat}/>
    ))
        }
        </ul>
        </div>
    )
}

export default ChatList