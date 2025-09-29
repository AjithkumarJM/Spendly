import React from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-gray-500">Total Income</h2>
                    <p className="text-xl font-bold text-green-600">$5,000</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-gray-500">Total Expense</h2>
                    <p className="text-xl font-bold text-red-600">$3,200</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-gray-500">Balance</h2>
                    <p className="text-xl font-bold text-blue-600">$1,800</p>
                </div>
            </div>
        </motion.div>
    );
}
