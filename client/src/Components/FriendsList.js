import React,{useEffect,useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import {getFriends} from '../utils/UsersDataHandler'
import context from '../context/context'

const FriendsList = (props)=>{
const [friends,setfriends] = useState([{}])
const [loading,setloading] = useState(true)
const {user} = useContext(context)
useEffect(()=>{
    getFriends(user._id).then((data)=>{
        setfriends(data)
        setloading(false)
    })
},[])

return(
    loading?
    <p>Lodaing ....</p>
    :
    <div >
    <ul className="item-list">
    {
        friends.map((friend)=>(
            <li className = "item-list--item" key = {friend._id} >
            <div className="nav-link">
            <img src='/img/Happiness.jpg'  alt ='Profile pic '/>
            <span className="item-list--item-text">{friend.username}</span>
            <Link to={'/profile/'+friend._id} className ="profile-link">
            <svg 
            aria-hidden="true" focusable="false" data-prefix="far" data-icon="address-card" className="svg-inline--fa fa-address-card fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 400H48V80h480v352zM208 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm-89.6 128h179.2c12.4 0 22.4-8.6 22.4-19.2v-19.2c0-31.8-30.1-57.6-67.2-57.6-10.8 0-18.7 8-44.8 8-26.9 0-33.4-8-44.8-8-37.1 0-67.2 25.8-67.2 57.6v19.2c0 10.6 10 19.2 22.4 19.2zM360 320h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8z"></path>
            </svg>  
            </Link>
            <Link to={'/chat/'+friend._id} className ="chat-link">
            <svg 
             aria-hidden="true" focusable="false" data-prefix="fas" data-icon="comment" className="svg-inline--fa fa-comment fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"></path>
            </svg>
        
            </Link>
            </div>
            
            </li>
        ))
    }
    </ul>
    </div>
)
}
export default FriendsList


