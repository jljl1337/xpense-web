import { DateTime } from "luxon";

export function formatDateTimeFromISO(isoString: string): string {
  return DateTime.fromISO(isoString).toFormat("yyyy-MM-dd HH:mm:ss");
}

export function formatDateFromISO(isoString: string): string {
  return isoString.substring(0, 10);
}

export function formatDateFromDate(date: Date): string {
  return date.toISOString().substring(0, 10);
}

export function formatUTCMidnightDateTimeFromISO(isoString: string): string {
  const date = new Date(isoString);
  const utcDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  return utcDate.toISOString();
}
