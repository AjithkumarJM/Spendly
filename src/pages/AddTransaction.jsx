import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../features/transactionsSlice";

// Dummy category data for now (to be moved to Redux/DB later)
const categories = {
    Income: {
        Salary: ["Base Pay", "Bonus", "Commission"],
        Business: ["Sales", "Services", "Investments"],
        Freelance: ["Projects", "Consulting", "Others"],
        Gifts: ["Cash Gift", "Other Gifts"],
        Other: ["Miscellaneous"],
    },
    Expense: {
        Housing: ["Rent/Mortgage", "Utilities", "Internet & Phone", "Maintenance"],
        Transportation: ["Fuel", "Public Transit", "Ride-Hailing", "Parking", "Repairs"],
        "Food & Dining": ["Groceries", "Restaurants", "Coffee/Snacks"],
        Shopping: ["Clothing", "Electronics", "Household", "Personal Care"],
        "Health & Fitness": ["Medical", "Pharmacy", "Gym", "Insurance"],
        Entertainment: ["Subscriptions", "Movies", "Hobbies"],
        Education: ["Tuition", "Books", "Online Courses"],
        Travel: ["Flights", "Hotels", "Local Transport", "Food & Misc"],
        "Financial Obligations": ["Loan", "Credit Card", "Investments"],
        Miscellaneous: ["Donations", "Gifts", "Pets", "Other"],
    },
};

export default function AddTransaction({ onClose }) {
    const dispatch = useDispatch();

    // Default date + time
    const today = new Date();
    const defaultDate = today.toISOString().split("T")[0]; // YYYY-MM-DD
    const defaultTime = today.toTimeString().slice(0, 5); // HH:mm

    const [form, setForm] = useState({
        type: "Expense",
        category: "",
        subcategory: "",
        amount: "",
        date: defaultDate,
        time: defaultTime,
        note: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.category || !form.subcategory || !form.amount) return;

        dispatch(
            addTransaction({
                ...form,
                id: Date.now(),
                amount: Number(form.amount),
            })
        );

        // ✅ Close modal after successful save
        if (onClose) {
            onClose();
        }

        // Optional: reset form for next time
        setForm({
            type: "Expense",
            category: "",
            subcategory: "",
            amount: "",
            date: defaultDate,
            time: defaultTime,
            note: "",
        });
    };


    const availableCategories = Object.keys(categories[form.type] || {});
    const availableSubcategories = categories[form.type]?.[form.category] || [];

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Add Transaction</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Type */}
                <div>
                    <label className="block text-sm">Type</label>
                    <select
                        value={form.type}
                        onChange={(e) =>
                            setForm({ ...form, type: e.target.value, category: "", subcategory: "" })
                        }
                        className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    >
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm">Category</label>
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
                    <label className="block text-sm">Subcategory</label>
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
                    <label className="block text-sm">Amount</label>
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
                    <label className="block text-sm">Date</label>
                    <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    />
                </div>

                {/* Time */}
                <div>
                    <label className="block text-sm">Time</label>
                    <input
                        type="time"
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    />
                </div>

                {/* Note */}
                <div>
                    <label className="block text-sm">Note</label>
                    <textarea
                        value={form.note}
                        onChange={(e) => setForm({ ...form, note: e.target.value })}
                        rows={3}
                        placeholder="Optional note about this transaction..."
                        className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
