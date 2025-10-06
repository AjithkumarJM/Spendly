export function formatK(num) {
    if (Math.abs(num) >= 1000) {
        return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'k';
    }
    return num;
}
