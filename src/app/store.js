import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactionsSlice";
import categoriesReducer from "../features/categoriesSlice";
import settingsReducer from "../features/settingsSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    categories: categoriesReducer,
    settings: settingsReducer,
  },
});
