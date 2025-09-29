import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { setMonth, setYear } from "../features/transactionsSlice";

// Utility: group by date
const groupByDate = (transactions) => {
    return transactions.reduce((acc, tx) => {
        const date = new Date(tx.date).toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
        if (!acc[date]) acc[date] = [];
        acc[date].push(tx);
        return acc;
    }, {});
};

// Utility: group by month
const groupByMonth = (transactions) => {
    return transactions.reduce((acc, tx) => {
        const date = new Date(tx.date);
        const key = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(tx);
        return acc;
    }, {});
};

export default function Transactions() {
    const { transactions, selectedMonth, selectedYear } = useSelector(
        (state) => state.transactions
    );
    const dispatch = useDispatch();
    const [view, setView] = useState("daily"); // daily | calendar | monthly | total

    // --- Month navigation handlers ---
    const handlePrevMonth = () => {
        if (selectedMonth === 1) {
            dispatch(setMonth(12));
            dispatch(setYear(selectedYear - 1));
        } else {
            dispatch(setMonth(selectedMonth - 1));
        }
    };

    const handleNextMonth = () => {
        if (selectedMonth === 12) {
            dispatch(setMonth(1));
            dispatch(setYear(selectedYear + 1));
        } else {
            dispatch(setMonth(selectedMonth + 1));
        }
    };

    const monthLabel = new Date(selectedYear, selectedMonth - 1).toLocaleString("default", {
        month: "long",
        year: "numeric",
    });

    // Filtered data
    const filtered = transactions.filter((tx) => {
        const d = new Date(tx.date);
        return d.getMonth() + 1 === selectedMonth && d.getFullYear() === selectedYear;
    });

    const groupedByDay = groupByDate(filtered);
    const groupedByMonth = groupByMonth(transactions); // yearly aggregation

    const totalIncome = filtered.filter((t) => t.type === "Income").reduce((a, b) => a + b.amount, 0);
    const totalExpense = filtered.filter((t) => t.type === "Expense").reduce((a, b) => a + b.amount, 0);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h1 className="text-2xl font-semibold mb-4">Transactions</h1>

            {/* Tabs + Month Navigation */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                {/* Tabs */}
                <div className="flex space-x-3">
                    {["daily", "calendar", "monthly", "total"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setView(tab)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${view === tab
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Month Navigation */}
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handlePrevMonth}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        aria-label="Previous Month"
                    >
                        <ChevronLeft />
                    </button>
                    <span className="font-medium">{monthLabel}</span>
                    <button
                        onClick={handleNextMonth}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        aria-label="Next Month"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>

            {/* === DAILY VIEW === */}
            {view === "daily" && (
                <div className="space-y-6">
                    {Object.keys(groupedByDay).length === 0 && (
                        <p className="text-gray-500 dark:text-gray-400">No transactions found.</p>
                    )}
                    {Object.entries(groupedByDay).map(([date, txs]) => {
                        const dayIncome = txs.filter((t) => t.type === "Income").reduce((a, b) => a + b.amount, 0);
                        const dayExpense = txs.filter((t) => t.type === "Expense").reduce((a, b) => a + b.amount, 0);

                        return (
                            <div key={date} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4">
                                <div className="flex justify-between items-center border-b pb-2 mb-3 dark:border-gray-700">
                                    <h2 className="text-lg font-semibold">{date}</h2>
                                    <div className="flex space-x-4 text-sm">
                                        <span className="text-green-600">+${dayIncome}</span>
                                        <span className="text-red-600">-${dayExpense}</span>
                                    </div>
                                </div>
                                <ul className="space-y-2">
                                    {txs.map((tx) => (
                                        <li
                                            key={tx.id}
                                            className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                                        >
                                            <div>
                                                <p className="font-medium">
                                                    {tx.category} → {tx.subcategory || "General"}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{tx.type}</p>
                                            </div>
                                            <span
                                                className={`font-semibold ${tx.type === "Expense" ? "text-red-600" : "text-green-600"
                                                    }`}
                                            >
                                                {tx.type === "Expense" ? "-" : "+"}${tx.amount}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* === CALENDAR VIEW === */}
            {view === "calendar" && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
                    <Calendar
                        className="rounded-lg w-full dark:bg-gray-800 dark:text-gray-100"
                        tileContent={({ date }) => {
                            const txs = transactions.filter(
                                (t) => new Date(t.date).toDateString() === date.toDateString()
                            );
                            if (txs.length === 0) return null;
                            const income = txs.filter((t) => t.type === "Income").reduce((a, b) => a + b.amount, 0);
                            const expense = txs.filter((t) => t.type === "Expense").reduce((a, b) => a + b.amount, 0);
                            return (
                                <div className="mt-1 text-xs text-center">
                                    <span className="text-green-600">+{income}</span>{" "}
                                    <span className="text-red-600">-{expense}</span>
                                </div>
                            );
                        }}
                    />
                </div>
            )}

            {/* === MONTHLY VIEW === */}
            {view === "monthly" && (
                <div className="space-y-6">
                    {Object.entries(groupedByMonth).map(([month, txs]) => {
                        const income = txs.filter((t) => t.type === "Income").reduce((a, b) => a + b.amount, 0);
                        const expense = txs.filter((t) => t.type === "Expense").reduce((a, b) => a + b.amount, 0);
                        return (
                            <div key={month} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4">
                                <div className="flex justify-between items-center border-b pb-2 mb-3 dark:border-gray-700">
                                    <h2 className="text-lg font-semibold">{month}</h2>
                                    <div className="flex space-x-4 text-sm">
                                        <span className="text-green-600">+${income}</span>
                                        <span className="text-red-600">-${expense}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* === TOTAL VIEW === */}
            {view === "total" && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 text-center space-y-3">
                    <h2 className="text-xl font-semibold">Total Summary ({monthLabel})</h2>
                    <p className="text-green-600 font-bold">Income: +${totalIncome}</p>
                    <p className="text-red-600 font-bold">Expense: -${totalExpense}</p>
                    <p className="text-blue-600 dark:text-blue-400 font-bold">
                        Balance: ${totalIncome - totalExpense}
                    </p>
                </div>
            )}
        </motion.div>
    );
}
