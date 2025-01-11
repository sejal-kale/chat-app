
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider.jsx";
import { Link } from "react-router-dom";

const Signup = () => {
    const [authUser, setAuthUser] = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password", "");
    const confirmPassword = watch("confirmPassword", "");

    const validatePasswordMatch = (value) => {
        return value === password || "Password and Confirm Password don't match";
    };

    const onSubmit = async (data) => {
        const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
        };

        try {
            const response = await axios.post("/api/user/signup", userInfo);
            if (response.data) {
                alert("Signup successful");
                localStorage.setItem("ChatApp", JSON.stringify(response.data));
                setAuthUser(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-900 text-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-96 px-8 py-6 space-y-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700"
            >
                <h1 className="text-blue-500 font-bold text-3xl text-center">Messenger</h1>
                <h2 className="text-lg text-center">
                    Create New <span className="text-blue-400 font-semibold">Account</span>
                </h2>

                {/* Email */}
                <label className="block">
                    <span className="text-sm font-semibold">Email</span>
                    <div className="relative mt-1">
                        <input
                            type="email"
                            className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your email"
                            {...register("email", { required: true })}
                        />
                    </div>
                    {errors.email && (
                        <span className="text-red-500 text-xs">This field is required</span>
                    )}
                </label>

                {/* Username */}
                <label className="block">
                    <span className="text-sm font-semibold">Username</span>
                    <div className="relative mt-1">
                        <input
                            type="text"
                            className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your username"
                            {...register("name", { required: true })}
                        />
                    </div>
                    {errors.name && (
                        <span className="text-red-500 text-xs">This field is required</span>
                    )}
                </label>

                {/* Password */}
                <label className="block">
                    <span className="text-sm font-semibold">Password</span>
                    <div className="relative mt-1">
                        <input
                            type="password"
                            className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your password"
                            {...register("password", { required: true })}
                        />
                    </div>
                    {errors.password && (
                        <span className="text-red-500 text-xs">This field is required</span>
                    )}
                </label>

                {/* Confirm Password */}
                <label className="block">
                    <span className="text-sm font-semibold">Confirm Password</span>
                    <div className="relative mt-1">
                        <input
                            type="password"
                            className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Confirm your password"
                            {...register("confirmPassword", {
                                required: true,
                                validate: validatePasswordMatch,
                            })}
                        />
                    </div>
                    {errors.confirmPassword && (
                        <span className="text-red-500 text-xs">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </label>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
                >
                    Signup
                </button>

                <p className="text-sm text-center">
                    Have an account?
                    <Link
                        to="/login"
                        className="text-blue-400 hover:text-blue-500 ml-1 underline"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
