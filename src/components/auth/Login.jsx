import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import FormInput from "../common/FormInput";
import * as yup from "yup";

const schema = yup.object().shape({
    email: yup.string().email("Enter a valid email address").required("Email is required"),
    pin: yup.string().matches(/^[0-9]{4}$/, "PIN must be exactly 4 digits").required("4-digit PIN is required"),
});

export default function Login() {
    const [email, setEmail] = useState("");
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [touched, setTouched] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        const val = e.target.value;
        setEmail(val);
        schema
            .validateAt("email", { email: val })
            .then(() => setFieldErrors(errors => ({ ...errors, email: undefined })))
            .catch(err => setFieldErrors(errors => ({ ...errors, email: touched.email ? err.message : undefined })));
    };

    const handleEmailBlur = () => {
        setTouched(t => ({ ...t, email: true }));
        schema
            .validateAt("email", { email })
            .then(() => setFieldErrors(errors => ({ ...errors, email: undefined })))
            .catch(err => setFieldErrors(errors => ({ ...errors, email: err.message })));
    };

    const handlePinChange = (e) => {
        const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
        setPin(val);
        schema
            .validateAt("pin", { pin: val })
            .then(() => setFieldErrors(errors => ({ ...errors, pin: undefined })))
            .catch(err => setFieldErrors(errors => ({ ...errors, pin: touched.pin ? err.message : undefined })));
    };

    const handlePinBlur = () => {
        setTouched(t => ({ ...t, pin: true }));
        schema
            .validateAt("pin", { pin })
            .then(() => setFieldErrors(errors => ({ ...errors, pin: undefined })))
            .catch(err => setFieldErrors(errors => ({ ...errors, pin: err.message })));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ email: true, pin: true }); // Mark all fields as touched
        try {
            await schema.validate({ email, pin }, { abortEarly: false });
            setError("");
            setFieldErrors({});
            dispatch(login({ email, pin }));
            toast.success("Login successful! Welcome to Spendly.");
            navigate("/dashboard");
        } catch (err) {
            if (err.inner && err.inner.length > 0) {
                const errors = {};
                err.inner.forEach(e => { errors[e.path] = e.message; });
                setFieldErrors(errors);
                setError(err.inner[0].message);
                toast.error(err.inner[0].message);
            } else {
                setError(err.message);
                toast.error(err.message);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-400 px-2">
            <div className="w-full max-w-md mx-auto">
                <motion.div
                    className="bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-2xl p-8 sm:p-10 flex flex-col items-center border border-white/40"
                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 12 }}
                >
                    <div className="flex flex-col items-center mb-6 w-full">
                        <div className="mb-4">
                            <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="8" y="16" width="48" height="32" rx="12" fill="#6366f1" />
                                <rect x="16" y="24" width="32" height="16" rx="4" fill="#fff" />
                                <circle cx="32" cy="32" r="4" fill="#a78bfa" />
                                <rect x="24" y="40" width="16" height="4" rx="2" fill="#f472b6" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-1 tracking-tight">Welcome to Spendly</h2>
                        <p className="text-purple-600 font-medium text-center text-sm">Smart Personal Finance, Simplified.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <FormInput
                            label="Email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                            required
                            placeholder="[REDACTED_EMAIL_ADDRESS_1]"
                            error={fieldErrors.email}
                        />
                        <FormInput
                            label="4-digit PIN"
                            name="pin"
                            type="password"
                            value={pin}
                            onChange={handlePinChange}
                            onBlur={handlePinBlur}
                            maxLength={4}
                            required
                            placeholder="••••"
                            error={fieldErrors.pin}
                        />
                        {error && <div className="text-red-500 mb-2 text-sm w-full text-center">{error}</div>}
                        <button type="submit" className="w-full bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:scale-105 transition-transform mt-2 mb-2">Login</button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}