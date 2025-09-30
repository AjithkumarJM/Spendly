import React from "react";

export default function TransactionDayList({ groupedByDay, currency }) {
    return (
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
    );
}