import React,{useEffect,useState} from 'react'
import {getFriendsRequests} from '../utils/UsersDataHandler'
import FriendRequest from './FriendRequest'

const FriendsRequestsList = (props)=>{
const [Requests,setRequests] = useState([{}])
const [loading,setloading] = useState(true)

useEffect(()=>{
    getFriendsRequests().then((data)=>{
        console.log(data)
        setRequests(data)
        setloading(false)
    })
},[])

return(
    loading?
    <p>Lodaing ....</p>
    :
    <div>
    <h3>Friend Requests</h3>
    <ul>
    {
        Requests.map((Request)=>(
            <li key = {Request._id}>
            <FriendRequest Request={Request}/>
            </li>
        ))
    }
    </ul>
    </div>
)
}
export default FriendsRequestsList


