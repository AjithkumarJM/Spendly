import React from "react";
import UserProfile from "./UserProfile";
import SidebarNav from "./SidebarNav";
import { Moon, Sun, Menu, ChevronLeft } from "lucide-react";
import { useSelector } from "react-redux";

export default function Sidebar({ collapsed, setCollapsed, darkMode, setDarkMode }) {
    const user = useSelector(state => state.auth?.user);

    return (
        <aside
            className={`
                fixed flex md:flex-col fixed bottom-0 left-0 w-full h-16 md:top-0 md:left-0 md:h-full md:min-h-screen
                ${collapsed ? "md:w-20" : "md:w-64"}
                transition-all duration-300 bg-white dark:bg-gray-800 shadow-md z-40 md:z-auto md:shadow-none md:border-r dark:md:border-gray-700
                overflow-x-auto md:overflow-y-auto
            `}
        >
            {/* Logo + Collapse (show only on md+) */}
            <div className="hidden md:flex items-center justify-between p-4 border-b dark:border-gray-700">
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
            {/* User Profile and Dark Mode Toggle for mobile */}
            <div className="flex md:hidden items-center justify-between w-90% px-4 py-2 border-t border-b dark:border-gray-700 bg-white dark:bg-gray-800">
                <UserProfile collapsed={true} />
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ml-2"
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
            {/* User Profile (show only on md+) */}
            <div className="hidden md:block">
                <UserProfile collapsed={collapsed} />
            </div>
            {/* Nav Links: horizontal on mobile, vertical on desktop */}
            <nav className="flex-1 flex flex-row md:flex-col items-center justify-center md:justify-start w-full">
                <SidebarNav collapsed={collapsed} isMobile={true} />
            </nav>
            {/* Dark Mode Toggle (show only on md+) */}
            <div className="hidden md:block p-4 border-t dark:border-gray-700 mt-auto">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-4 flex items-center w-full p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
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
