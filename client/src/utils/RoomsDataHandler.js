
import cookie from 'js-cookie'
const url = 'http://127.0.1.1:5001'


const getUsersRoom = async (id)=>{
    const data = await fetch(url+'/rooms/u/'+id,{
        headers:{
            'Authorization':'Bearer '+cookie.get('token')
         }
    })

    return data.json()
}

const getRoomMessages = async (id)=>{
    const data = await fetch(url+'/messages/r/'+id,{
        headers:{
            'Authorization':'Bearer '+cookie.get('token')
         }
    })

    return data.json()
}
export {getUsersRoom,getRoomMessages}