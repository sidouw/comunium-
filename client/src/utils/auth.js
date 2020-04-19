
const url = 'http://127.0.1.1:5001'



export const authanticate = async(token)=>{
try {
    const data = await fetch(url+'/users/auth',{
        method : 'get',
        headers:{
           'Authorization':'Bearer '+token
        }
    })
    return await data.json()

} catch (error) {
    console.log(error)
}

}


export const  login = async(username,password)=>{

    try {
        const data= await fetch(url+'/users/login',{
            method : 'post',
            headers: {
                "Content-type": "application/json"
              },
            body:JSON.stringify({username,password})
        })
        return data.json()
    } catch (error) {
        console.log('something went wrong')
    }


}

export const  signup = async({username,password,email})=>{

    try {
        const data= await fetch(url+'/users/signup',{
            method : 'post',
            headers: {
                "Content-type": "application/json"
              },
            body:JSON.stringify({username,password,email})
        })
        return data.json()
    } catch (error) {
        console.log('something went wrong')
    }


}


export const  logout = async(token)=>{

    try {
        const data= await fetch(url+'/users/logout',{
            method : 'post',
            headers:{
                'Authorization':'Bearer '+token
             },
            body:''
        })
        return data.json()
    } catch (error) {
        console.log('something went wrong')
    }


}