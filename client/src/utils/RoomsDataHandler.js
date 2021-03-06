
import cookie from 'js-cookie'
import url from './ServerURL'


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

const getLastRoomMessage = async (id)=>{
    try {
        const data = await fetch(url+'/messages/u/'+id,{
            headers:{
                'Authorization':'Bearer '+cookie.get('token')
             }
        })
        if (data) {
            return data.json()
        }
    } catch (error) {
        console.log(error)
    }

    
}

export {getUsersRoom,getRoomMessages,getLastRoomMessage}