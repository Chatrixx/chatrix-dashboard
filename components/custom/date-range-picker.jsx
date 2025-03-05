"use client";

import * as React from "react";
import {
  addDays,
  format,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { tr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const presets = [
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

export function DatePickerWithRange({ className }) {
  const [date, setDate] = React.useState({
    from: presets[3].from,
    to: presets[3].to,
  });

  const preset = React.useMemo(() => {
    if (!date || !date?.to || !date?.from) return null;
    return presets.find((p) => {
      return (
        format(p.from, "LLL dd, y", { locale: tr }) ===
          format(date.from, "LLL dd, y", { locale: tr }) &&
        format(p.to, "LLL dd, y", { locale: tr }) ===
          format(date.to, "LLL dd, y", { locale: tr })
      );
    });
  }, [date]);

  React.useEffect(() => {
    console.log(preset);
  }, [preset]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"secondary"}
            className={cn(
              "flex items-center gap-4 ",
              !date && "text-muted-foreground",
            )}
          >
            {preset && <span>{preset.label}</span>}
            {!preset && date?.from ? (
              date.to ? (
                <span>
                  {format(date.from, "LLL dd, y", { locale: tr })} -{" "}
                  {format(date.to, "LLL dd, y", { locale: tr })}
                </span>
              ) : (
                <span>{format(date.from, "LLL dd, y", { locale: tr })}</span>
              )
            ) : (
              <span>{presets.label}</span>
            )}
            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 flex " align="start">
          <PresetDateRange setDate={setDate} selectedPreset={preset} />
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            weekStartsOn={1}
            locale={tr}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function PresetDateRange({ setDate, selectedPreset }) {
  return (
    <div className="flex flex-col gap-2 mb-4 p-2 ">
      {presets.map((preset) => {
        const isSelected = selectedPreset
          ? selectedPreset.label === preset.label
          : false;
        return (
          <Button
            key={preset.label}
            variant={isSelected ? "secondary" : "ghost"}
            className="justify-start"
            onClick={() => {
              setDate({ from: preset.from, to: preset.to });
            }}
          >
            {preset.label}
          </Button>
        );
      })}
    </div>
  );
}

export default DatePickerWithRange;
