import React,{useContext,useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {getUsers} from '../utils/UsersDataHandler'



const ChatListPage = ()=>{
    const [loading,setLoading] = useState(true)
    const [users,setUsers] = useState([{}])
    useEffect(()=>{
        getUsers().then((data)=>{
            setUsers(data)
            setLoading(false)
        })
    },[])
    return( 
        loading?
        <p>loading</p>
        :
        <div>
        <ul>
        {
            users.map((user)=>(
                <li key = {user._id}>
                <Link  to = {'/profile/'+user._id}>{user.username}</Link>
                </li>
    ))
        }
        </ul>
        </div>
    )
}

export default ChatListPage