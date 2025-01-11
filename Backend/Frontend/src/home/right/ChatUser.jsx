import React from 'react'
import useConversation from '../../stateManage/useConversation'
import { useSocketContext } from '../../context/SocketContext';


const ChatUser = () => {
    const { selectedConversation } = useConversation();
    console.log("selected :", selectedConversation)
    const { onlineUsers } = useSocketContext();
    const getOnlineUserStatus = (userId) => {
        return onlineUsers.includes(userId) ? "online" : "Offline";
    }
    return (
        <>
            <div className=' pl-5 pt-5 pb-5 h-[12vh] bg-gray-900 hover:bg-gray-600 duration-300 flex space-x-5'>
                <div>
                    <div className={`avatar ${getOnlineUserStatus(selectedConversation._id)}`}>
                        {/* <div className="avatar online"> */}
                        <div className="w-14 rounded-full">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>

                </div>

                <div>
                    <h1 className='text-xl'>{selectedConversation.name}</h1>
                    {/* <h1 className='text-xl'>dummy</h1> */}
                    <span className="text-sm"> {getOnlineUserStatus(selectedConversation._id)}</span>
                </div>
            </div>
        </>
    )
}

export default ChatUser