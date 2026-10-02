import { APP_TODAY } from "./rules";

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function utcDate(isoDate: string): Date {
  return new Date(`${isoDate}T00:00:00Z`);
}

export function formatLongDate(isoDate: string): string {
  const date = utcDate(isoDate);
  return `${WEEKDAYS[date.getUTCDay()]}, ${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]}`;
}

export function formatShortDate(isoDate: string): string {
  const date = utcDate(isoDate);
  return `${date.getUTCDate()} ${MONTHS_SHORT[date.getUTCMonth()]}`;
}

export function formatNoticeWhen(isoDate: string): string {
  if (isoDate === APP_TODAY) return "Today";
  const today = utcDate(APP_TODAY);
  today.setUTCDate(today.getUTCDate() - 1);
  const yesterday = today.toISOString().slice(0, 10);
  if (isoDate === yesterday) return "Yesterday";
  return formatShortDate(isoDate);
}

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function initials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}
