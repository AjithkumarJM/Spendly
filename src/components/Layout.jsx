import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    BarChart3,
    Wallet,
    Settings,
    Moon,
    Sun,
    Menu,
    ChevronLeft,
    Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AddTransaction from "../pages/AddTransaction";

export default function Layout({ children }) {
    const [darkMode, setDarkMode] = useState(
        () => JSON.parse(localStorage.getItem("darkMode")) || false
    );
    const [collapsed, setCollapsed] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    const navItems = [
        { to: "/dashboard", label: "Dashboard", icon: <BarChart3 size={20} /> },
        { to: "/transactions", label: "Transactions", icon: <Wallet size={20} /> },
        { to: "/settings", label: "Settings", icon: <Settings size={20} /> },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Sidebar */}
            <aside
                className={`${collapsed ? "w-20" : "w-64"
                    } transition-all duration-300 bg-white dark:bg-gray-800 shadow-md flex flex-col`}
            >
                {/* Logo + Collapse button */}
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                    {!collapsed && (
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            Spendly
                        </span>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 mt-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`flex items-center px-4 py-2 rounded-md transition-colors ${location.pathname === item.to
                                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                        >
                            {item.icon}
                            {!collapsed && <span className="ml-3">{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                {/* Dark Mode Toggle */}
                <div className="p-4 border-t dark:border-gray-700">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="flex items-center w-full p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        {!collapsed && (
                            <span className="ml-2">
                                {darkMode ? "Light Mode" : "Dark Mode"}
                            </span>
                        )}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto relative">
                {children}

                {/* Floating Add Button */}
                <button
                    onClick={() => setShowModal(true)}
                    className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={24} />
                </button>

                {/* Modal */}
                <AnimatePresence>
                    {showModal && (
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg p-6 relative"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                >
                                    ✕
                                </button>
                                <AddTransaction onClose={() => setShowModal(false)} />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
