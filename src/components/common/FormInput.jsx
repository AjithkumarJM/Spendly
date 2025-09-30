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
    ...props
}) {
    return (
        <div>
            {label && <label className="block font-medium mb-1">{label}</label>}
            {as === "select" ? (
                <select
                    name={name}
                    className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
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
                    className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
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
                    className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    placeholder={placeholder}
                    {...props}
                />
            )}
        </div>
    );
}
