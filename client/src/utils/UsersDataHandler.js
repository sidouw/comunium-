
const url = 'http://127.0.1.1:5001'


const getUser = async (id)=>{
    const data = await fetch(url+'/users/'+id)

    return data.json()
}

export {getUser}