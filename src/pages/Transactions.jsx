import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
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

// Utility: group by weeks with date ranges
const groupByWeeks = (transactions, month, year) => {
    const weeks = {};
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day += 7) {
        const start = new Date(year, month - 1, day);
        const end = new Date(year, month - 1, Math.min(day + 6, daysInMonth));
        const label = `Week ${Math.ceil(day / 7)} (${start.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })})`;

        weeks[label] = transactions.filter((tx) => {
            const d = new Date(tx.date);
            return (
                d >= start &&
                d <= end &&
                d.getMonth() + 1 === month &&
                d.getFullYear() === year
            );
        });
    }

    return weeks;
};

export default function Transactions() {
    const { transactions, selectedMonth, selectedYear } = useSelector(
        (state) => state.transactions
    );
    const { currency } = useSelector((state) => state.settings);
    const dispatch = useDispatch();
    const [view, setView] = useState("daily");

    const today = new Date();

    // Month navigation handlers
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

    const monthLabel = new Date(selectedYear, selectedMonth - 1).toLocaleString(
        "default",
        {
            month: "long",
            year: "numeric",
        }
    );

    // Filtered for daily/calendar views
    const filtered = transactions.filter((tx) => {
        const d = new Date(tx.date);
        return (
            d.getMonth() + 1 === selectedMonth && d.getFullYear() === selectedYear
        );
    });

    const groupedByDay = groupByDate(filtered);

    const totalIncome = filtered
        .filter((t) => t.type === "Income")
        .reduce((a, b) => a + b.amount, 0);
    const totalExpense = filtered
        .filter((t) => t.type === "Expense")
        .reduce((a, b) => a + b.amount, 0);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <h1 className="text-2xl font-semibold mb-4">Transactions</h1>

            {/* Tabs */}
            <div className="flex space-x-3 mb-4">
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

            {/* Month navigation only in Daily tab */}
            {view === "daily" && (
                <div className="flex items-center space-x-3 mb-4">
                    <button
                        onClick={handlePrevMonth}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <ChevronLeft />
                    </button>
                    <span className="font-medium min-w-[120px] text-center">
                        {monthLabel}
                    </span>
                    <button
                        onClick={handleNextMonth}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <ChevronRight />
                    </button>
                </div>
            )}

            {/* === DAILY VIEW === */}
            {view === "daily" && (
                <div className="space-y-6">
                    {Object.keys(groupedByDay).length === 0 && (
                        <p className="text-gray-500 dark:text-gray-400">
                            No transactions found.
                        </p>
                    )}
                    {Object.entries(groupedByDay).map(([date, txs]) => {
                        const dayIncome = txs
                            .filter((t) => t.type === "Income")
                            .reduce((a, b) => a + b.amount, 0);
                        const dayExpense = txs
                            .filter((t) => t.type === "Expense")
                            .reduce((a, b) => a + b.amount, 0);

                        return (
                            <div
                                key={date}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4"
                            >
                                <div className="flex justify-between items-center border-b pb-2 mb-3 dark:border-gray-700">
                                    <h2 className="text-lg font-semibold">{date}</h2>
                                    <div className="flex space-x-4 text-lg font-semibold">
                                        <span className="text-emerald-600">
                                            +{currency} {dayIncome}
                                        </span>
                                        <span className="text-rose-600">
                                            -{currency} {dayExpense}
                                        </span>
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
                                                {tx.note && (
                                                    <p className="text-xs italic text-gray-500 dark:text-gray-400">
                                                        📝 {tx.note}
                                                    </p>
                                                )}
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {tx.type} • {tx.date} {tx.time}
                                                </p>
                                            </div>
                                            <span
                                                className={`font-bold text-lg ${tx.type === "Expense"
                                                        ? "text-rose-600"
                                                        : "text-emerald-600"
                                                    }`}
                                            >
                                                {tx.type === "Expense" ? "-" : "+"}
                                                {currency} {tx.amount}
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
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        height="auto"
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,dayGridWeek,dayGridDay",
                        }}
                        titleFormat={{ year: "numeric", month: "long" }}
                        events={filtered.map((tx) => ({
                            id: tx.id,
                            title: `${tx.category}${tx.subcategory ? " → " + tx.subcategory : ""
                                }: ${tx.type === "Expense" ? "-" : "+"}${currency} ${tx.amount} ${tx.time
                                }`,
                            start: `${tx.date}T${tx.time || "00:00"}`,
                            color: tx.type === "Expense" ? "#fee2e2" : "#dcfce7",
                            textColor: tx.type === "Expense" ? "#e11d48" : "#059669",
                        }))}
                    />
                </div>
            )}

            {/* === MONTHLY VIEW === */}
            {view === "monthly" && (
                <div className="space-y-4" key={selectedYear}>
                    {/* Year Navigation */}
                    <div className="flex items-center space-x-3 mb-4">
                        <button
                            onClick={() => dispatch(setYear(selectedYear - 1))}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            <ChevronLeft />
                        </button>
                        <span className="font-medium min-w-[120px] text-center">
                            {selectedYear}
                        </span>
                        <button
                            onClick={() => dispatch(setYear(selectedYear + 1))}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            <ChevronRight />
                        </button>
                    </div>

                    {/* Accordion per month */}
                    {Array.from({ length: 12 }, (_, idx) => idx + 1)
                        .filter(
                            (month) =>
                                selectedYear < today.getFullYear() ||
                                (selectedYear === today.getFullYear() &&
                                    month <= today.getMonth() + 1)
                        )
                        .sort((a, b) => b - a)
                        .map((month) => {
                            const label = new Date(
                                selectedYear,
                                month - 1
                            ).toLocaleString("default", { month: "long" });

                            const txs = transactions.filter(
                                (t) =>
                                    new Date(t.date).getMonth() + 1 === month &&
                                    new Date(t.date).getFullYear() === selectedYear
                            );

                            const weeks = groupByWeeks(transactions, month, selectedYear);
                            const income = txs
                                .filter((t) => t.type === "Income")
                                .reduce((a, b) => a + b.amount, 0);
                            const expense = txs
                                .filter((t) => t.type === "Expense")
                                .reduce((a, b) => a + b.amount, 0);

                            return (
                                <details
                                    key={month}
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4"
                                >
                                    <summary className="cursor-pointer flex justify-between items-center font-semibold">
                                        {label}
                                        <span className="flex space-x-4 text-lg">
                                            <span className="text-emerald-600">
                                                +{currency} {income}
                                            </span>
                                            <span className="text-rose-600">
                                                -{currency} {expense}
                                            </span>
                                        </span>
                                    </summary>

                                    {/* Weeks inside month */}
                                    <div className="mt-3 space-y-3">
                                        {Object.entries(weeks).map(([weekLabel, wTxs]) => {
                                            const wIncome = wTxs
                                                .filter((t) => t.type === "Income")
                                                .reduce((a, b) => a + b.amount, 0);
                                            const wExpense = wTxs
                                                .filter((t) => t.type === "Expense")
                                                .reduce((a, b) => a + b.amount, 0);

                                            return (
                                                <details
                                                    key={weekLabel}
                                                    className="ml-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
                                                >
                                                    <summary className="cursor-pointer flex justify-between items-center font-medium">
                                                        {weekLabel}
                                                        <span className="flex space-x-3 text-sm font-semibold">
                                                            <span className="text-emerald-600">
                                                                +{currency} {wIncome}
                                                            </span>
                                                            <span className="text-rose-600">
                                                                -{currency} {wExpense}
                                                            </span>
                                                        </span>
                                                    </summary>
                                                    <ul className="mt-2 space-y-2">
                                                        {wTxs.map((tx) => (
                                                            <li
                                                                key={tx.id}
                                                                className="flex justify-between items-center bg-white dark:bg-gray-600 p-2 rounded"
                                                            >
                                                                <div>
                                                                    <p className="font-medium">
                                                                        {tx.category} → {tx.subcategory || "General"}
                                                                    </p>
                                                                    {tx.note && (
                                                                        <p className="text-xs italic text-gray-500 dark:text-gray-300">
                                                                            📝 {tx.note}
                                                                        </p>
                                                                    )}
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                        {tx.date} {tx.time}
                                                                    </p>
                                                                </div>
                                                                <span
                                                                    className={`font-bold text-lg ${tx.type === "Expense"
                                                                            ? "text-rose-600"
                                                                            : "text-emerald-600"
                                                                        }`}
                                                                >
                                                                    {tx.type === "Expense" ? "-" : "+"}
                                                                    {currency} {tx.amount}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </details>
                                            );
                                        })}
                                    </div>
                                </details>
                            );
                        })}
                </div>
            )}

            {/* === TOTAL VIEW === */}
            {view === "total" && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 text-center space-y-3">
                    <h2 className="text-xl font-semibold">
                        Total Summary ({monthLabel})
                    </h2>
                    <p className="text-emerald-600 font-bold text-lg">
                        Income: +{currency} {totalIncome}
                    </p>
                    <p className="text-rose-600 font-bold text-lg">
                        Expense: -{currency} {totalExpense}
                    </p>
                    <p className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                        Balance: {currency} {totalIncome - totalExpense}
                    </p>
                </div>
            )}
        </motion.div>
    );
}
