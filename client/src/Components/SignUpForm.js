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

    return (<div>
    <h2>SignUp</h2>
    <form  onSubmit = {Submited}>
        {error && <p>Email already in use</p>}
    <input placeholder='User Name' required value={username} onChange = {(e)=> setusername(e.target.value)}/>
    <input placeholder='Email' required value={email} onChange = {(e)=> setEmail(e.target.value)}/>
    <input placeholder='Password' required type='password' value={password} onChange = {(e)=> setPass(e.target.value)}/>
    <button>SignUp</button>
    </form>
    </div>)
}

export default SignUpForm