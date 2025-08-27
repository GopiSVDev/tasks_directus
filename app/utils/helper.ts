import dayjs from "dayjs";

export function formatDate(date?: string | Date): string {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  if (!(d instanceof Date) || isNaN(d.getTime())) {
    return "";
  }

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatDateForInput(dateString: string | Date): string {
  return dayjs(dateString).format("YYYY-MM-DDTHH:mm");
}
