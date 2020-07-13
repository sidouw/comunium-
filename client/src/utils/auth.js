
import cookies from 'js-cookie'
import url from './ServerURL'



export const authanticate = async()=>{
try {
    const data = await fetch(url+'/users/auth',{
        method : 'get',
        headers:{
           'Authorization':'Bearer '+cookies.get('token')
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


export const  logout = async()=>{

    try {
        const data= await fetch(url+'/users/logout',{
            method : 'post',
            headers:{
                'Authorization':'Bearer '+cookies.get('token')
             },
            body:''
        })
        return data.json()
    } catch (error) {
        console.log('something went wrong')
    }


}