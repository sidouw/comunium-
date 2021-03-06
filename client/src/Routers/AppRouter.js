import React,{useState} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import context from '../context/context'
import LoginPage from '../Components/LoginPage'
import ProfilePage from '../Components/ProfilePage'
// import DashboardPage from '../Components/DashboardPage'
import ChatPage from '../Components/ChatPage'
import FriendsPage from '../Components/FriendsPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

    //   <PrivateRoute path ='/dashboard' component ={DashboardPage}/>
    // 


const App =() =>{
  
  const [loged,setloged] = useState(false)
  const [user,setUser] = useState({contacts:[],username:'',email:'',state:'',_id:''})

  return(
  <context.Provider value = {{loged,setloged,user,setUser}}>
  <BrowserRouter>
  <>
  <Switch>
  <PublicRoute path ='/' component ={LoginPage} exact={true}/>
  <PrivateRoute path ='/Chat/:id' component ={ChatPage}/>
  <PrivateRoute path ='/Chat' component ={ChatPage}/>  
  <PrivateRoute path ='/friends' component ={FriendsPage}/> 
  <PrivateRoute path = '/profile/:id' component= {ProfilePage}/>
  <Route  component= {()=><h1>Page Not Found</h1>}/>
  </Switch>
  </>
  </BrowserRouter>
  </context.Provider>

)}

export default App;
