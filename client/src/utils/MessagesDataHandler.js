import cookie from 'js-cookie'
import url from './ServerURL'

const getLastRoomMessage = async (id)=>{
    const data = await fetch(url+'/messages/u/'+id,{
        headers:{
            'Authorization':'Bearer '+cookie.get('token')
         }
    })

    return data.json()
}
const setMessageSeen = async (id)=>{
    const data = await fetch(url+'/messages/seen/'+id,{
        headers:{
            'Authorization':'Bearer '+cookie.get('token')
         }
    })

    return data.json()
}
export {setMessageSeen}