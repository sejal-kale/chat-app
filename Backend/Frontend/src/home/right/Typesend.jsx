import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../context/useSendMessage';
import { set } from 'react-hook-form';


const Type = () => {
    const { loading, sendMessages } = useSendMessage();
    const [message, setMessage] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        await sendMessages(message);
        setMessage("")

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='flex space-x-4 h-[8vh] text-center bg-gray-900'>
                    <div className='w-[90%]'>
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            type="text" placeholder="Type here"
                            className=" py-3 px-3 mt-1 mx-4  border-[1px] rounded-xl border-gray-700 flex items-center w-full  grow outline-none bg-slate-900" />
                    </div>
                    <button className='text-3xl p-4'>
                        <IoSend />
                    </button>
                </div>
            </form>
        </>
    )
}

export default Type