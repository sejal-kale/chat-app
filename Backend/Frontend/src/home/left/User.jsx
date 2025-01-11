import React from 'react'
import useConversation from '../../stateManage/useConversation'
import { useSocketContext } from '../../context/SocketContext';

const User = ({ user }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === user._id
    const { socket, onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(user._id)

    return (
        <div className={`hover:bg-slate-600 duration-300 ${isSelected ? "bg-slate-700" : ""}`}
            onClick={() => setSelectedConversation(user)} >
            <div className='flex space-x-4 px-8
        
        
         py-7 hover:bg-slate-600 cursor-pointer duration-300'>
                <div className={`avatar ${isOnline ? "online" :"Offline"}`}>
                    <div className="w-16 rounded-full">
                        <img src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" />
                    </div>
                </div>
                <div>
                    <h1 className="text-lg font-bold">{user.name}</h1>
                    <span>{user.email}</span>
                </div>
            </div>
        </div>
    )
}

export default User