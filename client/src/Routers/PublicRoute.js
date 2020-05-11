import React,{useContext,useEffect} from 'react'
import {Route,Redirect} from 'react-router-dom'
import context from '../context/context'
import {authanticate} from '../utils/auth'



const PublicRoute= ({component:Component,...rest})=>{

    const {loged,loading,setloading,setloged,setUser} = useContext(context)
    useEffect(()=>{
        authanticate().then((data)=>{
            if(data){
                if (data.error) {
                    setloged(false)
                    setloading(false)
                    return
                }else if (data._id){
                    setUser(data)
                    setloged(true)
                    setloading(false)
                }
            }else{
                setloged(false)
                setloading(false)
            }

        })
    },[])

    return(
        loading ? 
        <p>Loading ......</p>
        :
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

export default PublicRoute