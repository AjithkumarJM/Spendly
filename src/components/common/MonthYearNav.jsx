import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MonthYearNav({
    label,
    onPrev,
    onNext,
    className = "",
}) {
    return (
        <div className={`flex items-center space-x-3 mb-4 justify-center ${className}`}>
            <button
                onClick={onPrev}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
                <ChevronLeft />
            </button>
            <span className="font-medium min-w-[120px] text-center">{label}</span>
            <button
                onClick={onNext}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
                <ChevronRight />
            </button>
        </div>
    );
}
