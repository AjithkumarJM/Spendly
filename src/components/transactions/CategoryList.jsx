import React from "react";
import { ChevronDown } from "lucide-react";
import CategoryLineChart from "./CategoryLineChart";
import TransactionDayList from "../transactions/TransactionDayList";
import { groupByDate } from "../../utils/transactionUtils";

export default function CategoryList({
    categories,
    sortedChartData,
    filtered,
    tab,
    expanded,
    setExpanded,
    transactions,
    selectedYear,
    currency
}) {
    return (
        <div className="mt-6 sm:mt-8">
            {categories.length === 0 && (
                <div className="text-center text-gray-500">No data available.</div>
            )}
            {categories.map((cat) => {
                const chartEntry = sortedChartData.find((d) => d.category === cat);
                const total = chartEntry?.amount || 0;
                const isOpen = expanded === cat;
                const borderColor = chartEntry?.fill || "#6366f1";
                // Get all filtered transactions for this category and type
                const catTxs = filtered.filter(tx => tx.category === cat && tx.type === tab);
                const catTotal = catTxs.reduce((sum, tx) => sum + tx.amount, 0);
                const groupedByDay = groupByDate(catTxs);
                // Group by subcategory from catTxs only
                const subTxs = {};
                catTxs.forEach(tx => {
                    const sub = tx.subcategory || "General";
                    if (!subTxs[sub]) subTxs[sub] = [];
                    subTxs[sub].push(tx);
                });
                // Calculate percentage for this category
                const totalForType = sortedChartData.reduce((sum, d) => sum + d.amount, 0);
                const percent = totalForType > 0 ? ((total / totalForType) * 100).toFixed(1) : 0;

                return (
                    <div
                        key={cat}
                        className={`mb-6 transition-shadow duration-200 rounded-2xl shadow-md bg-white dark:bg-gray-800 border-l-[5px]`}
                        style={{ borderColor: borderColor, boxShadow: isOpen ? `0 8px 32px 0 ${borderColor}22` : undefined }}
                    >
                        <button
                            className="w-full flex justify-between items-center py-2 px-2 sm:py-5 sm:px-6 text-base sm:text-lg font-semibold rounded-2xl focus:outline-none transition-colors group hover:bg-blue-50 dark:hover:bg-blue-900"
                            onClick={() => setExpanded(isOpen ? null : cat)}
                            style={{ borderTopLeftRadius: 16, borderBottomLeftRadius: isOpen ? 0 : 16 }}
                        >
                            <span className="flex items-center gap-2 sm:gap-3">
                                <span
                                    className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 rounded-md text-xs sm:text-xs font-bold text-white shadow"
                                    style={{ background: borderColor }}
                                >
                                    {percent}%
                                </span>
                                <span className="text-base sm:text-xl font-bold" style={{ color: borderColor }}>{cat}</span>
                            </span>
                            <span className="flex items-center space-x-2 sm:space-x-3">
                                <span className="font-bold text-blue-700 dark:text-blue-300 text-base sm:text-xl">{currency} {total}</span>
                                <span className={`ml-1 sm:ml-2 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}><ChevronDown size={20} className="sm:w-7 sm:h-7 w-5 h-5" /></span>
                            </span>
                        </button>
                        {isOpen && (
                            <div className="px-2 sm:px-4 pb-2 sm:pb-3 pt-1 animate-fade-in">
                                {/* Line chart for this category's monthly spend in current year */}
                                <div className="mt-2 mb-6">
                                    <CategoryLineChart
                                        transactions={transactions}
                                        category={cat}
                                        year={selectedYear}
                                        currency={currency}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                                    {/* Subcategory details (left) */}
                                    <div>
                                        <div className="mb-1 sm:mb-2">
                                            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-1 text-xs">Subcategories</h4>
                                            <div className="space-y-1 sm:space-y-2">
                                                {Object.entries(subTxs).map(([sub, txList], idx) => {
                                                    const subTotal = txList.reduce((sum, tx) => sum + tx.amount, 0);
                                                    const percent = catTotal > 0 ? ((subTotal / catTotal) * 100).toFixed(1) : 0;
                                                    const notes = txList.map(tx => tx.note).filter(Boolean).join(", ");
                                                    return (
                                                        <div key={sub} className="flex items-center justify-between bg-blue-50 dark:bg-blue-950 rounded-lg px-2 py-1 sm:px-3 sm:py-2 shadow-sm border border-blue-100 dark:border-blue-900">
                                                            <div className="flex flex-col min-w-0">
                                                                <span className="font-semibold text-blue-700 dark:text-blue-200 text-xs sm:text-sm">{sub}</span>
                                                                {notes && <span className="text-[10px] sm:text-xs italic text-gray-500 dark:text-gray-400 truncate max-w-[120px] sm:max-w-[180px]">{notes}</span>}
                                                            </div>
                                                            <div className="flex items-center gap-1 sm:gap-2">
                                                                <span className="inline-block px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full text-[10px] sm:text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-blue-400 shadow">{percent}%</span>
                                                                <span className="font-bold text-blue-700 dark:text-blue-200 text-xs sm:text-sm">{currency} {subTotal}</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Transaction list (right) */}
                                    <div>
                                        <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-1 text-xs">Spends</h4>
                                        <TransactionDayList
                                            currency={currency}
                                            groupedByDay={groupedByDay}
                                            isCompatabible={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
