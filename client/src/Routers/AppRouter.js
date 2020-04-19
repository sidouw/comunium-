import React,{useState} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import context from '../context/context'
import LoginPage from '../Components/LoginPage'
import ProfilePage from '../Components/ProfilePage'
import DashboardPage from '../Components/DashboardPage'
import Header from '../Components/Header'


const App =() =>{
  
  const [loged,setloged] = useState(false)
  const [user,setUser] = useState({contacts:[],username:'',email:'',state:''})
  return(
  <context.Provider value = {{loged,setloged,user,setUser}}>
  <BrowserRouter>
  <div>
  <Header/>
  <Switch>
  <Route path ='/' component ={LoginPage} exact={true}/>
  <Route path ='/dashboard' component ={DashboardPage}/>
  <Route path ='/Help' component ={()=>(<p>Fuuuucckkkk</p>)}/>
  <Route path = '/profile/:id' component= {ProfilePage}/>
  <Route  component= {()=><p>fuuukkk</p>}/>
  </Switch>
  </div>
  </BrowserRouter>
  </context.Provider>

)}

export default App;
