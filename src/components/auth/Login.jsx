import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Login() {
    const [user, setUser] = useState("");
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user || pin.length !== 4 || !/^[0-9]{4}$/.test(pin)) {
            setError("Enter valid username/email and 4-digit PIN");
            toast.error("Enter valid username/email and 4-digit PIN");
            return;
        }
        dispatch(login({ user, pin }));
        toast.success("Login successful! Welcome to Spendly.");
        navigate("/dashboard");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-400 px-2">
            <motion.form
                onSubmit={handleSubmit}
                className="bg-white/90 dark:bg-gray-900/90 p-6 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md flex flex-col items-center backdrop-blur-md border border-white/30"
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
                whileHover={{ boxShadow: "0 8px 32px 0 rgba(99,102,241,0.25)" }}
            >
                <div className="mb-6 flex flex-col items-center">
                    <div className="bg-gradient-to-tr from-blue-600 via-purple-500 to-pink-400 rounded-full p-4 mb-2 shadow-lg">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="12" fill="#fff" />
                            <path d="M7 17c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="9" cy="10" r="1.5" fill="#6366f1" />
                            <circle cx="15" cy="10" r="1.5" fill="#6366f1" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight drop-shadow">Spendly</h2>
                    <p className="text-purple-600 font-semibold mt-1 text-sm sm:text-base">Smart Personal Finance</p>
                </div>
                <div className="mb-4 w-full">
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Email or Username</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white bg-white/80 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
                        value={user}
                        onChange={e => setUser(e.target.value)}
                        required
                        placeholder="[REDACTED_EMAIL_ADDRESS_1]"
                    />
                </div>
                <div className="mb-4 w-full">
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">4-digit PIN</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border-2 border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-gray-800 dark:text-white tracking-widest text-xl text-center bg-white/80 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
                        value={pin}
                        onChange={e => setPin(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                        maxLength={4}
                        required
                        placeholder="••••"
                    />
                </div>
                {error && <div className="text-red-500 mb-2 text-sm w-full text-center">{error}</div>}
                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:scale-105 transition-transform mt-2 mb-2">Login</button>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">Demo: Any username, 4-digit PIN</div>
            </motion.form>
        </div>
    );
}