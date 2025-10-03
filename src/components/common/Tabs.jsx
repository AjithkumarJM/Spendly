import React from "react";

export default function Tabs({ tabs, activeTab, onTabChange }) {
    return (
        <div className="flex space-x-3 mb-4 justify-center">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                        }`}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
        </div>
    );
}
