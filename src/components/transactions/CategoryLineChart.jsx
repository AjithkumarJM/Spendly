import React from "react";
import ReactECharts from "echarts-for-react";

const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function CategoryLineChart({ transactions, category, year, currency }) {
    // Filter for this category and year
    const filtered = transactions.filter(tx =>
        tx.category === category && new Date(tx.date).getFullYear() === year
    );
    // Aggregate by month
    const monthly = Array(12).fill(0);
    filtered.forEach(tx => {
        const m = new Date(tx.date).getMonth();
        monthly[m] += tx.amount;
    });
    // Detect dark mode
    const isDark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");

    return (
        <ReactECharts
            style={{ height: 220, width: "100%" }}
            option={{
                grid: { left: 40, right: 20, top: 30, bottom: 30 },
                tooltip: { trigger: "axis" },
                xAxis: {
                    type: "category",
                    data: MONTHS,
                    axisLabel: { color: isDark ? "#e5e7eb" : "#374151" },
                    axisLine: { lineStyle: { color: isDark ? "#e5e7eb" : "#374151" } }
                },
                yAxis: {
                    type: "value",
                    axisLabel: {
                        color: isDark ? "#e5e7eb" : "#374151",
                        formatter: v => `${currency} ${v}`
                    },
                    splitLine: { lineStyle: { color: isDark ? "#374151" : "#e5e7eb", type: "dashed" } }
                },
                series: [
                    {
                        data: monthly,
                        type: "line",
                        smooth: true,
                        symbol: "circle",
                        symbolSize: 8,
                        lineStyle: { width: 3, color: "#6366f1" },
                        itemStyle: { color: "#6366f1" },
                        areaStyle: { color: isDark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.08)" },
                    }
                ]
            }}
        />
    );
}
