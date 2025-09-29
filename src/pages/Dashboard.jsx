import React from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setMonth, setYear, setViewMode } from "../features/transactionsSlice";
import { IncomeExpensePie, YearlyBarChart } from "../components/Charts";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { transactions, selectedMonth, selectedYear, viewMode } = useSelector(state => state.transactions);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const monthlyData = transactions.filter(tx => {
        const d = new Date(tx.date);
        return d.getMonth() + 1 === selectedMonth && d.getFullYear() === selectedYear;
    });

    const yearlyData = months.map((m, idx) => {
        const monthTx = transactions.filter(tx => new Date(tx.date).getMonth() === idx && new Date(tx.date).getFullYear() === selectedYear);
        return {
            month: m,
            income: monthTx.filter(t => t.type === "Income").reduce((a, b) => a + b.amount, 0),
            expense: monthTx.filter(t => t.type === "Expense").reduce((a, b) => a + b.amount, 0),
        };
    });

    const totalIncome = monthlyData.filter(t => t.type === "Income").reduce((a, b) => a + b.amount, 0);
    const totalExpense = monthlyData.filter(t => t.type === "Expense").reduce((a, b) => a + b.amount, 0);

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>

            {/* Filters */}
            <div className="flex space-x-4 items-center">
                <select
                    value={selectedMonth}
                    onChange={e => dispatch(setMonth(Number(e.target.value)))}
                    className="border p-2 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                >
                    {months.map((m, idx) => (
                        <option key={idx} value={idx + 1}>{m}</option>
                    ))}
                </select>

                <input
                    type="number"
                    value={selectedYear}
                    onChange={e => dispatch(setYear(Number(e.target.value)))}
                    className="border p-2 rounded w-24 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />

                <select
                    value={viewMode}
                    onChange={e => dispatch(setViewMode(e.target.value))}
                    className="border p-2 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                >
                    <option value="monthly">Monthly View</option>
                    <option value="yearly">Yearly View</option>
                </select>
            </div>

            {/* Stats or Yearly Chart */}
            {viewMode === "monthly" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                        <h2 className="text-gray-500 dark:text-gray-400">Total Income</h2>
                        <p className="text-xl font-bold text-green-600">${totalIncome}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                        <h2 className="text-gray-500 dark:text-gray-400">Total Expense</h2>
                        <p className="text-xl font-bold text-red-600">${totalExpense}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                        <h2 className="text-gray-500 dark:text-gray-400">Balance</h2>
                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">${totalIncome - totalExpense}</p>
                    </div>
                </div>
            ) : (
                <YearlyBarChart data={yearlyData} />
            )}

            {viewMode === "monthly" && <IncomeExpensePie data={monthlyData} />}
        </motion.div>
    );
}
