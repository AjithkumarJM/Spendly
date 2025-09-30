import { createSlice } from "@reduxjs/toolkit";
import { dummyTransactions } from "../data/dummyTransactions";

const initialState = {
    transactions: dummyTransactions,
    selectedMonth: new Date().getMonth() + 1,
    selectedYear: new Date().getFullYear(),
    viewMode: "monthly",
};

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            state.transactions.push(action.payload);
        },
        editTransaction: (state, action) => {
            const idx = state.transactions.findIndex(t => t.id === action.payload.id);
            if (idx !== -1) {
                state.transactions[idx] = action.payload;
            }
        },
        deleteTransaction: (state, action) => {
            state.transactions = state.transactions.filter(t => t.id !== action.payload);
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

export const { addTransaction, editTransaction, deleteTransaction, setMonth, setYear, setViewMode } = transactionsSlice.actions;
export default transactionsSlice.reducer;
