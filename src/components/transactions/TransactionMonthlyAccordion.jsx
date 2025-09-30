import React from "react";
import MonthYearNav from "../common/MonthYearNav";

export default function TransactionMonthlyAccordion({
    transactions,
    selectedYear,
    today,
    currency,
    groupByWeeks,
    dispatch,
    setYear,
}) {
    return (
        <div className="space-y-4" key={selectedYear}>
            <MonthYearNav
                label={selectedYear}
                onPrev={() => dispatch(setYear(selectedYear - 1))}
                onNext={() => dispatch(setYear(selectedYear + 1))}
            />
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
                            className="bg-white dark:bg-gray-800 rounded-xl shadow p-3 sm:p-6 border-l-4 border-blue-500"
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
    );
}
