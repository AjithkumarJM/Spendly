import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function TransactionDayList({ groupedByDay, currency, onEdit, onDelete }) {
    // Sort dates descending (most recent first)
    const sortedDates = Object.keys(groupedByDay).sort((a, b) => new Date(b) - new Date(a));
    return (
        <div className="space-y-4">
            {sortedDates.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400">No transactions found.</p>
            )}
            {sortedDates.map((date) => {
                const txs = groupedByDay[date];
                const dayIncome = txs.filter((t) => t.type === "Income").reduce((a, b) => a + b.amount, 0);
                const dayExpense = txs.filter((t) => t.type === "Expense").reduce((a, b) => a + b.amount, 0);
                return (
                    <section key={date} className="relative">
                        {/* Sticky date header */}
                        <div className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 py-1 flex items-center gap-2 border-l-4 border-blue-500 mb-1 pl-3">
                            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-300">{date}</h2>
                            <div className="flex space-x-2 text-xs font-semibold">
                                <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900 rounded-full px-3 py-1 text-base shadow-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m0 0l-3-3m3 3l3-3" /></svg>
                                    +{currency} {dayIncome}
                                </span>
                                <span className="flex items-center gap-1 text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900 rounded-full px-3 py-1 text-base shadow-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16V8m0 0l-3 3m3-3l3 3" /></svg>
                                    -{currency} {dayExpense}
                                </span>
                            </div>
                        </div>
                        {/* Timeline and transaction cards */}
                        <div className="relative pl-4 sm:pl-6">
                            {/* Vertical timeline line */}
                            <div className="absolute left-1 top-0 bottom-0 w-px bg-blue-100 dark:bg-blue-900" />
                            <ul className="space-y-2">
                                {txs.map((tx) => (
                                    <li key={tx.id} className="relative group flex items-start gap-2">
                                        {/* Timeline dot */}
                                        <span className={`absolute left-[-6px] top-3 w-2.5 h-2.5 rounded-full border ${tx.type === "Expense" ? "bg-rose-500 border-rose-200 dark:border-rose-700" : "bg-emerald-500 border-emerald-200 dark:border-emerald-700"}`}></span>
                                        {/* Card */}
                                        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 px-2 sm:px-3 py-1.5 transition hover:shadow-md">
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex items-center gap-1 min-w-0">
                                                    <span className={`font-bold text-sm ${tx.type === "Expense" ? "text-rose-600" : "text-emerald-600"}`}>{tx.type === "Expense" ? "-" : "+"}{currency} {tx.amount}</span>
                                                    <span className="truncate text-xs font-medium ml-1 text-gray-800 dark:text-gray-100">{tx.category}{tx.subcategory ? ` → ${tx.subcategory}` : ""}</span>
                                                </div>
                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity sm:opacity-100">
                                                    <button className="p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900" onClick={() => onEdit(tx)} aria-label="Edit transaction"><Pencil size={14} /></button>
                                                    <button className="p-1 rounded hover:bg-rose-100 dark:hover:bg-rose-900" onClick={() => onDelete(tx)} aria-label="Delete transaction"><Trash2 size={14} /></button>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                                <span className="flex items-center gap-1"><span className="material-icons text-base align-middle">schedule</span>{tx.time}</span>
                                                {tx.note && (
                                                    <span className="flex items-center gap-1 text-blue-500 dark:text-blue-300 italic"><span>📝</span><span className="truncate max-w-[120px]">{tx.note}</span></span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}