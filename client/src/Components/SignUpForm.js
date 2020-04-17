import React,{useState} from 'react'


const SignUpForm = ({OnSubmit})=>{
const [user,setUser] = useState('')
const [email,setEmail] = useState('')
const [pass,setPass] = useState('')
const Submited = (e)=>{
    e.preventDefault()
    OnSubmit({user,pass})
}

    return (<div>
    <form  onSubmit = {Submited}>
    <input placeholder='User Name' required value={user} onChange = {(e)=> setUser(e.target.value)}/>
    <input placeholder='Email' required value={email} onChange = {(e)=> setEmail(e.target.value)}/>
    <input placeholder='Password' required type='password' value={pass} onChange = {(e)=> setPass(e.target.value)}/>
    <button>SignUp</button>
    </form>
    </div>)
}

export default SignUpForm