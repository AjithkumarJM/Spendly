import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../features/settingsSlice";
import CategorySettings from "./CategorySettings";
import FormInput from "../components/common/FormInput";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";

const profileSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Enter a valid email address").required("Email is required"),
    pin: yup.string().matches(/^[0-9]{4}$/, "PIN must be exactly 4 digits").required("4-digit PIN is required"),
});

export default function Settings() {
    const dispatch = useDispatch();
    const { currency } = useSelector((state) => state.settings);
    const user = useSelector((state) => state.auth?.user) || {};

    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [email, setEmail] = useState(user?.email || "");
    const [pin, setPin] = useState("");
    const [profileErrors, setProfileErrors] = useState({});
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState("profile");

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            await profileSchema.validate({ firstName, lastName, email, pin }, { abortEarly: false });
            setProfileErrors({});
            setMessage("Profile updated successfully.");
            dispatch({ type: "auth/login", payload: { firstName, lastName, email } });
        } catch (err) {
            if (err.inner && err.inner.length > 0) {
                const errors = {};
                err.inner.forEach(e => { errors[e.path] = e.message; });
                setProfileErrors(errors);
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 space-y-4">
            <h1 className="text-2xl font-semibold mb-4">Settings</h1>

            {/* Profile Accordion */}
            <motion.div layout className="rounded-2xl shadow bg-white dark:bg-gray-800">
                <button
                    className="w-full flex justify-between items-center px-6 py-4 text-lg font-bold text-blue-700 dark:text-blue-300 focus:outline-none"
                    onClick={() => setOpen(open === "profile" ? null : "profile")}
                >
                    Profile
                    <span>{open === "profile" ? "-" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                    {open === "profile" && (
                        <motion.div
                            key="profile"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-6 pb-6 overflow-hidden"
                        >
                            <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-md mx-auto">
                                <FormInput
                                    label="First Name"
                                    name="firstName"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    error={profileErrors.firstName}
                                    required
                                    placeholder="John"
                                />
                                <FormInput
                                    label="Last Name"
                                    name="lastName"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    error={profileErrors.lastName}
                                    required
                                    placeholder="Doe"
                                />
                                <FormInput
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    error={profileErrors.email}
                                    required
                                    placeholder="[REDACTED_EMAIL_ADDRESS_1]"
                                />
                                <FormInput
                                    label="4-digit PIN"
                                    name="pin"
                                    type="password"
                                    value={pin}
                                    onChange={e => setPin(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                                    error={profileErrors.pin}
                                    maxLength={4}
                                    required
                                    placeholder="••••"
                                />
                                {message && <div className="mb-2 text-blue-600 dark:text-blue-300">{message}</div>}
                                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold">Update</button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Currency Accordion */}
            <div className="rounded-2xl shadow bg-white dark:bg-gray-800">
                <button
                    className="w-full flex justify-between items-center px-6 py-4 text-lg font-bold text-blue-700 dark:text-blue-300 focus:outline-none"
                    onClick={() => setOpen(open === "currency" ? null : "currency")}
                >
                    Currency
                    <span>{open === "currency" ? "-" : "+"}</span>
                </button>
                {open === "currency" && (
                    <div className="px-6 pb-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            Choose the default currency for displaying income and expenses.
                        </p>
                        <select
                            value={currency}
                            onChange={(e) => dispatch(setCurrency(e.target.value))}
                            className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200"
                        >
                            <option value="$">USD ($)</option>
                            <option value="€">EUR (€)</option>
                            <option value="£">GBP (£)</option>
                            <option value="₹">INR (₹)</option>
                            <option value="¥">JPY (¥)</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Categories Accordion */}
            <div className="rounded-2xl shadow bg-white dark:bg-gray-800">
                <button
                    className="w-full flex justify-between items-center px-6 py-4 text-lg font-bold text-blue-700 dark:text-blue-300 focus:outline-none"
                    onClick={() => setOpen(open === "categories" ? null : "categories")}
                >
                    Categories & Subcategories
                    <span>{open === "categories" ? "-" : "+"}</span>
                </button>
                {open === "categories" && (
                    <div className="px-6 pb-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            Manage your income and expense categories. You can add, edit, or remove categories and their subcategories.
                        </p>
                        <CategorySettings />
                    </div>
                )}
            </div>
        </div>
    );
}
