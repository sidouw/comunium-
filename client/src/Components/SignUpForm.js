import React,{useState,useContext} from 'react'
import {signup} from '../utils/auth'
import context from '../context/context'
import cookies from 'js-cookie'


const SignUpForm = ({push})=>{


const [username,setusername] = useState('')
const [email,setEmail] = useState('')
const [password,setPass] = useState('')
const [error,seterror] = useState(false)
const {setUser} = useContext(context)
const Submited = (e)=>{
    e.preventDefault()
    signup({username,password,email}).then((data)=>{
        if (data.error) {
            seterror(true)
            return console.log('something went wrong',data.error)
        }
        setUser(data.user)
        cookies.set('token',data.token)
        push('/dashboard')
    })
}

    return (
    <div className='loginform'>
    <h2 className='loginform__title'>SignUp</h2>
    <form className='loginform__form' onSubmit = {Submited}>
        {error && <p>Email already in use</p>}
    <input className ='loginform__input' placeholder='User Name' required value={username} onChange = {(e)=> setusername(e.target.value)}/>
    <input className ='loginform__input' placeholder='Email' required value={email} onChange = {(e)=> setEmail(e.target.value)}/>
    <input className ='loginform__input' placeholder='Password' required type='password' value={password} onChange = {(e)=> setPass(e.target.value)}/>
    <button className ='loginform__btn'>SignUp</button>
    </form>
    </div>)
}

export default SignUpForm