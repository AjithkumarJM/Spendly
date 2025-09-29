import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactions: [
        { id: 1, type: "Income", category: "Salary", amount: 3000, date: "2025-01-05" },
        { id: 2, type: "Expense", category: "Food", amount: 50, date: "2025-01-10" },
        { id: 3, type: "Expense", category: "Travel", amount: 100, date: "2025-02-15" },
        { id: 4, type: "Income", category: "Freelance", amount: 800, date: "2025-02-20" },
    ],
    selectedMonth: new Date().getMonth() + 1, // current month (1–12)
    selectedYear: new Date().getFullYear(),
    viewMode: "monthly", // or "yearly"
};

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            state.transactions.push(action.payload);
        },
        setMonth: (state, action) => {
            state.selectedMonth = action.payload;
        },
        setYear: (state, action) => {
            state.selectedYear = action.payload;
        },
        setViewMode: (state, action) => {
            state.viewMode = action.payload;
        },
    },
});

export const { addTransaction, setMonth, setYear, setViewMode } = transactionsSlice.actions;
export default transactionsSlice.reducer;
