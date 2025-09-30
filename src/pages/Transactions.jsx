import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setMonth, setYear } from "../features/transactionsSlice";
import Tabs from "../components/common/Tabs";
import MonthYearNav from "../components/common/MonthYearNav";
import { groupByDate, groupByWeeks } from "../utils/transactionUtils";
import TransactionDayList from "../components/transactions/TransactionDayList";
import TransactionCalendar from "../components/transactions/TransactionCalendar";
import TransactionMonthlyAccordion from "../components/transactions/TransactionMonthlyAccordion";
import TransactionTotalSummary from "../components/transactions/TransactionTotalSummary";

export default function Transactions() {
    const { transactions, selectedMonth, selectedYear } = useSelector(
        (state) => state.transactions
    );
    const { currency } = useSelector((state) => state.settings);
    const dispatch = useDispatch();
    const [view, setView] = useState("daily");

    const today = new Date();

    // Month navigation handlers
    const handlePrevMonth = () => {
        if (selectedMonth === 1) {
            dispatch(setMonth(12));
            dispatch(setYear(selectedYear - 1));
        } else {
            dispatch(setMonth(selectedMonth - 1));
        }
    };

    const handleNextMonth = () => {
        if (selectedMonth === 12) {
            dispatch(setMonth(1));
            dispatch(setYear(selectedYear + 1));
        } else {
            dispatch(setMonth(selectedMonth + 1));
        }
    };

    const monthLabel = new Date(selectedYear, selectedMonth - 1).toLocaleString(
        "default",
        {
            month: "long",
            year: "numeric",
        }
    );

    // Filtered for daily/calendar views
    const filtered = transactions.filter((tx) => {
        const d = new Date(tx.date);
        return (
            d.getMonth() + 1 === selectedMonth && d.getFullYear() === selectedYear
        );
    });

    const groupedByDay = groupByDate(filtered);

    const totalIncome = filtered
        .filter((t) => t.type === "Income")
        .reduce((a, b) => a + b.amount, 0);
    const totalExpense = filtered
        .filter((t) => t.type === "Expense")
        .reduce((a, b) => a + b.amount, 0);

    const tabs = ["daily", "calendar", "monthly", "total"];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <h1 className="text-2xl font-semibold mb-4">Transactions</h1>
            {/* Tabs */}
            <Tabs tabs={tabs} activeTab={view} onTabChange={setView} />
            {/* Month navigation only in Daily tab */}
            {view === "daily" && (
                <MonthYearNav
                    label={monthLabel}
                    onPrev={handlePrevMonth}
                    onNext={handleNextMonth}
                />
            )}
            {view === "daily" && (
                <TransactionDayList groupedByDay={groupedByDay} currency={currency} />
            )}
            {view === "calendar" && (
                <TransactionCalendar filtered={filtered} currency={currency} />
            )}
            {view === "monthly" && (
                <TransactionMonthlyAccordion
                    transactions={transactions}
                    selectedYear={selectedYear}
                    today={today}
                    currency={currency}
                    groupByWeeks={groupByWeeks}
                    dispatch={dispatch}
                    setYear={setYear}
                />
            )}
            {view === "total" && (
                <TransactionTotalSummary
                    monthLabel={monthLabel}
                    currency={currency}
                    totalIncome={totalIncome}
                    totalExpense={totalExpense}
                />
            )}
        </motion.div>
    );
}
