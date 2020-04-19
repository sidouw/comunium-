import React,{useContext} from 'react'
import cookies from 'js-cookie'
import { authanticate,logout} from '../utils/auth'
import context from '../context/context'


const DashboardPage = (props)=>{
    const {setloged} = useContext(context)
    const oncli = ()=>{
        authanticate(cookies.get('token')).then(()=>{
            console.log('authed')
        })
    }
    const onlogout = ()=>{
        logout(cookies.get('token'))
        setloged(false)
        props.history.push('/')
    }
    return (
        <div>
        <p>Dash</p>
        <button onClick={oncli}>test</button>
        <button onClick = {onlogout}>logout</button>
        </div>
    )
}
export default DashboardPage
