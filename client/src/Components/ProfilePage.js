import React,{useState,useEffect,useContext} from 'react'
import context from '../context/context'
import {Link} from 'react-router-dom'
import {getUser} from '../utils/UsersDataHandler'
import FriendsRequestsList from './FriendsRequestsList'
import {AddFriend,DeleteFriend} from '../utils/UsersDataHandler'


const ProfilePage = (props)=>{

    const [userProfile,setProfile] = useState({})
    const [disableButton,setdisableButton] = useState(false)
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
        props.history.push('/chat/'+userProfile._id)
    }
    const handleAddFriend = ()=>{
        setdisableButton(true)
        AddFriend(userProfile.username).then(({error,ok})=>{
            
        })
    }

    const handleDeleteFriend = ()=>{
        setdisableButton(true)
        DeleteFriend(userProfile._id).then(data=>{

        })

    }

    return (
        loading ?
        <p>Loading</p>
        :
        userProfile ?
        <div className = 'profile'>
        <img className = 'profile__picture' src='/img/Happiness.jpg' alt ='Profile pic '/>
        <h2 className = 'profile__name'> {userProfile.username}</h2>
        <h3 className = 'profile__email'>Email : {userProfile.email}</h3>
        {!self &&
            <div className = 'profile__buttons'>
             <button disabled={disableButton} onClick = {isFriend? handleDeleteFriend: handleAddFriend}>{isFriend ? 'Delete Friend': 'Add Friend'}</button>
             <button onClick = {handleMessage} >Message</button>
             </div>
            }
        
        </div>
        :
        <p>Profle not Found</p>
    )
}

export default ProfilePage