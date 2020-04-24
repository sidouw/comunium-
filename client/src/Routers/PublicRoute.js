import React,{useContext} from 'react'
import {Route,Redirect} from 'react-router-dom'
import context from '../context/context'




const PublciRoute= ({component:Component,...rest})=>{

    const {loged} = useContext(context)

    return(
        <Route {...rest} component = {(props)=>(
            !loged ?
            <div>
            <Component {...props}/>
            </div> 
            :
            <Redirect to='/dashboard'/>
        )} />
    )

} 

export default PublciRoute