import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function Transactions() {
    const { transactions, selectedMonth, selectedYear } = useSelector(state => state.transactions);

    const filtered = transactions.filter(tx => {
        const d = new Date(tx.date);
        return d.getMonth() + 1 === selectedMonth && d.getFullYear() === selectedYear;
    });

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-2xl font-semibold mb-4">Transactions</h1>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr className="text-gray-700 dark:text-gray-200">
                            <th className="p-3">Type</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(tx => (
                            <tr key={tx.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="p-3">{tx.type}</td>
                                <td className="p-3">{tx.category}</td>
                                <td className={`p-3 ${tx.type === "Expense" ? "text-red-600" : "text-green-600"}`}>
                                    ${tx.amount}
                                </td>
                                <td className="p-3">{tx.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
