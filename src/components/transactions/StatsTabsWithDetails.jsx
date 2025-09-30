import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Landmark } from "lucide-react";

import MonthYearNav from "../common/MonthYearNav";

const COLORS = {
    income: "#34d399", // emerald-400
    expense: "#f87171", // rose-400
    bar: [
        "#6366f1", // Indigo
        "#f59e42", // Orange
        "#34d399", // Emerald
        "#f87171", // Rose
        "#a78bfa", // Purple
        "#f472b6", // Pink
        "#facc15", // Yellow
        "#38bdf8", // Sky Blue
        "#fb7185", // Red
        "#10b981"  // Green
    ]
};

function getCategoryData(transactions, type) {
    const grouped = {};
    transactions.filter(tx => tx.type === type).forEach(tx => {
        if (!grouped[tx.category]) grouped[tx.category] = 0;
        grouped[tx.category] += tx.amount;
    });
    // Alternate between two colors for pie slices
    return Object.entries(grouped).map(([category, amount], idx) => ({
        category,
        amount,
        fill: COLORS.bar[idx % COLORS.bar.length]
    }));
}

function getSubcategoryData(transactions, type, category) {
    const grouped = {};
    transactions.filter(tx => tx.type === type && tx.category === category).forEach(tx => {
        const sub = tx.subcategory || "General";
        if (!grouped[sub]) grouped[sub] = 0;
        grouped[sub] += tx.amount;
    });
    return Object.entries(grouped).map(([subcategory, amount]) => ({ subcategory, amount }));
}

export default function StatsTabsWithDetails({ transactions, currency }) {
    const [tab, setTab] = useState("Expense");
    const [expanded, setExpanded] = useState(null);
    const [mode, setMode] = useState("month"); // "month" or "year"
    const today = new Date();
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);

    // Filter transactions by selected month/year or whole year
    const filtered = transactions.filter((tx) => {
        const d = new Date(tx.date);
        if (mode === "year") {
            return d.getFullYear() === selectedYear;
        }
        return d.getFullYear() === selectedYear && d.getMonth() + 1 === selectedMonth;
    });

    const chartData = getCategoryData(filtered, tab);
    const categories = chartData.map((d) => d.category);
    const monthLabel = new Date(selectedYear, selectedMonth - 1).toLocaleString("default", { month: "long", year: "numeric" });

    const totalIncome = filtered.filter(tx => tx.type === "Income").reduce((sum, tx) => sum + tx.amount, 0);
    const totalExpense = filtered.filter(tx => tx.type === "Expense").reduce((sum, tx) => sum + tx.amount, 0);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            <div className="flex flex-wrap items-center gap-2 mb-6">
                {["Expense", "Income"].map((t) => (
                    <button
                        key={t}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"}`}
                        onClick={() => { setTab(t); setExpanded(null); }}
                    >
                        {t}
                    </button>
                ))}
                <div className="ml-auto flex gap-2">
                    <button
                        className={`px-3 py-1 rounded ${mode === "month" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}
                        onClick={() => setMode("month")}
                    >
                        Month
                    </button>
                    <button
                        className={`px-3 py-1 rounded ${mode === "year" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}
                        onClick={() => setMode("year")}
                    >
                        Year
                    </button>
                </div>
            </div>
            {mode === "month" && (
                <MonthYearNav
                    label={monthLabel}
                    onPrev={() => {
                        if (selectedMonth === 1) {
                            setSelectedMonth(12);
                            setSelectedYear(selectedYear - 1);
                        } else {
                            setSelectedMonth(selectedMonth - 1);
                        }
                    }}
                    onNext={() => {
                        if (selectedMonth === 12) {
                            setSelectedMonth(1);
                            setSelectedYear(selectedYear + 1);
                        } else {
                            setSelectedMonth(selectedMonth + 1);
                        }
                    }}
                />
            )}
            {mode === "year" && (
                <MonthYearNav
                    label={selectedYear}
                    onPrev={() => setSelectedYear(selectedYear - 1)}
                    onNext={() => setSelectedYear(selectedYear + 1)}
                />
            )}
            {/* Summary cards for selected period */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center rounded-2xl bg-emerald-50 dark:bg-emerald-900 p-6 shadow-md">
                    <div className="bg-emerald-100 dark:bg-emerald-800 rounded-full p-3 mb-2">
                        <TrendingUp size={32} className="text-emerald-600" />
                    </div>
                    <div className="text-emerald-700 dark:text-emerald-300 text-lg font-semibold mb-1">Income</div>
                    <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-200">+{currency} {totalIncome}</div>
                </div>
                <div className="flex flex-col items-center rounded-2xl bg-rose-50 dark:bg-rose-900 p-6 shadow-md">
                    <div className="bg-rose-100 dark:bg-rose-800 rounded-full p-3 mb-2">
                        <TrendingDown size={32} className="text-rose-600" />
                    </div>
                    <div className="text-rose-700 dark:text-rose-300 text-lg font-semibold mb-1">Expense</div>
                    <div className="text-2xl font-bold text-rose-700 dark:text-rose-200">-{currency} {totalExpense}</div>
                </div>
                <div className="flex flex-col items-center rounded-2xl bg-blue-50 dark:bg-blue-900 p-6 shadow-md">
                    <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-3 mb-2">
                        <Landmark size={32} className="text-blue-600" />
                    </div>
                    <div className="text-blue-700 dark:text-blue-300 text-lg font-semibold mb-1">Balance</div>
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-200">{currency} {totalIncome - totalExpense}</div>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="amount"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                    >
                        {chartData.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${currency} ${value}`} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
            <div className="mt-8">
                {categories.length === 0 && (
                    <div className="text-center text-gray-500">No data available.</div>
                )}
                {categories.map((cat) => {
                    const chartEntry = chartData.find((d) => d.category === cat);
                    const total = chartEntry?.amount || 0;
                    const chipColor = chartEntry?.fill || "#e0e7ff";
                    const subData = getSubcategoryData(filtered, tab, cat);
                    const isOpen = expanded === cat;
                    // Calculate percentage for this category
                    const totalForType = chartData.reduce((sum, d) => sum + d.amount, 0);
                    const percent = totalForType > 0 ? ((total / totalForType) * 100).toFixed(1) : 0;
                    return (
                        <div key={cat} className="mb-2 border-b dark:border-gray-700">
                            <button
                                className="w-full flex justify-between items-center py-3 px-2 text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                onClick={() => setExpanded(isOpen ? null : cat)}
                            >
                                <span className="flex items-center gap-2">
                                    <span
                                        className="inline-block px-2 py-0.5 rounded-full text-xs font-bold text-white"
                                        style={{ backgroundColor: chipColor }}
                                    >
                                        {percent}%
                                    </span>
                                    {cat}
                                </span>
                                <span className="flex items-center space-x-2">
                                    <span className="font-bold text-blue-600">{currency} {total}</span>
                                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </span>
                            </button>
                            {isOpen && (
                                <div className="pl-6 pb-3">
                                    {subData.length === 0 ? (
                                        <div className="text-gray-500">No subcategories.</div>
                                    ) : (
                                        <ul className="space-y-1">
                                            {subData.map((sub) => (
                                                <li key={sub.subcategory} className="flex justify-between items-center py-1">
                                                    <span>{sub.subcategory}</span>
                                                    <span className="font-medium text-emerald-600">{currency} {sub.amount}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}