import React from "react";
import {
    PieChart, Pie, Cell,
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

export function IncomeExpensePie({ data }) {
    const totals = [
        { name: "Income", value: data.filter(t => t.type === "Income").reduce((a, b) => a + b.amount, 0) },
        { name: "Expense", value: data.filter(t => t.type === "Expense").reduce((a, b) => a + b.amount, 0) },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie data={totals} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                        {totals.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "rgb(31 41 55)", // dark: gray-800
                            color: "white",
                            borderRadius: "0.5rem",
                            border: "none",
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export function YearlyBarChart({ data }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="month" stroke="currentColor" />
                    <YAxis stroke="currentColor" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "rgb(31 41 55)", // dark: gray-800
                            color: "white",
                            borderRadius: "0.5rem",
                            border: "none",
                        }}
                    />
                    <Bar dataKey="income" fill="#22c55e" />
                    <Bar dataKey="expense" fill="#ef4444" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
