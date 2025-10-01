import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../features/settingsSlice";
import CategorySettings from "./CategorySettings";

export default function Settings() {
    const dispatch = useDispatch();
    const { currency } = useSelector((state) => state.settings);

    // Example initial values, replace with real user data as needed
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [pin, setPin] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName || !lastName || pin.length !== 4 || !/^[0-9]{4}$/.test(pin)) {
            setMessage("Please enter valid first name, last name, and 4-digit PIN.");
            return;
        }
        // TODO: Save updated user info
        setMessage("Profile updated successfully.");
    };

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
                    <option value="$">USD ($)</option>
                    <option value="€">EUR (€)</option>
                    <option value="£">GBP (£)</option>
                    <option value="₹">INR (₹)</option>
                    <option value="¥">JPY (¥)</option>
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

            {/* Update Profile */}
            <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Update Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">First Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Last Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">4-digit PIN</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                            value={pin}
                            onChange={e => setPin(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                            maxLength={4}
                            required
                        />
                    </div>
                    {message && <div className="mb-2 text-blue-600 dark:text-blue-300">{message}</div>}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold">Update</button>
                </form>
            </div>
        </div>
    );
}
