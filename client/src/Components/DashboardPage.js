import React,{useContext} from 'react'
import { authanticate,logout} from '../utils/auth'
import context from '../context/context'


const DashboardPage = (props)=>{
    const {setloged} = useContext(context)
    const oncli = ()=>{
        authanticate().then((data)=>{
            console.log('authed',data)
        })
    }
    const onlogout = ()=>{
        logout()
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
