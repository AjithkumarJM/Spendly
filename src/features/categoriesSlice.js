import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Income: {
        Salary: ["Base Pay", "Bonus", "Commission"],
        Business: ["Sales", "Services", "Investments"],
        Freelance: ["Projects", "Consulting", "Others"],
        Gifts: ["Cash Gift", "Other Gifts"],
    },
    Expense: {
        Housing: ["Rent/Mortgage", "Utilities", "Internet & Phone", "Maintenance"],
        Transportation: ["Fuel", "Public Transit", "Ride-Hailing"],
        "Food & Dining": ["Groceries", "Restaurants", "Coffee/Snacks"],
        Shopping: ["Clothing", "Electronics", "Household", "Personal Care"],
    },
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        addCategory: (state, action) => {
            const { type, category } = action.payload;
            if (!state[type][category]) state[type][category] = [];
        },
        deleteCategory: (state, action) => {
            const { type, category } = action.payload;
            delete state[type][category];
        },
        editCategory: (state, action) => {
            const { type, oldCategory, newCategory } = action.payload;
            if (state[type][oldCategory]) {
                state[type][newCategory] = state[type][oldCategory];
                delete state[type][oldCategory];
            }
        },
        addSubcategory: (state, action) => {
            const { type, category, sub } = action.payload;
            if (state[type][category] && !state[type][category].includes(sub)) {
                state[type][category].push(sub);
            }
        },
        deleteSubcategory: (state, action) => {
            const { type, category, sub } = action.payload;
            if (state[type][category]) {
                state[type][category] = state[type][category].filter((s) => s !== sub);
            }
        },
        editSubcategory: (state, action) => {
            const { type, category, oldSub, newSub } = action.payload;
            if (state[type][category]) {
                state[type][category] = state[type][category].map((s) =>
                    s === oldSub ? newSub : s
                );
            }
        },
    },
});

export const {
    addCategory,
    deleteCategory,
    editCategory,
    addSubcategory,
    deleteSubcategory,
    editSubcategory,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
