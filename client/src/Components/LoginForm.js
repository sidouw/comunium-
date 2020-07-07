import React,{useState,useContext} from 'react'
import cookies from 'js-cookie'
import context from '../context/context'
import {login} from '../utils/auth'


const LoginForm = ({push})=>{

const [user,setUsernaem] = useState('')
const [error,seterror] = useState(false)
const [pass,setPass] = useState('')
const {setUser} = useContext(context)

const Submited = (e)=>{
    e.preventDefault()

    login(e.target.elements[0].value,e.target.elements[1].value)
    .then((data)=>{
        if (data.error) {
            seterror(true)
        }else{
            seterror(false)
            setUser(data.user)
            cookies.set('token',data.token)
            push('/dashboard')
        }
 
    })

    
}

    return (
        
    <div className='loginform'>
    <h2 className='loginform__title'>Login</h2>
    <form className='loginform__form'  onSubmit = {Submited}>
        {error && <p>Wrong Username or Password</p>}
    <input className ='loginform__input' placeholder='Email' value={user} autoComplete='username' required onChange = {(e)=> setUsernaem(e.target.value)}/>
    <input className ='loginform__input' placeholder='Password' type='password' required autoComplete='current-password' value={pass} onChange = {(e)=> setPass(e.target.value)}/>
    <button className ='loginform__btn'>Login</button>
    </form>
    </div>)
}

export default LoginForm