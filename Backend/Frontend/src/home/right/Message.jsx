import React from 'react'
import Type from './Typesend'

const Message = ({ message }) => {
    const authUser = JSON.parse(localStorage.getItem('ChatApp'));
    const itsMe = authUser.user._id === message.senderId
    const chatName = itsMe ? "chat-end" : "chat-start"
    const chatColour = itsMe ? "bg-blue-400" : "";
    const createdAt = new Date(message.createdAt);
    console.log(message)
    const formattedTime = createdAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    return (
        <div>
            <div className='p-4'>
                <div className={`chat ${chatName}`}>
                    <div className={`chat-bubble text-white ${chatColour}`}>{message.message}</div>
                    <div>{formattedTime}</div>
                </div>

            </div>

        </div>
    )
}

export default Message