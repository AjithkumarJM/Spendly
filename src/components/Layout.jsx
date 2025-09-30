import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AddTransaction from "../pages/AddTransaction";
import Sidebar from "./layout/Sidebar";

export default function Layout({ children }) {
    const [darkMode, setDarkMode] = useState(
        () => JSON.parse(localStorage.getItem("darkMode")) || false
    );
    const [collapsed, setCollapsed] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    // Keyboard shortcut for Add Transaction ("A" key)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.key === "a" || e.key === "A") && !showModal) {
                setShowModal(true);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showModal]);

    return (
        <div className="flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />
            <main className={`flex-1 p-6 overflow-y-auto h-screen transition-all duration-300 ${collapsed ? "ml-20" : "ml-64"}`}>
                {children}
                {/* Floating Add Button with tooltip */}
                <div className="fixed bottom-6 right-6 group">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                        aria-label="Add Transaction (A)"
                    >
                        <Plus size={24} />
                    </button>
                    <span className="absolute right-16 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-opacity pointer-events-none">
                        Add Transaction (A)
                    </span>
                </div>
                {/* Add Transaction Modal */}
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
