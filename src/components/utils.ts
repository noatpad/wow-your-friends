import { DateTime } from 'luxon';

export const getToday = () => DateTime.now().toLocaleString(DateTime.DATE_MED);

export const formatDate = (dateStr: string): string => (
  DateTime.fromISO(dateStr).toLocaleString(DateTime.DATE_MED)
);

// DateTime objects implement #valueOf using their timestamp, so it is possible to directly compare them with comparators
// https://moment.github.io/luxon/docs/manual/math.html#comparing-datetimes
export const sortByDate = (a: string, b: string): number => {
  const aDate = DateTime.fromISO(a);
  const bDate = DateTime.fromISO(b);
  return aDate < bDate ? -1 : aDate > bDate ? 1 : 0;
};

export const getOrdinalNumber = (x: number): string => {
  if (x >= 4 && x <= 19) return `${x}th`;
  switch (x % 10) {
    case 1: return `${x}st`;
    case 2: return `${x}nd`;
    case 3: return `${x}rd`;
    default: return `${x}th`;
  }
};

export const keyActivateCb = (cb: Function) => (e: KeyboardEvent) => {
  if (['Enter', ' '].includes(e.key)) cb();
};
