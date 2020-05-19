import React,{useEffect,useState} from 'react'
import {getFriendsRequests} from '../utils/UsersDataHandler'
import FriendRequest from './FriendRequest'

const FriendsRequestsList = ()=>{
const [Requests,setRequests] = useState([{}])
const [loading,setloading] = useState(true)

useEffect(()=>{
    getFriendsRequests().then((data)=>{
        setRequests(data)
        setloading(false)
    })
},[])

return(
    loading?
    <p>Lodaing ....</p>
    :
    <div>
    <ul className="item-list">
    {
        Requests.map((Request)=>(
            <li className = "item-list--item" key = {Request._id}>
            <FriendRequest Request={Request}/>
            </li>
        ))
    }
    </ul>
    </div>
)
}
export default FriendsRequestsList


