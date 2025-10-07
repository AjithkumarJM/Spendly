import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

import MonthYearNav from "../common/MonthYearNav";
import SummaryCards from "./SummaryCards";
import CategoryList from "./CategoryList";
import { formatK } from "../../utils/numberFormat";
import { useScreenSize } from "../../context/ScreenSizeContext";

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

export default function StatsTabsWithDetails({ transactions, currency }) {
    const [tab, setTab] = useState("Expense");
    const [expanded, setExpanded] = useState(null);
    const [mode, setMode] = useState("month"); // "month" or "year"
    const today = new Date();
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
    // Track dark mode for chart color
    const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains("dark"));
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    // Filter transactions by selected month/year or whole year
    const filtered = transactions.filter((tx) => {
        const d = new Date(tx.date);
        if (mode === "year") {
            return d.getFullYear() === selectedYear;
        }
        return d.getFullYear() === selectedYear && d.getMonth() + 1 === selectedMonth;
    });

    const chartData = getCategoryData(filtered, tab);
    // Sort chartData by amount descending
    const sortedChartData = [...chartData].sort((a, b) => b.amount - a.amount);
    const categories = sortedChartData.map((d) => d.category);
    const monthLabel = new Date(selectedYear, selectedMonth - 1).toLocaleString("default", { month: "long", year: "numeric" });

    const totalIncome = filtered.filter(tx => tx.type === "Income").reduce((sum, tx) => sum + tx.amount, 0);
    const totalExpense = filtered.filter(tx => tx.type === "Expense").reduce((sum, tx) => sum + tx.amount, 0);
    const { isMobile } = useScreenSize();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            {/* Tabs and mode switch */}
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
            <SummaryCards totalIncome={totalIncome} totalExpense={totalExpense} currency={currency} />
            {/* Pie chart */}
            <div className={`w-full ${isMobile ? 'h-[160px]' : 'sm:h-[220px] md:h-[280px]'}`}>
                <ReactECharts
                    style={{ width: "100%", height: isMobile ? "160px" : "300px" }}
                    option={{
                        tooltip: { trigger: "item" },
                        legend: {
                            type: 'scroll',
                            orient: 'horizontal',
                            top: 'bottom',
                            left: 'center',
                            itemWidth: 14,
                            itemHeight: 10,
                            textStyle: {
                                fontSize: isMobile ? 10 : 14,
                                color: isDarkMode ? "#e5e7eb" : "#666666"
                            },
                            pageIconColor: '#6366f1',
                            pageTextStyle: { color: isDarkMode ? "#e5e7eb" : "#666666" },
                        },
                        series: [
                            {
                                name: tab,
                                type: "pie",
                                radius: [isMobile ? "0%" : "40%", "70%"],
                                avoidLabelOverlap: false,
                                itemStyle: { borderRadius: 10, borderColor: "#fff", borderWidth: 2 },
                                label: {
                                    show: true,
                                    fontSize: isMobile ? 10 : 14,
                                    fontWeight: "bold",
                                    color: isDarkMode ? "#e5e7eb" : "#666666",
                                    formatter: (params) => `${params.name}: ${formatK(params.value)}`
                                },
                                data: sortedChartData.map(d => ({
                                    value: d.amount,
                                    name: d.category,
                                    itemStyle: { color: d.fill }
                                }))
                            }
                        ]
                    }}
                />
            </div>
            <CategoryList
                categories={categories}
                sortedChartData={sortedChartData}
                filtered={filtered}
                tab={tab}
                expanded={expanded}
                setExpanded={setExpanded}
                transactions={transactions}
                selectedYear={selectedYear}
                currency={currency}
            />
        </div>
    );
}