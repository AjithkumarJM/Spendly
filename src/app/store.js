import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactionsSlice";
import categoriesReducer from "../features/categoriesSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    categories: categoriesReducer,
  },
});
