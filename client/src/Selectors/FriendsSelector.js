
const selectFriends = (friends,filter)=>{
    return friends.filter((friend)=>{
        if (friend.user.username) {
            return friend.user.username.toLowerCase().includes(filter.toLowerCase())
        }
        return false
    }).sort((a,b)=>{
        return a.message.icat < b.message.icat ? 1 :-1
})
}


export default selectFriends