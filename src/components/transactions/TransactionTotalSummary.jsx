import React from "react";

export default function TransactionTotalSummary({ monthLabel, currency, totalIncome, totalExpense }) {
    return (
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
    );
}
