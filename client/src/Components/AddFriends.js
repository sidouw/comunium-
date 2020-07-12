import React from 'react'
import {AddFriend} from '../utils/UsersDataHandler'

const AddFriends = ()=>{
    const [FName,setFName]= React.useState('')
    const [rerror,seterror]= React.useState('')
    const [Buttondisabled,setButtondisabled]= React.useState(false)
    const handleAdd = (e)=>{
        e.preventDefault()
        setButtondisabled(true)
        if(FName.trim() !==''){
            AddFriend(FName).then(({error})=>{
                if(error){
                    seterror(error)
                }else{
                    seterror('Request Sent')
                }
                setFName('')
                setButtondisabled(false)
            })
        }

    }
    const valueChanged =e=>{
       setFName(e.target.value)
    }
    return (
        <>
        <h2>Add Friends</h2>
        {
            !!rerror && <p>{rerror}</p>
        }
        <form className='friendadd-form' onSubmit = {handleAdd}>
        <input placeholder = "Friend Name" value = {FName} onChange = {valueChanged}/>
        <button disabled = {Buttondisabled}>Add</button>
        </form>
        </>
    )
}


export default AddFriends