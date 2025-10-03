import React from "react";
import { useSelector } from "react-redux";

export default function UserProfile({ collapsed }) {
    const user = useSelector(state => state.auth?.user);

    return (
        <div className="flex items-center space-x-3 p-4 border-b dark:border-gray-700">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-purple-500 to-pink-400 flex items-center justify-center text-white text-1xl font-bold">
                    {user?.firstName ? user.firstName[0] : "U"}
                </div>
            </div>
            {!collapsed && (
                <div>
                    <div className="font-semibold">
                        {user?.firstName || user?.lastName ? `${user?.firstName} ${user?.lastName}`.trim() : "User"}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email || "ajithkumarjm@gmail.com"}
                    </div>
                </div>
            )}
        </div>
    );
}
