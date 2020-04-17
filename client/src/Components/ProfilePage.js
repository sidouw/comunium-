import React from 'react'


const ProfilePage = (props)=>{

    return (
        <div>
        <img src='/img/Happiness.jpg' width = '200px' alt ='Profile pic '/>
        <h2>User</h2>
        <h3>Email@Email.com</h3>
        <p>description : A weebb</p>
        <p>{props.match.params.id}</p>
        </div>
    )
}

export default ProfilePage