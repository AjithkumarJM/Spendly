import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../features/settingsSlice";
import CategorySettings from "./CategorySettings";

export default function Settings() {
    const dispatch = useDispatch();
    const { currency } = useSelector((state) => state.settings);

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold">Settings</h1>

            {/* Currency Settings */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
                <h2 className="text-lg font-semibold mb-2">Currency</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Choose the default currency for displaying income and expenses.
                </p>
                <select
                    value={currency}
                    onChange={(e) => dispatch(setCurrency(e.target.value))}
                    className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200"
                >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="JPY">JPY (¥)</option>
                </select>
            </div>

            {/* Category Settings */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
                <h2 className="text-lg font-semibold mb-2">Categories & Subcategories</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Manage your income and expense categories. You can add, edit, or remove categories and their subcategories.
                </p>
                <CategorySettings />
            </div>
        </div>
    );
}
