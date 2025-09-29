import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";

export default function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/add" element={<AddTransaction />} />
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </Layout>
        </Router>
    );
}
