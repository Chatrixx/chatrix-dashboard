/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import DatePickerWithRange from "@/components/custom/date-range-picker";
import RatioPieChart from "@/components/custom/pie-chart";
import { useEffect, useMemo, useState } from "react";
import ChatsChart from "@/components/custom/chart";
import { tr } from "date-fns/locale";
import { format } from "date-fns";
import {
  getDateRangePresets,
  getDateRangeString,
  getReadableDate,
} from "@/util/date";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

import CircleLoader from "@/components/custom/circle-loader";
import useAnalytics from "@/hooks/data/use-analytics";
import MainLayout from "@/components/custom/layout/main-layout";

export default function Home() {
  const [groupBy, setGroupBy] = useState("day");

  const presets = getDateRangePresets();

  const [date, setDate] = useState({
    from: presets[3].from,
    to: presets[3].to,
  });

  const dateRangeString = getDateRangeString({
    from: date?.from,
    to: date?.to,
  });

  const preset = useMemo(() => {
    if (!date || !date?.to || !date?.from) return null;
    return presets.find((p) => {
      return (
        format(p.from, "LLL dd, y", { locale: tr }) ===
          format(date.from, "LLL dd, y", { locale: tr }) &&
        format(p.to, "LLL dd, y", { locale: tr }) ===
          format(date.to, "LLL dd, y", { locale: tr })
      );
    });
  }, [date, presets]);

  const {
    data: analytics,
    isLoading: analyticsLoading,
    isError: analyticsError,
  } = useAnalytics({
    date,
    groupBy,
  });

  useEffect(() => {
    if (preset && preset.value === "this-year") {
      setGroupBy("month");
    }
  }, [preset]);

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <DatePickerWithRange
          preset={preset}
          date={date}
          onDateChange={setDate}
          dateRangeString={dateRangeString}
          renderTrigger={(val) => {
            return (
              <div
                variant="ghost"
                className="pl-2 cursor-pointer hover:opacity-75"
              >
                <div className="flex gap-1.5 items-center">
                  <h1 className="text-3xl font-bold">{val}</h1>
                  <ChevronDown size={24} strokeWidth={2.5} />
                </div>
              </div>
            );
          }}
        />
      </div>
      {analyticsLoading && <CircleLoader />}
      {!analyticsLoading && !analyticsError && analytics && (
        <div className="grid grid-cols-12 gap-4 animate-fade-in">
          <div className="grid grid-rows-12 col-span-2 gap-4 h-full">
            <Card className="basis p-4 pb-6 row-span-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium mt-2 text-foreground">
                  Mesaj Atan Sayısı
                </h3>
                <Image
                  unoptimized
                  className="w-5 h-5"
                  width={30}
                  height={30}
                  src="/channel_images/instagram.png"
                />
              </div>
              <div className="flex gap-4 place-items-baseline flex-wrap">
                <h3 className="text-4xl font-semibold mt-2">
                  {analytics.data?.total_messengers.current}
                </h3>
              </div>
            </Card>
          </div>
          <div className="col-span-4 h-full">
            <RatioPieChart
              dateRangeString={dateRangeString}
              data={{
                total: analytics.data?.total_messengers.current,
                total_phone_numbers:
                  analytics.data?.total_phone_numbers_given.current,
                ratio: analytics.data?.total_phone_ratio,
              }}
            />
          </div>
          <div className="col-span-6">
            <ChatsChart
              data={analytics.data?.data_series.map((serie) => ({
                day: getReadableDate(serie.date),
                chats: serie.totalMessengers,
                phoneNumbers: serie.totalPhoneNumbersGiven,
                ratio: serie.phoneNumberGivingRatio,
              }))}
            />
          </div>
        </div>
      )}
    </div>
  );
}

Home.getLayout = (children) => <MainLayout>{children}</MainLayout>;
