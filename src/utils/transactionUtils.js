// Utility: group by date
export const groupByDate = (transactions) => {
    return transactions.reduce((acc, tx) => {
        const date = new Date(tx.date).toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
        if (!acc[date]) acc[date] = [];
        acc[date].push(tx);
        return acc;
    }, {});
};

// Utility: group by weeks with date ranges
export const groupByWeeks = (transactions, month, year) => {
    const weeks = {};
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day += 7) {
        const start = new Date(year, month - 1, day);
        const end = new Date(year, month - 1, Math.min(day + 6, daysInMonth));
        const label = `Week ${Math.ceil(day / 7)} (${start.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })})`;

        weeks[label] = transactions.filter((tx) => {
            const d = new Date(tx.date);
            return (
                d >= start &&
                d <= end &&
                d.getMonth() + 1 === month &&
                d.getFullYear() === year
            );
        });
    }

    return weeks;
};
