import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, PlusCircle, Wallet } from "lucide-react";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
                <Link to="/" className="text-xl font-bold text-blue-600">
                    MoneyManager
                </Link>
                <div className="flex space-x-4">
                    <Link to="/dashboard" className="flex items-center space-x-1 hover:text-blue-600">
                        <BarChart3 size={18} /> <span>Dashboard</span>
                    </Link>
                    <Link to="/transactions" className="flex items-center space-x-1 hover:text-blue-600">
                        <Wallet size={18} /> <span>Transactions</span>
                    </Link>
                    <Link to="/add" className="flex items-center space-x-1 hover:text-blue-600">
                        <PlusCircle size={18} /> <span>Add</span>
                    </Link>
                </div>
            </nav>
            <main className="p-6 max-w-5xl mx-auto">{children}</main>
        </div>
    );
}
