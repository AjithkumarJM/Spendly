import React from "react";
import { motion } from "framer-motion";

export default function Transactions() {
    const sampleData = [
        { id: 1, type: "Expense", category: "Food", amount: 50, date: "2025-09-01" },
        { id: 2, type: "Income", category: "Salary", amount: 3000, date: "2025-09-05" },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-2xl font-semibold mb-4">Transactions</h1>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Type</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleData.map((tx) => (
                            <tr key={tx.id} className="border-t hover:bg-gray-50">
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
