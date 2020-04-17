import React,{useContext} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Redirect} from 'react-router-dom'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import context from '../context/context'
import 'react-tabs/style/react-tabs.css';


const LoginPage = (props)=>{
  const  {loged}=  useContext(context)
    const OnSubmit = (user,pass)=>{
        console.log(user,pass);   
        props.history.push('/help')
    }

    return (
      loged?
      <Redirect to = '/dashboard'/>
      :
    <div>
    <Tabs>
    <TabList>
      <Tab>Login</Tab>
      <Tab>SignUp</Tab>

    </TabList>

    <TabPanel>
      <h2>Login</h2>
        <LoginForm OnSubmit={OnSubmit}/>
    </TabPanel>
    <TabPanel>
      <h2>SignUp Page</h2>
      <SignUpForm OnSubmit={OnSubmit}/>
    </TabPanel>
  </Tabs>
    </div>
)}


export default LoginPage