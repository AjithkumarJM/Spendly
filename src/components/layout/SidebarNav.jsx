import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, Wallet, Settings } from "lucide-react";

const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <BarChart3 size={20} /> },
    { to: "/transactions", label: "Transactions", icon: <Wallet size={20} /> },
    { to: "/settings", label: "Settings", icon: <Settings size={20} /> },
];

export default function SidebarNav({ collapsed }) {
    const location = useLocation();
    return (
        <nav className="flex flex-row w-full justify-around md:flex-col md:w-full md:justify-start md:space-y-1">
            {navItems.map((item) => (
                <Link
                    key={item.to}
                    to={item.to}
                    className={`flex flex-col md:flex-row items-center justify-center md:justify-start px-2 py-1 md:px-4 md:py-2 rounded-md transition-colors ${location.pathname === item.to
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                >
                    {item.icon}
                    {!collapsed && (
                        <span className="mt-1 md:mt-0 md:ml-3 text-xs md:text-base">
                            {item.label}
                        </span>
                    )}
                </Link>
            ))}
        </nav>
    );
}
