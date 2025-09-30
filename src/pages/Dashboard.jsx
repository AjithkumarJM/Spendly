import React from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { setMonth, setYear } from "../features/transactionsSlice";
import {
    IncomeExpensePie,
    YearlyBarChart,
    BalanceLineChart,
} from "../components/Charts";

export default function Dashboard() {
    const { transactions, selectedMonth, selectedYear } = useSelector(
        (state) => state.transactions
    );
    const { currency } = useSelector((state) => state.settings);
    const dispatch = useDispatch();

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Filter monthly transactions
    const monthlyData = transactions.filter((tx) => {
        const d = new Date(tx.date);
        return d.getMonth() + 1 === selectedMonth && d.getFullYear() === selectedYear;
    });

    const totalIncome = monthlyData
        .filter((t) => t.type === "Income")
        .reduce((a, b) => a + b.amount, 0);

    const totalExpense = monthlyData
        .filter((t) => t.type === "Expense")
        .reduce((a, b) => a + b.amount, 0);

    // Yearly aggregated data
    const yearlyData = months.map((m, idx) => {
        const monthTx = transactions.filter(
            (tx) =>
                new Date(tx.date).getMonth() === idx &&
                new Date(tx.date).getFullYear() === selectedYear
        );
        return {
            month: m.slice(0, 3),
            income: monthTx.filter((t) => t.type === "Income").reduce((a, b) => a + b.amount, 0),
            expense: monthTx.filter((t) => t.type === "Expense").reduce((a, b) => a + b.amount, 0),
        };
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mb-6"
        >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>

                {/* Year and Month Controls */}
                <div className="flex items-center space-x-4">
                    {/* Year nav */}
                    <button
                        onClick={() => dispatch(setYear(selectedYear - 1))}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <ChevronLeft />
                    </button>
                    <span className="font-semibold">{selectedYear}</span>
                    <button
                        onClick={() => dispatch(setYear(selectedYear + 1))}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <ChevronRight />
                    </button>

                    {/* Month select */}
                    <select
                        value={selectedMonth}
                        onChange={(e) => dispatch(setMonth(Number(e.target.value)))}
                        className="border rounded-lg p-2 dark:bg-gray-700 dark:text-gray-200"
                    >
                        {months.map((m, idx) => (
                            <option key={idx + 1} value={idx + 1}>
                                {m}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                    <h2 className="text-gray-500 dark:text-gray-400">Total Income</h2>
                    <p className="text-2xl font-bold text-emerald-600">
                        +{currency} {totalIncome}
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                    <h2 className="text-gray-500 dark:text-gray-400">Total Expense</h2>
                    <p className="text-2xl font-bold text-rose-600">
                        -{currency} {totalExpense}
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                    <h2 className="text-gray-500 dark:text-gray-400">Balance</h2>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {currency} {totalIncome - totalExpense}
                    </p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <IncomeExpensePie data={monthlyData} />
                <YearlyBarChart data={yearlyData} />
            </div>
            <BalanceLineChart data={yearlyData} />
        </motion.div>
    );
}
