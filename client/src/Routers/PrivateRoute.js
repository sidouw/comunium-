import React,{useContext,useEffect,useState} from 'react'
import {Route,Redirect} from 'react-router-dom'
import cookie from 'js-cookie'
import context from '../context/context'
import {authanticate} from '../utils/auth'
import SideBar from '../Components/SideBar'



const PrivateRoute= ({component:Component,...rest})=>{
    const [loading,setloading] = useState(true)
    const {loged,setloged,setUser} = useContext(context)

    useEffect(()=>{
        authanticate(cookie.get('token')).then((data)=>{
            if (data.error) {
                setloged(false)
                setloading(false)
                return
            }else if (data._id){
                setUser(data)
                setloged(true)
                setloading(false)
            }
        })
    },[])
    return(
        loading ? 
        <p>Loading ......</p>
        :
        <Route {...rest} component = {(props)=>(
            loged ?
            <>
            <SideBar/>
            <div className ='main-content'>
            <Component {...props}/>
            </div>
            </> 
            :
            <Redirect to='/'/>
        )} />
    )

} 

export default PrivateRoute