import { useMemo } from 'react';

export const useSortedData = <T>(
  data: T[],
  sortColumn: keyof T | null,
  sortAsc: boolean
): T[] => {
  const sorted = useMemo(() => {
    if (!sortColumn) return data;

    const compare = (a: T, b: T) => {
      const valA = a[sortColumn];
      const valB = b[sortColumn];

      const isDate = typeof valA === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(valA as string);
      if (isDate) {
        const dateA = new Date((valA as string).split('/').reverse().join('/'));
        const dateB = new Date((valB as string).split('/').reverse().join('/'));
        return sortAsc ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortAsc
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return 0;
    };

    return [...data].sort(compare);
  }, [data, sortColumn, sortAsc]);

  return sorted;
};
