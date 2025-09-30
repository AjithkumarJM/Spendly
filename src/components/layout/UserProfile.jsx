import React from "react";
import { User } from "lucide-react";

export default function UserProfile({ collapsed }) {
    return (
        <div className="flex items-center space-x-3 p-4 border-b dark:border-gray-700">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2">
                <User size={28} className="text-blue-600 dark:text-blue-400" />
            </div>
            {!collapsed && (
                <div>
                    <div className="font-semibold">Ajithkumar J M</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">ajithkumarjm@gmail.com</div>
                </div>
            )}
        </div>
    );
}
