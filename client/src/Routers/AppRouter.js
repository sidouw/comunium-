import React,{useState} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import context from '../context/context'
import LoginPage from '../Components/LoginPage'
import ProfilePage from '../Components/ProfilePage'
import DashboardPage from '../Components/DashboardPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import ChatPage from '../Components/ChatPage'


const App =() =>{
  
  const [loged,setloged] = useState(false)
  const [loading,setloading] = useState(true)
  const [user,setUser] = useState({contacts:[],username:'',email:'',state:'',_id:''})
  return(
    
  <context.Provider value = {{loged,setloged,user,setUser,loading,setloading}}>
  <BrowserRouter>
  <div>
  <Switch>
  <PublicRoute path ='/' component ={LoginPage} exact={true}/>
  <PrivateRoute path ='/dashboard' component ={DashboardPage}/>
  <PrivateRoute path ='/Chat/:id' component ={ChatPage}/> 
  <PrivateRoute path = '/profile/:id' component= {ProfilePage}/>
  <PrivateRoute path = '/profile' component= {ProfilePage}/>
  <Route  component= {()=><p>fuuukkk</p>}/>
  </Switch>
  </div>
  </BrowserRouter>
  </context.Provider>

)}

export default App;
