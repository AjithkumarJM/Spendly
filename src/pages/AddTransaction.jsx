import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../features/transactionsSlice";
import FormInput from "../components/common/FormInput";
import { categories } from "../data/categories";

const AddTransaction = ({ onClose, initialData, onSave }) => {
    const dispatch = useDispatch();

    // Default date + time
    const today = new Date();
    const defaultDate = today.toISOString().split("T")[0]; // YYYY-MM-DD
    const defaultTime = today.toTimeString().slice(0, 5); // HH:mm

    const [form, setForm] = useState(() =>
        initialData
            ? { ...initialData, amount: initialData.amount.toString() }
            : {
                type: "Expense",
                category: "",
                subcategory: "",
                amount: "",
                date: defaultDate,
                time: defaultTime,
                note: "",
            }
    );

    useEffect(() => {
        if (initialData) {
            setForm({ ...initialData, amount: initialData.amount.toString() });
        }
    }, [initialData]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!form.category || !form.amount) return;

            const tx = {
                ...form,
                id: initialData ? initialData.id : Date.now(),
                amount: Number(form.amount),
            };

            if (onSave) {
                onSave(tx);
            } else {
                dispatch(addTransaction(tx));

                // ✅ Close modal after successful save
                if (onClose) {
                    onClose();
                }
            }

            if (onClose) onClose();

            // Optional: reset form for next time
            if (!initialData) {
                setForm({
                    type: "Expense",
                    category: "",
                    subcategory: "",
                    amount: "",
                    date: defaultDate,
                    time: defaultTime,
                    note: "",
                });
            }
        },
        [form, onSave, onClose, initialData, dispatch, defaultDate, defaultTime]
    );

    const availableCategories = Object.keys(categories[form.type] || {});
    const availableSubcategories = categories[form.type]?.[form.category] || [];

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Add Transaction</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                    label="Type"
                    name="type"
                    as="select"
                    value={form.type}
                    onChange={handleChange}
                    options={["Expense", "Income"]}
                    required
                />
                <FormInput
                    label="Category"
                    name="category"
                    as="select"
                    value={form.category}
                    onChange={handleChange}
                    options={availableCategories}
                    required
                />
                <FormInput
                    label="Subcategory"
                    name="subcategory"
                    as="select"
                    value={form.subcategory}
                    onChange={handleChange}
                    options={["", ...availableSubcategories]}
                    required={false}
                    disabled={!form.category}
                />
                <FormInput
                    label="Amount"
                    name="amount"
                    type="number"
                    value={form.amount}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                />
                <FormInput
                    label="Date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label="Time"
                    name="time"
                    type="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label="Note (optional)"
                    name="note"
                    as="textarea"
                    value={form.note}
                    onChange={handleChange}
                    placeholder="Add a note..."
                />
                <div className="flex justify-end space-x-2 pt-2">
                    <button
                        type="button"
                        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default React.memo(AddTransaction);
