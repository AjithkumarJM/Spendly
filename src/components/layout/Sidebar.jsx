import React from "react";
import UserProfile from "./UserProfile";
import SidebarNav from "./SidebarNav";
import { Moon, Sun, Menu, ChevronLeft } from "lucide-react";

export default function Sidebar({ collapsed, setCollapsed, darkMode, setDarkMode }) {
    return (
        <aside
            className={`fixed top-0 left-0 h-full ${collapsed ? "w-20" : "w-64"} transition-all duration-300 bg-white dark:bg-gray-800 shadow-md flex flex-col z-40`}
        >
            {/* Logo + Collapse */}
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
            <UserProfile collapsed={collapsed} />
            <SidebarNav collapsed={collapsed} />
            <div className="p-4 border-t dark:border-gray-700 mt-auto">
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
    );
}
