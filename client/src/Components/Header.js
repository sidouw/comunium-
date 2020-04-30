 import React ,{useContext}from 'react'
 import {Link} from 'react-router-dom'
import context from '../context/context'

 const Header = ()=>{
     const {user} = useContext(context)
    
    return(
     <div>
     <Link to ='/'><h1>Comnium</h1></Link>
     <Link to='/chat'>Chat</Link>
     <Link to={'/profile/'+user._id}>Profile</Link>
     </div>
 )}

 export default Header