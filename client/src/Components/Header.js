 import React from 'react'
 import {Link} from 'react-router-dom'


 const Header = ()=>(
     <div>
     <Link to ='/'><h1>Comnium</h1></Link>
     <Link to='/chat'>Chat</Link>
     <Link to='/profile'>Profile</Link>
     </div>
 )

 export default Header