import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactions: [
        // === JANUARY ===
        { id: 1, type: "Income", category: "Salary", subcategory: "Base Pay", amount: 3000, date: "2025-01-05", time: "09:00", note: "Monthly salary" },
        { id: 2, type: "Expense", category: "Food & Dining", subcategory: "Groceries", amount: 250, date: "2025-01-08", time: "18:30", note: "Weekly groceries" },
        { id: 3, type: "Expense", category: "Transportation", subcategory: "Fuel", amount: 120, date: "2025-01-12", time: "08:15", note: "Car fuel" },
        { id: 4, type: "Income", category: "Freelance", subcategory: "Projects", amount: 500, date: "2025-01-20", time: "14:00", note: "Freelance website build" },
        { id: 5, type: "Expense", category: "Entertainment", subcategory: "Subscriptions", amount: 50, date: "2025-01-25", time: "21:00", note: "Netflix, Spotify" },

        // === FEBRUARY ===
        { id: 6, type: "Income", category: "Salary", subcategory: "Base Pay", amount: 3000, date: "2025-02-05", time: "09:00", note: "Monthly salary" },
        { id: 7, type: "Expense", category: "Food & Dining", subcategory: "Restaurants", amount: 180, date: "2025-02-10", time: "19:00", note: "Dinner with friends" },
        { id: 8, type: "Expense", category: "Housing", subcategory: "Utilities", amount: 100, date: "2025-02-15", time: "10:00", note: "Electricity & water bills" },
        { id: 9, type: "Income", category: "Business", subcategory: "Sales", amount: 1200, date: "2025-02-18", time: "11:00", note: "Side hustle sales" },
        { id: 10, type: "Expense", category: "Health & Fitness", subcategory: "Gym", amount: 70, date: "2025-02-22", time: "08:00", note: "Monthly gym membership" },

        // === MARCH ===
        { id: 11, type: "Income", category: "Salary", subcategory: "Base Pay", amount: 3000, date: "2025-03-05", time: "09:00", note: "Monthly salary" },
        { id: 12, type: "Expense", category: "Education", subcategory: "Books", amount: 120, date: "2025-03-08", time: "12:00", note: "Online course materials" },
        { id: 13, type: "Expense", category: "Transportation", subcategory: "Public Transit", amount: 60, date: "2025-03-12", time: "07:30", note: "Metro card recharge" },
        { id: 14, type: "Income", category: "Freelance", subcategory: "Consulting", amount: 900, date: "2025-03-15", time: "15:30", note: "Consulting client work" },
        { id: 15, type: "Expense", category: "Shopping", subcategory: "Clothing", amount: 200, date: "2025-03-20", time: "16:45", note: "Spring clothes" },

        // === APRIL ===
        { id: 16, type: "Income", category: "Salary", subcategory: "Base Pay", amount: 3000, date: "2025-04-05", time: "09:00", note: "Monthly salary" },
        { id: 17, type: "Expense", category: "Food & Dining", subcategory: "Groceries", amount: 260, date: "2025-04-07", time: "18:20", note: "Groceries for the month" },
        { id: 18, type: "Expense", category: "Health & Fitness", subcategory: "Pharmacy", amount: 90, date: "2025-04-14", time: "13:15", note: "Medicines" },
        { id: 19, type: "Income", category: "Gifts", subcategory: "Cash Gift", amount: 400, date: "2025-04-18", time: "20:00", note: "Birthday gift" },
        { id: 20, type: "Expense", category: "Entertainment", subcategory: "Movies", amount: 60, date: "2025-04-22", time: "21:30", note: "Cinema outing" },

        // === MAY ===
        { id: 21, type: "Income", category: "Salary", subcategory: "Base Pay", amount: 3000, date: "2025-05-05", time: "09:00", note: "Monthly salary" },
        { id: 22, type: "Expense", category: "Travel", subcategory: "Flights", amount: 550, date: "2025-05-09", time: "06:30", note: "Flight to New York" },
        { id: 23, type: "Expense", category: "Shopping", subcategory: "Electronics", amount: 400, date: "2025-05-15", time: "18:00", note: "New headphones" },
        { id: 24, type: "Income", category: "Salary", subcategory: "Bonus", amount: 1000, date: "2025-05-20", time: "10:00", note: "Quarterly bonus" },
        { id: 25, type: "Expense", category: "Food & Dining", subcategory: "Restaurants", amount: 130, date: "2025-05-25", time: "19:30", note: "Dinner outside" },

        // === JUNE ===
        { id: 26, type: "Income", category: "Salary", subcategory: "Base Pay", amount: 3000, date: "2025-06-05", time: "09:00", note: "Monthly salary" },
        { id: 27, type: "Expense", category: "Entertainment", subcategory: "Subscriptions", amount: 60, date: "2025-06-08", time: "12:00", note: "Netflix, Spotify" },
        { id: 28, type: "Income", category: "Freelance", subcategory: "Projects", amount: 750, date: "2025-06-12", time: "14:00", note: "Mobile app project" },
        { id: 29, type: "Expense", category: "Housing", subcategory: "Utilities", amount: 150, date: "2025-06-18", time: "10:30", note: "Electricity bill" },
        { id: 30, type: "Expense", category: "Food & Dining", subcategory: "Groceries", amount: 210, date: "2025-06-22", time: "17:00", note: "Monthly groceries" },

        // === JULY ===
        { id: 31, type: "Income", category: "Salary", subcategory: "Base Pay", amount: 3000, date: "2025-07-05", time: "09:00", note: "Monthly salary" },
        { id: 32, type: "Expense", category: "Housing", subcategory: "Rent/Mortgage", amount: 1200, date: "2025-07-07", time: "09:30", note: "Monthly rent" },
        { id: 33, type: "Income", category: "Business", subcategory: "Services", amount: 1500, date: "2025-07-15", time: "11:00", note: "Service revenue" },
        { id: 34, type: "Expense", category: "Shopping", subcategory: "Clothing", amount: 250, date: "2025-07-20", time: "16:00", note: "Summer clothes" },
        { id: 35, type: "Expense", category: "Food & Dining", subcategory: "Restaurants", amount: 140, date: "2025-07-25", time: "20:00", note: "Dinner out" },

        // === AUGUST ===
        { id: 36, type: "Income", category: "Salary", subcategory: "Base Pay", amount: 3000, date: "2025-08-05", time: "09:00", note: "Monthly salary" },
        { id: 37, type: "Expense", category: "Education", subcategory: "Books", amount: 100, date: "2025-08-10", time: "11:00", note: "Course books" },
        { id: 38, type: "Income", category: "Freelance", subcategory: "Consulting", amount: 600, date: "2025-08-15", time: "14:00", note: "Consulting" },
        { id: 39, type: "Expense", category: "Transportation", subcategory: "Fuel", amount: 130, date: "2025-08-20", time: "08:15", note: "Car fuel" },
        { id: 40, type: "Expense", category: "Entertainment", subcategory: "Movies", amount: 70, date: "2025-08-25", time: "21:00", note: "Cinema" },

        // === SEPTEMBER ===
        { id: 41, type: "Income", category: "Salary", subcategory: "Base Pay", amount: 3000, date: "2025-09-05", time: "09:00", note: "Monthly salary" },
        { id: 42, type: "Expense", category: "Food & Dining", subcategory: "Restaurants", amount: 160, date: "2025-09-09", time: "19:00", note: "Dinner" },
        { id: 43, type: "Income", category: "Freelance", subcategory: "Projects", amount: 1000, date: "2025-09-15", time: "15:00", note: "Freelance project" },
        { id: 44, type: "Expense", category: "Shopping", subcategory: "Electronics", amount: 500, date: "2025-09-20", time: "18:00", note: "New tablet" },
        { id: 45, type: "Expense", category: "Transportation", subcategory: "Public Transit", amount: 60, date: "2025-09-28", time: "07:30", note: "Bus pass" },

        // === OCTOBER ===
        { id: 46, type: "Income", category: "Salary", subcategory: "Base Pay", amount: 3000, date: "2025-10-05", time: "09:00", note: "Monthly salary" },
        { id: 47, type: "Expense", category: "Health & Fitness", subcategory: "Gym", amount: 70, date: "2025-10-08", time: "08:00", note: "Gym fee" },
        { id: 48, type: "Expense", category: "Food & Dining", subcategory: "Groceries", amount: 220, date: "2025-10-12", time: "18:00", note: "Groceries" },
        { id: 49, type: "Income", category: "Business", subcategory: "Investments", amount: 500, date: "2025-10-18", time: "12:00", note: "Dividend" },
        { id: 50, type: "Expense", category: "Entertainment", subcategory: "Subscriptions", amount: 60, date: "2025-10-25", time: "13:00", note: "Disney+" },

        // === NOVEMBER ===
        { id: 51, type: "Income", category: "Salary", subcategory: "Base Pay", amount: 3000, date: "2025-11-05", time: "09:00", note: "Monthly salary" },
        { id: 52, type: "Expense", category: "Shopping", subcategory: "Clothing", amount: 300, date: "2025-11-10", time: "17:00", note: "Winter coat" },
        { id: 53, type: "Income", category: "Salary", subcategory: "Bonus", amount: 800, date: "2025-11-20", time: "09:00", note: "Performance bonus" },
        { id: 54, type: "Expense", category: "Food & Dining", subcategory: "Restaurants", amount: 180, date: "2025-11-22", time: "19:00", note: "Family dinner" },
        { id: 55, type: "Expense", category: "Transportation", subcategory: "Fuel", amount: 100, date: "2025-11-27", time: "08:00", note: "Car refill" },

        // === DECEMBER ===
        { id: 56, type: "Income", category: "Salary", subcategory: "Base Pay", amount: 3000, date: "2025-12-05", time: "09:00", note: "Monthly salary" },
        { id: 57, type: "Expense", category: "Miscellaneous", subcategory: "Gifts", amount: 400, date: "2025-12-10", time: "20:00", note: "Christmas gifts" },
        { id: 58, type: "Income", category: "Gifts", subcategory: "Other Gifts", amount: 500, date: "2025-12-20", time: "21:00", note: "Year-end gift" },
        { id: 59, type: "Expense", category: "Travel", subcategory: "Hotels", amount: 600, date: "2025-12-24", time: "22:00", note: "Holiday trip" },
        { id: 60, type: "Expense", category: "Food & Dining", subcategory: "Restaurants", amount: 200, date: "2025-12-31", time: "19:00", note: "New Year’s Eve dinner" },
    ],
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
