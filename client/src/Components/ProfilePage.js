import React,{useState,useEffect,useContext} from 'react'
import context from '../context/context'
import {Link} from 'react-router-dom'
import {getUser} from '../utils/UsersDataHandler'

const ProfilePage = (props)=>{

    const [userProfile,setProfile] = useState({})
    const [self,setself] = useState(false)
    const {loaing,setloading,user} = useContext(context)

    useEffect(()=>{
        if (props.match.params.id) {
            getUser(props.match.params.id).then((data)=>{
                if (data.error) {
                    setProfile(undefined)
                    setloading(false)
                }else if(data._id){
                    setself(false)
                    setProfile(data)
                    setloading(false)
                }
            })
        }else{
            setself(true)
            setProfile(user)
        }
    },[])

    const handleMessage = ()=>{
        console.log('Message')
    }
    const handleAddFriend = ()=>{
        console.log('addd')
    }

    return (
        loaing ?
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
             <button onClick = {handleAddFriend}>Add Friend</button>
             <Link to ={'/chat/'+userProfile._id}>Link</Link>
             <button onClick = {handleMessage} >Message</button>
             </div>
            }
        </div>
        :
        <p>Profle not Found</p>
    )
}

export default ProfilePage