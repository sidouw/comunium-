import React,{useState,useEffect,useContext} from 'react'
import context from '../context/context'
import {Link} from 'react-router-dom'
import {getUser} from '../utils/UsersDataHandler'
import FriendsRequestsList from './FriendsRequestsList'
import {AddFriend,DeleteFriend} from '../utils/UsersDataHandler'


const ProfilePage = (props)=>{

    const [userProfile,setProfile] = useState({})
    const [isFriend,setisFriend] = useState(false)
    const [loading,setloading] = useState(true)
    const [self,setself] = useState(false)
    const {user} = useContext(context)
    
    useEffect(()=>{

        if(props.match.params.id === user._id){
            setself(true)
            setProfile(user)
            setloading(false)
        }else{
            getUser(props.match.params.id).then((data)=>{

                if (data.error) {
                    setProfile(undefined)
                    setloading(false)
                }else if(data._id){
                    setself(false)
                    setProfile(data)
                    setisFriend(user.contacts.includes(data._id))
                    setloading(false)
                }
            })
        }

    },[])

    const handleMessage = ()=>{
        
    }
    const handleAddFriend = ()=>{
        AddFriend(userProfile._id).then(data=>{

        })

    }

    const handleDeleteFriend = ()=>{
        DeleteFriend(userProfile._id).then(data=>{
            console.log(data)
        })

    }
    return (
        loading ?
        <p>Loading</p>
        :
        userProfile ?
        <div>
        <img src='/img/Happiness.jpg' width = '200px' alt ='Profile pic '/>
        <h2>{userProfile.username}</h2>
        <h3>{userProfile.email}</h3>
        <p>description : {userProfile.state}</p>
        {!self &&
            <div>
             <button onClick = {isFriend? handleDeleteFriend: handleAddFriend}>{isFriend ? 'Delete Friend': 'Add Friend'}</button>
             <Link to ={'/chat/'+userProfile._id}>Link</Link>
             <button onClick = {handleMessage} >Message</button>
             </div>
            }

        {self && <FriendsRequestsList/>}
        
        </div>
        :
        <p>Profle not Found</p>
    )
}

export default ProfilePage