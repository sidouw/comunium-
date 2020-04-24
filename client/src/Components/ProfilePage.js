import React,{useState,useEffect,useContext} from 'react'
import context from '../context/context'
import {getUser} from '../utils/UsersDataHandler'
const ProfilePage = (props)=>{

    const [userProfile,setProfile] = useState({})

    const {loaing,setloading,user} = useContext(context)

    useEffect(()=>{
        if (props.match.params.id) {
            getUser(props.match.params.id).then((data)=>{
                if (data.error) {
                    setProfile(undefined)
                    setloading(false)
                }else if(data._id){
                    setProfile(data)
                    setloading(false)
                }
            })
        }else{
            setProfile(user)
        }
    },[])

    return (
        loaing ?
        <p>Loading</p>
        :
        <div>
        <img src='/img/Happiness.jpg' width = '200px' alt ='Profile pic '/>
        <h2>{userProfile.username}</h2>
        <h3>{userProfile.email}</h3>
        <p>description : {userProfile.state}</p>
        </div>
    )
}

export default ProfilePage