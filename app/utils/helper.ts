import dayjs from "dayjs";

export function formatDate(date?: string | Date): string {
  if (!date) return "";

  const d = dayjs(date);
  if (!d.isValid()) return "";

  return d.format("DD/MM/YYYY");
}

export function formatDateForInput(dateString: string | Date): string {
  return dayjs(dateString).format("YYYY-MM-DDTHH:mm");
}
