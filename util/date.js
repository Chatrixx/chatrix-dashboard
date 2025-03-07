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
    return `${postDate.toLocaleDateString(
      "tr-TR",
      dateOptions,
    )} ${postDate.toLocaleTimeString("tr-TR", options)}`;
  }
}

export function getDateRangePresets() {
  return [
    { label: "Bugün", from: new Date(), to: new Date() },
    {
      label: "Dün",
      from: addDays(new Date(), -1),
      to: addDays(new Date(), -1),
    },
    {
      label: "Bu Hafta",
      from: startOfWeek(new Date(), { weekStartsOn: 1 }),
      to: new Date(),
    },
    { label: "Bu Ay", from: startOfMonth(new Date()), to: new Date() },

    { label: "Bu Yıl", from: startOfYear(new Date()), to: new Date() },
    {
      label: "Tüm Zamanlar",
      from: addDays(new Date(), -365 * 10),
      to: new Date(),
    },
  ];
}

export function getDateRangeString({ from, to }) {
  const matchingPreset = getDateRangePresets().find((p) => {
    return (
      format(p.from, "LLL dd, y", { locale: tr }) ===
        format(from, "LLL dd, y", { locale: tr }) &&
      format(p.to, "LLL dd, y", { locale: tr }) ===
        format(to, "LLL dd, y", { locale: tr })
    );
  });
  if (matchingPreset) return matchingPreset.label;
  return `${format(from, "LLL dd, y", { locale: tr })} - ${format(to, "LLL dd, y", { locale: tr })}`;
}
