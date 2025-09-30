import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../features/transactionsSlice";
import FormInput from "../components/common/FormInput";

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
                <FormInput
                    label="Type"
                    name="type"
                    as="select"
                    value={form.type}
                    onChange={e => setForm(f => ({ ...f, type: e.target.value, category: "", subcategory: "" }))}
                    options={["Expense", "Income"]}
                    required
                />
                <FormInput
                    label="Category"
                    name="category"
                    as="select"
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value, subcategory: "" }))}
                    options={availableCategories}
                    required
                />
                <FormInput
                    label="Subcategory"
                    name="subcategory"
                    as="select"
                    value={form.subcategory}
                    onChange={e => setForm(f => ({ ...f, subcategory: e.target.value }))}
                    options={availableSubcategories}
                    required
                    disabled={!form.category}
                />
                <FormInput
                    label="Amount"
                    name="amount"
                    type="number"
                    value={form.amount}
                    onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                    min="0"
                    step="0.01"
                    required
                />
                <FormInput
                    label="Date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                    required
                />
                <FormInput
                    label="Time"
                    name="time"
                    type="time"
                    value={form.time}
                    onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                    required
                />
                <FormInput
                    label="Note (optional)"
                    name="note"
                    as="textarea"
                    value={form.note}
                    onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                    placeholder="Add a note..."
                />
                <div className="flex justify-end space-x-2 pt-2">
                    <button
                        type="button"
                        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
