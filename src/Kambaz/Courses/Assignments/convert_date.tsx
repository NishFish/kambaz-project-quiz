const months: Record<string, string> = {
    "January": "01", "February": "02", "March": "03", "April": "04",
    "May": "05", "June": "06", "July": "07", "August": "08",
    "September": "09", "October": "10", "November": "11", "December": "12"
};

const monthNumbers = Object.fromEntries(Object.entries(months).map(([k, v]) => [v, k]));

/**
 * Converts human-readable datetime format to ISO format.
 * Example: "January 1 at 12:30PM" → "2025-01-01T12:30"
 */
export function convertToISO(dateStr: string): string {
    if (!dateStr) return "";

    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(dateStr)) {
        return dateStr;
    }

    const regex = /(\w+) (\d+) at (\d+):(\d+)(AM|PM)/;
    const match = dateStr.match(regex);
    if (!match) return "";

    let [, month, day, hour, minute, period] = match;
    const monthNum = months[month as keyof typeof months];
    const year = new Date().getFullYear();

    let hourNum = parseInt(hour, 10);
    if (period === "PM" && hourNum !== 12) hourNum += 12;
    if (period === "AM" && hourNum === 12) hourNum = 0;

    return `${year}-${monthNum}-${day.padStart(2, "0")}T${hourNum.toString().padStart(2, "0")}:${minute}`;
}

/**
 * Converts ISO datetime format to human-readable format.
 * Example: "2025-01-01T12:30" → "January 1 at 12:30PM"
 */
export function convertToHumanReadable(dateStr: string): string {
    if (!dateStr) return "";

    if (/(\w+) (\d+) at (\d+):(\d+)(AM|PM)/.test(dateStr)) {
        return dateStr;
    }

    const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/;
    const match = dateStr.match(regex);
    if (!match) return "";

    let [, , month, day, hour, minute] = match;
    const monthName = monthNumbers[month];
    let hourNum = parseInt(hour, 10);
    const period = hourNum >= 12 ? "PM" : "AM";

    if (hourNum > 12) hourNum -= 12;
    if (hourNum === 0) hourNum = 12;

    return `${monthName} ${parseInt(day, 10)} at ${hourNum}:${minute}${period}`;
}
