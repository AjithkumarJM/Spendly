import React, { useState } from "react";

function getCalendarDays(year, month, transactions) {
    const days = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();
    const today = new Date();
    let dayNum = 1 - startDay;
    for (let i = 0; i < 6 * 7; i++) {
        const date = new Date(year, month, dayNum);
        const isCurrentMonth = date.getMonth() === month;
        const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
        const txs = transactions.filter(
            (tx) => {
                const d = new Date(tx.date);
                return (
                    d.getDate() === date.getDate() &&
                    d.getMonth() === date.getMonth() &&
                    d.getFullYear() === date.getFullYear()
                );
            }
        );
        days.push({ date, isCurrentMonth, isToday, transactions: txs });
        dayNum++;
    }
    return days;
}

export default function TransactionCalendar({ filtered, currency }) {
    // Calendar state for navigation
    const initialDate = filtered[0] ? new Date(filtered[0].date) : new Date();
    const [calendarYear, setCalendarYear] = useState(initialDate.getFullYear());
    const [calendarMonth, setCalendarMonth] = useState(initialDate.getMonth());
    const calendarDays = getCalendarDays(calendarYear, calendarMonth, filtered);
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return (
        <div className="overflow-x-auto mb-6">
            <div className="bg-gradient-to-br from-blue-50/80 via-white/90 to-blue-100/60 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-4 sm:p-10 max-w-5xl mx-auto border border-blue-100 dark:border-gray-700">
                {/* Month/Year navigation */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        className="p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900"
                        onClick={() => {
                            if (calendarMonth === 0) {
                                setCalendarMonth(11);
                                setCalendarYear(calendarYear - 1);
                            } else {
                                setCalendarMonth(calendarMonth - 1);
                            }
                        }}
                        aria-label="Previous month"
                    >
                        &lt;
                    </button>
                    <div className="flex items-center gap-2">
                        <select
                            className="bg-gray-100 dark:bg-gray-700 rounded px-3 py-2 text-xl font-bold text-blue-700 dark:text-blue-200 shadow"
                            value={calendarMonth}
                            onChange={e => setCalendarMonth(Number(e.target.value))}
                        >
                            {monthNames.map((m, idx) => (
                                <option key={m} value={idx}>{m}</option>
                            ))}
                        </select>
                        <select
                            className="bg-gray-100 dark:bg-gray-700 rounded px-3 py-2 text-xl font-bold text-blue-700 dark:text-blue-200 shadow"
                            value={calendarYear}
                            onChange={e => setCalendarYear(Number(e.target.value))}
                        >
                            {Array.from({ length: 12 }, (_, i) => calendarYear - 6 + i).map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        className="p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900"
                        onClick={() => {
                            if (calendarMonth === 11) {
                                setCalendarMonth(0);
                                setCalendarYear(calendarYear + 1);
                            } else {
                                setCalendarMonth(calendarMonth + 1);
                            }
                        }}
                        aria-label="Next month"
                    >
                        &gt;
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-4 text-center text-base font-semibold text-gray-500 dark:text-gray-400 mb-4">
                    {weekDays.map((d) => <div key={d}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-4">
                    {calendarDays.map((day, idx) => (
                        <div
                            key={idx}
                            className={`relative rounded-2xl p-4 min-h-[110px] flex flex-col items-center justify-start border transition group
                                ${day.isCurrentMonth ? "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700" : "bg-gray-100 dark:bg-gray-800 border-transparent"}
                                ${day.isToday ? "ring-4 ring-blue-400 border-blue-400 dark:ring-blue-700 dark:border-blue-700" : ""}
                                hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500 cursor-pointer
                            `}
                        >
                            <span className={`font-extrabold text-2xl mb-1 ${day.isToday ? "text-blue-600 dark:text-blue-300" : "text-gray-700 dark:text-gray-200"}`}>{day.date.getDate()}</span>
                            <div className="flex flex-wrap gap-1 justify-center w-full">
                                {day.transactions.slice(0, 3).map((tx) => (
                                    <span
                                        key={tx.id}
                                        className={`w-3 h-3 rounded-full border-2 ${tx.type === "Expense" ? "bg-rose-500 border-rose-200 dark:border-rose-700" : "bg-emerald-500 border-emerald-200 dark:border-emerald-700"}`}
                                        title={`${tx.category}${tx.subcategory ? ` → ${tx.subcategory}` : ""} ${tx.type === "Expense" ? "-" : "+"}${tx.amount}`}
                                    />
                                ))}
                            </div>
                            {day.transactions.length > 3 && (
                                <span className="text-xs text-gray-400 mt-1">+{day.transactions.length - 3} more</span>
                            )}
                            {/* Tooltip on hover for transactions */}
                            {day.transactions.length > 0 && (
                                <div className="hidden group-hover:block absolute z-20 left-1/2 -translate-x-1/2 top-20 bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-700 rounded-xl shadow-lg p-3 min-w-[180px]">
                                    <div className="font-bold text-blue-600 dark:text-blue-300 mb-2">Transactions</div>
                                    {day.transactions.map((tx) => (
                                        <div key={tx.id} className="flex items-center gap-2 mb-1 text-xs">
                                            <span className={`font-bold ${tx.type === "Expense" ? "text-rose-600" : "text-emerald-600"}`}>{tx.type === "Expense" ? "-" : "+"}{currency} {tx.amount}</span>
                                            <span className="truncate">{tx.category}{tx.subcategory ? ` → ${tx.subcategory}` : ""}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
