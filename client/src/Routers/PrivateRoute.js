import React,{useContext,useEffect} from 'react'
import {Route,Redirect} from 'react-router-dom'
import cookie from 'js-cookie'
import Header from '../Components/Header'
import context from '../context/context'
import {authanticate} from '../utils/auth'



const PrivateRoute= ({component:Component,...rest})=>{

    const {loged,loading,setloading,setloged,setUser} = useContext(context)
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
            <div>
            <Header/>
            <Component {...props}/>
            </div> 
            :
            <Redirect to='/'/>
        )} />
    )

} 

export default PrivateRoute