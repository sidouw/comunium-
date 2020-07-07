import React from 'react'
import {AddFriend} from '../utils/UsersDataHandler'

const AddFriends = ()=>{
    const [FName,setFName]= React.useState('')
    const [rerror,seterror]= React.useState('')
    const [Buttondisabled,setButtondisabled]= React.useState(false)
    const handleAdd = ()=>{
        setButtondisabled(true)
        if(FName.trim() !==''){
            AddFriend(FName).then(({error})=>{
                seterror(error)
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
        <input placeholder = "Friend Name" value = {FName} onChange = {valueChanged}/>
        <button onClick = {handleAdd} disabled = {Buttondisabled}>Add</button>
        </>
    )
}


export default AddFriends