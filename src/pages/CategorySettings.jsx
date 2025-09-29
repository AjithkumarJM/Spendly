import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addCategory,
    deleteCategory,
    editCategory,
    addSubcategory,
    deleteSubcategory,
    editSubcategory,
} from "../features/categoriesSlice";

export default function CategorySettings() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);

    const [type, setType] = useState("Expense");
    const [newCategory, setNewCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [newSub, setNewSub] = useState("");

    // Editing state
    const [editingCat, setEditingCat] = useState(null);
    const [catEditValue, setCatEditValue] = useState("");
    const [editingSub, setEditingSub] = useState({ cat: null, sub: null });
    const [subEditValue, setSubEditValue] = useState("");

    const handleAddCategory = () => {
        if (newCategory.trim()) {
            dispatch(addCategory({ type, category: newCategory.trim() }));
            setNewCategory("");
        }
    };

    const handleAddSub = () => {
        if (selectedCategory && newSub.trim()) {
            dispatch(addSubcategory({ type, category: selectedCategory, sub: newSub.trim() }));
            setNewSub("");
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-semibold">Category Settings</h1>

            {/* Switch Income/Expense */}
            <div>
                <label className="mr-2">Type:</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200"
                >
                    <option value="Expense">Expense</option>
                    <option value="Income">Income</option>
                </select>
            </div>

            {/* Add Category */}
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New Category"
                    className="flex-1 border p-2 rounded dark:bg-gray-700 dark:text-gray-200"
                />
                <button onClick={handleAddCategory} className="bg-blue-600 text-white px-4 rounded">
                    Add
                </button>
            </div>

            {/* Category List */}
            <div className="space-y-4">
                {Object.keys(categories[type]).map((cat) => (
                    <div key={cat} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                        <div className="flex justify-between items-center mb-2">
                            {editingCat === cat ? (
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={catEditValue}
                                        onChange={(e) => setCatEditValue(e.target.value)}
                                        className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200"
                                    />
                                    <button
                                        onClick={() => {
                                            dispatch(editCategory({ type, oldCategory: cat, newCategory: catEditValue }));
                                            setEditingCat(null);
                                        }}
                                        className="bg-green-600 text-white px-3 rounded"
                                    >
                                        Save
                                    </button>
                                    <button onClick={() => setEditingCat(null)} className="text-gray-500">
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="font-semibold">{cat}</h2>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => {
                                                setEditingCat(cat);
                                                setCatEditValue(cat);
                                            }}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => dispatch(deleteCategory({ type, category: cat }))}
                                            className="text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Subcategories */}
                        <ul className="ml-4 list-disc text-gray-700 dark:text-gray-200">
                            {categories[type][cat].map((sub) => (
                                <li key={sub} className="flex justify-between items-center">
                                    {editingSub.cat === cat && editingSub.sub === sub ? (
                                        <div className="flex space-x-2 w-full">
                                            <input
                                                type="text"
                                                value={subEditValue}
                                                onChange={(e) => setSubEditValue(e.target.value)}
                                                className="flex-1 border p-2 rounded dark:bg-gray-700 dark:text-gray-200"
                                            />
                                            <button
                                                onClick={() => {
                                                    dispatch(editSubcategory({ type, category: cat, oldSub: sub, newSub: subEditValue }));
                                                    setEditingSub({ cat: null, sub: null });
                                                }}
                                                className="bg-green-600 text-white px-3 rounded"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingSub({ cat: null, sub: null })}
                                                className="text-gray-500"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <span>{sub}</span>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => {
                                                        setEditingSub({ cat, sub });
                                                        setSubEditValue(sub);
                                                    }}
                                                    className="text-blue-500 hover:underline text-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => dispatch(deleteSubcategory({ type, category: cat, sub }))}
                                                    className="text-red-400 hover:underline text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Add Subcategory */}
                        {selectedCategory === cat ? (
                            <div className="flex space-x-2 mt-2">
                                <input
                                    type="text"
                                    value={newSub}
                                    onChange={(e) => setNewSub(e.target.value)}
                                    placeholder="New Subcategory"
                                    className="flex-1 border p-2 rounded dark:bg-gray-700 dark:text-gray-200"
                                />
                                <button onClick={handleAddSub} className="bg-green-600 text-white px-4 rounded">
                                    Add
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setSelectedCategory(cat)}
                                className="mt-2 text-blue-500 hover:underline text-sm"
                            >
                                + Add Subcategory
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
