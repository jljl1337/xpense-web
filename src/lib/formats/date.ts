import { DateTime } from "luxon";

export function formatDateFromISO(isoString: string): string {
  return DateTime.fromISO(isoString).toFormat("yyyy-MM-dd HH:mm:ss");
}
