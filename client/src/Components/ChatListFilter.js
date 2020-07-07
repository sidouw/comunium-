import React from 'react'

const ChatListFilter = ({setchatFilter,chatFilter})=>{

    
    const onFilterChange = e=>{
        setchatFilter(e.target.value)
    }
    return (
        <>
        <input value = {chatFilter} onChange = {onFilterChange}  />
        </>
    )
}

export default ChatListFilter