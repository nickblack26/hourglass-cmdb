import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type GroupedItem<T> = {
  [key: string]: T[];
};

export function groupBy<T>(xs: T[], key: keyof T): GroupedItem<T> {
  return xs.reduce((rv: GroupedItem<T>, x: T) => {
    const keyValue = x[key];
    const groupKey = String(keyValue);

    if (!rv[groupKey]) {
      rv[groupKey] = [];
    }
    rv[groupKey].push(x);

    return rv;
  }, {});
}