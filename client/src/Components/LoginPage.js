import React,{useContext,useEffect} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {authanticate} from '../utils/auth'
import cookies from 'js-cookie'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import context from '../context/context'
import 'react-tabs/style/react-tabs.css';


const LoginPage = (props)=>{
  const  {setloged}=  useContext(context)
  useEffect(()=>{
    const token = cookies.get('token')
    if(token){
      authanticate(token).then((data)=>{
        if (!data.error) {
          setloged(true)
        }
      })
    }
  },[])
    return (
    <div>
    <Tabs>
    <TabList>
      <Tab>Login</Tab>
      <Tab>SignUp</Tab>

    </TabList>

    <TabPanel>
        <LoginForm push = {props.history.push} />
    </TabPanel>
    <TabPanel>
      <SignUpForm push = {props.history.push} />
    </TabPanel>
  </Tabs>
    </div>
)}


export default LoginPage