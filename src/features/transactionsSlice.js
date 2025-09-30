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
