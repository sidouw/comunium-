import React,{useState} from 'react'


const LoginForm = ({OnSubmit})=>{
const [user,setUser] = useState('')
const [pass,setPass] = useState('')
const Submited = (e)=>{
    e.preventDefault()

    OnSubmit({user,pass})
}

    return (<div>
    <form  onSubmit = {Submited}>
    <input placeholder='Email' value={user} autoComplete='username' required onChange = {(e)=> setUser(e.target.value)}/>
    <input placeholder='Password' type='password' required autoComplete='current-password' value={pass} onChange = {(e)=> setPass(e.target.value)}/>
    <button>Login</button>
    </form>
    </div>)
}

export default LoginForm