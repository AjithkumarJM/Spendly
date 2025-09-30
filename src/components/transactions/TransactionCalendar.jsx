import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function TransactionCalendar({ filtered, currency }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                height="auto"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,dayGridWeek,dayGridDay",
                }}
                titleFormat={{ year: "numeric", month: "long" }}
                events={filtered.map((tx) => ({
                    id: tx.id,
                    title: `${tx.category}${tx.subcategory ? " → " + tx.subcategory : ""}: ${tx.type === "Expense" ? "-" : "+"}${currency} ${tx.amount} ${tx.time}`,
                    start: `${tx.date}T${tx.time || "00:00"}`,
                    color: tx.type === "Expense" ? "#fee2e2" : "#dcfce7",
                    textColor: tx.type === "Expense" ? "#e11d48" : "#059669",
                }))}
            />
        </div>
    );
}
