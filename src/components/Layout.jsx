import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BarChart3, PlusCircle, Wallet, Moon, Sun } from "lucide-react";

export default function Layout({ children }) {
    const [darkMode, setDarkMode] = useState(
        () => JSON.parse(localStorage.getItem("darkMode")) || false
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <nav className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
                <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    Spendly
                </Link>
                <div className="flex space-x-4 items-center">
                    <Link to="/dashboard" className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400">
                        <BarChart3 size={18} /> <span>Dashboard</span>
                    </Link>
                    <Link to="/transactions" className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400">
                        <Wallet size={18} /> <span>Transactions</span>
                    </Link>
                    <Link to="/add" className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400">
                        <PlusCircle size={18} /> <span>Add</span>
                    </Link>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>
            </nav>
            <main className="p-6 max-w-5xl mx-auto">{children}</main>
        </div>
    );
}
