import { DateTime } from "luxon";

export function formatDateTimeFromISO(isoString: string): string {
  return DateTime.fromISO(isoString).toFormat("yyyy-MM-dd HH:mm:ss");
}
