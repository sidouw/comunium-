import React,{useEffect,useState} from 'react'
import {getFriends} from '../utils/UsersDataHandler'


const FriendsList = (props)=>{
const [friends,setfriends] = useState([{}])
const [loading,setloading] = useState(true)
useEffect(()=>{
    getFriends(props.id).then((data)=>{
        setfriends(data)
        setloading(false)
    })
},[])

return(
    loading?
    <p>Lodaing ....</p>
    :
    <div>
    <h3>Friends</h3>
    <ul>
    {
        friends.map((friend)=>(
            <li key = {friend._id}>
            {friend.username}
            </li>
        ))
    }
    </ul>
    </div>
)
}
export default FriendsList


