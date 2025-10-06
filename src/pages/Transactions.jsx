import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setMonth, setYear, editTransaction, deleteTransaction } from "../features/transactionsSlice";
import Tabs from "../components/common/Tabs";
import MonthYearNav from "../components/common/MonthYearNav";
import { groupByDate, groupByWeeks } from "../utils/transactionUtils";
import TransactionDayList from "../components/transactions/TransactionDayList";
import TransactionCalendar from "../components/transactions/TransactionCalendar";
import TransactionMonthlyAccordion from "../components/transactions/TransactionMonthlyAccordion";
import StatsTabsWithDetails from "../components/transactions/StatsTabsWithDetails";
import AddTransaction from "./AddTransaction";

export default function Transactions() {
    const { transactions, selectedMonth, selectedYear } = useSelector(
        (state) => state.transactions
    );
    const { currency } = useSelector((state) => state.settings);
    const dispatch = useDispatch();
    const [view, setView] = useState("daily");
    const [editModal, setEditModal] = useState({ open: false, tx: null });

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

    const isMobile = window.innerWidth < 768;
    const tabs = isMobile ? ["daily", "monthly", "stats"] : ["daily", "calendar", "monthly", "stats"];

    const handleEdit = (tx) => setEditModal({ open: true, tx });
    const handleDelete = (tx) => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            dispatch(deleteTransaction(tx.id));
        }
    };
    const handleEditSave = (updatedTx) => {
        dispatch(editTransaction(updatedTx));
        setEditModal({ open: false, tx: null });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
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
                <TransactionDayList
                    groupedByDay={groupedByDay}
                    currency={currency}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
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
            {view === "stats" && (
                <StatsTabsWithDetails
                    transactions={transactions}
                    currency={currency}
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                />
            )}
            {/* Edit Transaction Modal */}
            <AnimatePresence>
                {editModal.open && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg p-6 relative"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        >
                            <button
                                onClick={() => setEditModal({ open: false, tx: null })}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                ✕
                            </button>
                            <AddTransaction
                                onClose={() => setEditModal({ open: false, tx: null })}
                                initialData={editModal.tx}
                                onSave={handleEditSave}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}