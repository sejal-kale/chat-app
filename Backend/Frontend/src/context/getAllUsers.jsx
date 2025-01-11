import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

const getAllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                const token = Cookies.get("jwt");
                const response = await axios.get("/api/user/getUserProfile", {
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAllUsers(response.data.filteredUser);
                setLoading(false);
                // console.log("response :", response.data.filteredUser)
            } catch (error) {
                alert("Error : ", error)
                console.log("Error in GetAllUsers: " + error);
            }
        };
        getUsers();
    }, []);
    return [allUsers, loading];
}

export default getAllUsers