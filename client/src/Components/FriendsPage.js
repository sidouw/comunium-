import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FriendsList from "./FriendsList";
import FriendsRequestsList from "./FriendsRequestsList";
import AddFriends from './AddFriends'
const FriendsPage = ()=>{
  
    return (
        <div className = 'Friends-content'>
        <Tabs className = 'Friends-tab'>
        <TabList className = 'Friends-tab__list'>
          <Tab className = 'Friends-tab__list__tab' selectedClassName ='Friends-tab__list__tab--selected'>Friends</Tab>
          <Tab className = 'Friends-tab__list__tab' selectedClassName ='Friends-tab__list__tab--selected'>Requests</Tab>
          <Tab className = 'Friends-tab__list__tab' selectedClassName ='Friends-tab__list__tab--selected'>Online</Tab>
          <Tab className = 'Friends-tab__list__tab' selectedClassName ='Friends-tab__list__tab--selected'>Add Friends</Tab>
    
        </TabList>
    
        <TabPanel className = 'Friends-tab__panel'>
            <FriendsList/>
        </TabPanel>

        <TabPanel className = 'Friends-tab__panel'>
        <FriendsRequestsList/>
        </TabPanel>

        <TabPanel className = 'Friends-tab__panel'>
        <p>not emplimeted yet :')</p>
        </TabPanel>
        <TabPanel className = 'Friends-tab__panel'>
        <AddFriends/>
        </TabPanel>
      </Tabs>
        </div>
    )
}

export default FriendsPage