"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
    from: addDays(new Date(), -new Date().getDay()),
    to: new Date(),
  },
  { label: "Son 1 Ay", from: addDays(new Date(), -30), to: new Date() },
  { label: "Son 3 Ay", from: addDays(new Date(), -90), to: new Date() },
  { label: "Son 1 Yıl", from: addDays(new Date(), -365), to: new Date() },
  {
    label: "Tüm Zamanlar",
    from: addDays(new Date(), -365 * 10),
    to: new Date(),
  },
];

export function DatePickerWithRange({ className }) {
  const [date, setDate] = React.useState({
    from: new addDays(Date(), -7),
    to: new Date(),
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
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />

            {preset && <span>{preset.label}</span>}
            {!preset && date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", { locale: tr })} -{" "}
                  {format(date.to, "LLL dd, y", { locale: tr })}
                </>
              ) : (
                format(date.from, "LLL dd, y", { locale: tr })
              )
            ) : (
              <span>{presets.label}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 flex " align="start">
          <PresetDateRange setDate={setDate} />
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

function PresetDateRange({ setDate }) {
  return (
    <div className="flex flex-col gap-2 mb-4 bg-slate-400 p-2 ">
      {presets.map((preset) => (
        <Button
          key={preset.label}
          variant="ghost"
          className="justify-start"
          onClick={() => {
            setDate({ from: preset.from, to: preset.to });
          }}
        >
          {preset.label}
        </Button>
      ))}
    </div>
  );
}

export default DatePickerWithRange;
