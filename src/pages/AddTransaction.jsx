import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addTransaction } from "../features/transactionsSlice";

const categories = {
    Income: {
        "Salary": ["Base Pay", "Bonus", "Commission"],
        "Business": ["Sales", "Services", "Investments"],
        "Freelance": ["Projects", "Consulting", "Others"],
        "Gifts": ["Cash Gift", "Other Gifts"],
        "Other": ["Miscellaneous"],
    },
    Expense: {
        "Housing": ["Rent/Mortgage", "Utilities", "Internet & Phone", "Maintenance"],
        "Transportation": ["Fuel", "Public Transit", "Ride-Hailing", "Parking", "Repairs"],
        "Food & Dining": ["Groceries", "Restaurants", "Coffee/Snacks"],
        "Shopping": ["Clothing", "Electronics", "Household", "Personal Care"],
        "Health & Fitness": ["Medical", "Pharmacy", "Gym", "Insurance"],
        "Entertainment": ["Subscriptions", "Movies", "Hobbies"],
        "Education": ["Tuition", "Books", "Online Courses"],
        "Travel": ["Flights", "Hotels", "Local Transport", "Food & Misc"],
        "Financial Obligations": ["Loan", "Credit Card", "Investments"],
        "Miscellaneous": ["Donations", "Gifts", "Pets", "Other"],
    },
};

export default function AddTransaction() {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        type: "Expense",
        category: "",
        subcategory: "",
        amount: "",
        date: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.category || !form.subcategory || !form.amount || !form.date) return;

        dispatch(addTransaction({ ...form, id: Date.now(), amount: Number(form.amount) }));
        setForm({ type: "Expense", category: "", subcategory: "", amount: "", date: "" });
    };

    const availableCategories = Object.keys(categories[form.type] || {});
    const availableSubcategories = categories[form.type]?.[form.category] || [];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Add Transaction</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md space-y-4"
            >
                {/* Type */}
                <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400">Type</label>
                    <select
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value, category: "", subcategory: "" })}
                        className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    >
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400">Category</label>
                    <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value, subcategory: "" })}
                        className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    >
                        <option value="">Select Category</option>
                        {availableCategories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Subcategory */}
                <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400">Subcategory</label>
                    <select
                        value={form.subcategory}
                        onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                        disabled={!form.category}
                        className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:opacity-50"
                    >
                        <option value="">Select Subcategory</option>
                        {availableSubcategories.map((sub) => (
                            <option key={sub} value={sub}>
                                {sub}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Amount */}
                <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400">Amount</label>
                    <input
                        type="number"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        placeholder="e.g. 100"
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400">Date</label>
                    <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Save Transaction
                </button>
            </form>
        </motion.div>
    );
}
