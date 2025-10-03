import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: {
        firstName: "",
        lastName: "",
        email: "",
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = {
                ...state.user,
                ...action.payload,
            };
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = {
                firstName: "",
                lastName: "",
                email: "",
            };
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
