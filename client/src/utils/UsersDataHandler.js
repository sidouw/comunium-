import cookie from 'js-cookie'
import url from './ServerURL'


const getUser = async (id)=>{
    const data = await fetch(url+'/users/'+id)

    return data.json()
}


const getUsers = async (id)=>{
    const data = await fetch(url+'/users')

    return data.json()
}

const getFriends = async (id)=>{
    const data = await fetch(url+'/users/f/'+id,{
        headers:{
            'Authorization':'Bearer '+cookie.get('token')
         }
    })

    return data.json()
}


const getFriendsRequests = async ()=>{
    const data = await fetch(url+'/users/f',{
        headers:{
            'Authorization':'Bearer '+cookie.get('token')
         }
    })

    return data.json()
}

const AddFriend = async (id)=>{
    const data = await fetch(url+'/users/f',{
        method:'POST',
        headers:{
            'Authorization':'Bearer '+cookie.get('token'),
            "Content-type": "application/json"
        },
         body:JSON.stringify({id})
    })

    return data.json()
}
const HandleRequest = async (id,type)=>{
    const data = await fetch(url+'/users/f/'+id,{
        method:'POST',
        headers:{
            'Authorization':'Bearer '+cookie.get('token'),
            "Content-type": "application/json"
        },
         body:JSON.stringify({type})
    })

    return data.json()
}

const DeleteFriend =async (id)=>{
    const data = await fetch(url+'/users/f/'+id,{
        method:'DELETE',
        headers:{
            'Authorization':'Bearer '+cookie.get('token'),
            "Content-type": "application/json"
        }
    })

    return data.json()
}
export {getUser,getUsers,getFriends,getFriendsRequests,AddFriend,HandleRequest,DeleteFriend}