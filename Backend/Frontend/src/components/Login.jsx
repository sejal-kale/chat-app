
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
    const [authUser, setAuthUser] = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const userInfo = {
            email: data.email,
            password: data.password,
        };

        axios
            .post("/api/user/login", userInfo)
            .then((response) => {
                if (response.data) {
                    alert("Login successful");
                }
                localStorage.setItem("ChatApp", JSON.stringify(response.data));
                setAuthUser(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    alert("Error: " + error.response);
                }
            });
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-900 text-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border border-gray-700 bg-gray-800 rounded-lg shadow-lg p-8 w-96 space-y-6"
            >
                <h1 className="text-3xl text-blue-500 font-extrabold text-center">
                    Messenger
                </h1>
                <h2 className="text-lg text-center">
                    Login with your{" "}
                    <span className="text-blue-400 font-semibold">Account</span>
                </h2>

                {/* Email */}
                <label className="flex flex-col space-y-2">
                    <span className="text-sm font-semibold">Email</span>
                    <div className="relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input
                            type="text"
                            className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg text-sm text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your email"
                            {...register("email", { required: true })}
                        />
                    </div>
                    {errors.email && (
                        <span className="text-red-500 text-xs">
                            This field is required
                        </span>
                    )}
                </label>

                {/* Password */}
                <label className="flex flex-col space-y-2">
                    <span className="text-sm font-semibold">Password</span>
                    <div className="relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <input
                            type="password"
                            className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg text-sm text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your password"
                            {...register("password", { required: true })}
                        />
                    </div>
                    {errors.password && (
                        <span className="text-red-500 text-xs">
                            This field is required
                        </span>
                    )}
                </label>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition duration-300"
                >
                    Login
                </button>

                <p className="text-sm text-center">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-400 hover:underline transition"
                    >
                        Signup
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
