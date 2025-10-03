import React from "react";

export default function FormInput({
    label,
    name,
    type = "text",
    value,
    onChange,
    options = [],
    as = "input",
    required = false,
    disabled = false,
    placeholder = "",
    error,
    className = "",
    ...props
}) {
    return (
        <div className={"mb-2 " + className}>
            {label && <label className="block mb-1 font-medium text-blue-700 dark:text-blue-300">{label}</label>}
            {as === "select" ? (
                <select
                    name={name}
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition-all dark:bg-gray-700 dark:text-white ${error
                            ? "border-red-500 focus:ring-red-400 bg-red-50 dark:bg-red-900"
                            : "border-gray-300 focus:ring-blue-400 bg-white dark:bg-gray-700"
                        }`}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    {...props}
                >
                    <option value="">Select {label?.toLowerCase()}</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            ) : as === "textarea" ? (
                <textarea
                    name={name}
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition-all dark:bg-gray-700 dark:text-white ${error
                            ? "border-red-500 focus:ring-red-400 bg-red-50 dark:bg-red-900"
                            : "border-gray-300 focus:ring-blue-400 bg-white dark:bg-gray-700"
                        }`}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    placeholder={placeholder}
                    rows={2}
                    {...props}
                />
            ) : (
                <input
                    name={name}
                    type={type}
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition-all dark:bg-gray-700 dark:text-white ${error
                            ? "border-red-500 focus:ring-red-400 bg-red-50 dark:bg-red-900"
                            : "border-gray-300 focus:ring-blue-400 bg-white dark:bg-gray-700"
                        }`}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    placeholder={placeholder}
                    {...props}
                />
            )}
            {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
        </div>
    );
}
