"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar1, ChevronDown } from "lucide-react";
import { tr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getDateRangePresets } from "@/util/date";

export function DatePickerWithRange({
  preset,
  date,
  className,
  onDateChange,
  dateRangeString,
  renderTrigger,
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          {renderTrigger ? (
            renderTrigger(dateRangeString)
          ) : (
            <Button
              id="date"
              variant={"secondary"}
              className={cn(
                "flex items-center gap-2 bg-card   border border-border/25 shadow",
                !date && "text-muted-foreground",
              )}
            >
              <ChevronDown />
              <span>{dateRangeString}</span>
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 flex " align="start">
          <PresetsList setDate={onDateChange} selectedPreset={preset} />
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateChange}
            numberOfMonths={2}
            weekStartsOn={1}
            locale={tr}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function PresetsList({ setDate, selectedPreset }) {
  return (
    <div className="flex flex-col gap-2 mb-4 p-2 ">
      {getDateRangePresets().map((preset) => {
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
