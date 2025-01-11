import React, { useState } from 'react'
import { LuLogOut } from "react-icons/lu";
import axios from "axios";
import Cookies from "js-cookie";

const Logout = () => {
    const [loading, setLoading] = useState(false);
    const handleLogout = async () => {
        setLoading(true);
        try {
            const res = await axios.post("/api/user/logout");
            localStorage.removeItem("ChatApp");
            Cookies.remove("jwt");
            setLoading(false);
            alert("Logged out successfully");
            window.location.reload();
        } catch (error) {
            console.log("Error in Logout", error);
            alert("Error in logging out");
        }
    };
    return (
        <div className='w-[4%]  bg-slate-950 text-white flex flex-col justify-end'>

            <div className='p-3 align-bottom'>
                <form action=''>
                    <div className='flex space-x-3'>

                        <button><LuLogOut className='text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300'
                            onClick={handleLogout}
                        /></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Logout