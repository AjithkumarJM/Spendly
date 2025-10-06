import React from "react";
import { TrendingUp, TrendingDown, Landmark } from "lucide-react";

export default function SummaryCards({ totalIncome, totalExpense, currency }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="flex flex-col items-center rounded-2xl bg-emerald-50 dark:bg-emerald-900 p-6 shadow-md">
                <div className="bg-emerald-100 dark:bg-emerald-800 rounded-full p-3 mb-2">
                    <TrendingUp size={32} className="text-emerald-600" />
                </div>
                <div className="text-emerald-700 dark:text-emerald-300 text-lg font-semibold mb-1">Income</div>
                <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-200">{currency} {totalIncome}</div>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-rose-50 dark:bg-rose-900 p-6 shadow-md">
                <div className="bg-rose-100 dark:bg-rose-800 rounded-full p-3 mb-2">
                    <TrendingDown size={32} className="text-rose-600" />
                </div>
                <div className="text-rose-700 dark:text-rose-300 text-lg font-semibold mb-1">Expense</div>
                <div className="text-2xl font-bold text-rose-700 dark:text-rose-200">{currency} {totalExpense}</div>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-blue-50 dark:bg-blue-900 p-6 shadow-md">
                <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-3 mb-2">
                    <Landmark size={32} className="text-blue-600" />
                </div>
                <div className="text-blue-700 dark:text-blue-300 text-lg font-semibold mb-1">Balance</div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-200">{currency} {totalIncome - totalExpense}</div>
            </div>
        </div>
    );
}
