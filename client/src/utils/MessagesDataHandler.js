import cookie from 'js-cookie'
const url = 'http://127.0.1.1:5001'

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