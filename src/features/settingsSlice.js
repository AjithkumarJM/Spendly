import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currency: "₹", // default symbol
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setCurrency: (state, action) => {
            state.currency = action.payload;
        },
    },
});

export const { setCurrency } = settingsSlice.actions;
export default settingsSlice.reducer;
