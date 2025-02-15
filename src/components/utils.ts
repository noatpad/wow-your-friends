import { DateTime } from "luxon";

export const formatDate = (dateStr: string): string =>
  DateTime.fromISO(dateStr).toLocaleString(DateTime.DATE_MED);

export const getToday = (): string => formatDate(process.env.UPDATE_DATE);

// DateTime objects implement #valueOf using their timestamp, so it is possible to directly compare them with comparators
// https://moment.github.io/luxon/docs/manual/math.html#comparing-datetimes
export const sortByDate = (a: string, b: string): number => {
  const aDate = DateTime.fromISO(a);
  const bDate = DateTime.fromISO(b);
  return aDate < bDate ? -1 : aDate > bDate ? 1 : 0;
};

export const getOrdinalSuffix = (x: number): string => {
  if (x % 100 >= 11 && x % 100 <= 13) return "th";

  switch (x % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const keyActivateCb = (cb: Function) => (e: KeyboardEvent) => {
  if (["Enter", " "].includes(e.key)) cb();
};
