import React from "react";
import { motion } from "framer-motion";

export default function AddTransaction() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Add Transaction</h1>
            <form className="bg-white p-6 rounded-2xl shadow-md space-y-4">
                <div>
                    <label className="block text-sm text-gray-600">Type</label>
                    <select className="w-full border rounded-lg p-2">
                        <option>Income</option>
                        <option>Expense</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm text-gray-600">Category</label>
                    <input type="text" className="w-full border rounded-lg p-2" placeholder="e.g. Food" />
                </div>
                <div>
                    <label className="block text-sm text-gray-600">Amount</label>
                    <input type="number" className="w-full border rounded-lg p-2" placeholder="e.g. 100" />
                </div>
                <div>
                    <label className="block text-sm text-gray-600">Date</label>
                    <input type="date" className="w-full border rounded-lg p-2" />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Save
                </button>
            </form>
        </motion.div>
    );
}
