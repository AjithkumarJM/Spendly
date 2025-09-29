import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    CartesianGrid,
} from "recharts";

// Vibrant modern palette
const COLORS = [
    "#16a34a", // emerald green
    "#dc2626", // red
    "#3b82f6", // blue
    "#f59e0b", // amber
    "#9333ea", // purple
    "#06b6d4", // cyan
];

// Custom tooltip with dark/light mode styles
function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
        return (
            <div className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md text-sm text-gray-700 dark:text-gray-200">
                <p className="font-semibold mb-1">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
}

// Pie Chart for Income vs Expense
export function IncomeExpensePie({ data }) {
    const totals = [
        {
            name: "Income",
            value: data.filter((t) => t.type === "Income").reduce((a, b) => a + b.amount, 0),
        },
        {
            name: "Expense",
            value: data.filter((t) => t.type === "Expense").reduce((a, b) => a + b.amount, 0),
        },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-3">Income vs Expense</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={totals}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {totals.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                                stroke="white"
                                strokeWidth={2}
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

// Bar Chart for Yearly Overview
export function YearlyBarChart({ data }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-3">Yearly Overview</h2>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="month" stroke="currentColor" />
                    <YAxis stroke="currentColor" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="income" name="Income" fill="#16a34a" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="expense" name="Expense" fill="#dc2626" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

// Extra: Line Chart for Balance Trend (optional eye candy)
export function BalanceLineChart({ data }) {
    const balanceData = data.map((d) => ({
        month: d.month,
        balance: d.income - d.expense,
    }));

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-3">Balance Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={balanceData}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="month" stroke="currentColor" />
                    <YAxis stroke="currentColor" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                        dataKey="balance"
                        name="Balance"
                        fill="url(#balanceGradient)"
                        radius={[8, 8, 0, 0]}
                    />
                    <defs>
                        <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                            <stop offset="100%" stopColor="#9333ea" stopOpacity={0.7} />
                        </linearGradient>
                    </defs>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
