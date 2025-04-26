import {
  addDays,
  format,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { tr } from "date-fns/locale";

export function getReadableDate(dateInput) {
  const now = new Date();
  const postDate = new Date(dateInput);

  const isToday = now.toDateString() === postDate.toDateString();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = yesterday.toDateString() === postDate.toDateString();

  const options = { hour: "2-digit", minute: "2-digit", hour12: false };

  if (isToday) {
    return `Bugün ${postDate.toLocaleTimeString("tr-TR", options)}`;
  } else if (isYesterday) {
    return `Dün ${postDate.toLocaleTimeString("tr-TR", options)}`;
  } else {
    const dateOptions = { day: "numeric", month: "long", year: "numeric" };
    return `${postDate.toLocaleDateString("tr-TR", dateOptions)}`;
  }
}

export function getDateRangePresets() {
  return [
    { label: "Bugün", from: new Date(), to: new Date(), value: "today" },
    {
      label: "Dün",
      from: addDays(new Date(), -1),
      to: addDays(new Date(), -1),
      value: "yesterday",
    },
    {
      label: "Bu Hafta",
      from: startOfWeek(new Date(), { weekStartsOn: 1 }),
      to: new Date(),
      value: "this-week",
    },
    {
      label: "Bu Ay",
      from: startOfMonth(new Date()),
      to: new Date(),
      value: "this-month",
    },

    {
      label: "Bu Yıl",
      from: startOfYear(new Date()),
      to: new Date(),
      value: "this-year",
    },
  ];
}

export function getDateRangeString({ from, to }) {
  const matchingPreset =
    from && to
      ? getDateRangePresets().find((p) => {
          return (
            format(p.from, "LLL dd, y", { locale: tr }) ===
              format(from, "LLL dd, y", { locale: tr }) &&
            format(p.to, "LLL dd, y", { locale: tr }) ===
              format(to, "LLL dd, y", { locale: tr })
          );
        })
      : null;
  if (matchingPreset) return matchingPreset.label;
  return `${format(from, "LLL dd, y", { locale: tr })} - ${to ? format(to, "LLL dd, y", { locale: tr }) : ""}`;
}
