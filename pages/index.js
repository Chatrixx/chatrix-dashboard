/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import DatePickerWithRange from "@/components/custom/date-range-picker";
import RatioPieChart from "@/components/custom/pie-chart";
import { useCallback, useEffect, useMemo, useState } from "react";
import ChatsChart from "@/components/custom/chart";
import { tr } from "date-fns/locale";

import { format } from "date-fns";
import { getDateRangePresets, getDateRangeString } from "@/util/date";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image";
import api from "@/lib/api";
import { CHANNELS } from "@/constants/channels";

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

  const [analytics, setAnalytics] = useState(null);

  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setAnalyticsLoading(true);
      setAnalyticsError(null);
      const res = await api.get("/dashboard/analytics", {
        params: {
          startDate: date.from,
          endDate: date.to,
          channel: CHANNELS.INSTAGRAM,
          groupBy,
        },
      });
      setAnalytics(res.data);
    } catch (error) {
      setAnalyticsError(error);
    } finally {
      setAnalyticsLoading(false);
    }
  }, [date, groupBy]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  useEffect(() => {
    if (preset && preset.value === "this-year") {
      setGroupBy("month");
    }
  }, [preset]);

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-6"></h2>
        <DatePickerWithRange
          preset={preset}
          date={date}
          onDateChange={setDate}
          dateRangeString={dateRangeString}
        />
      </div>
      {analyticsLoading && <p>Loading...</p>}
      {!analyticsLoading && !analyticsError && analytics && (
        <div className="grid grid-cols-12 gap-4 animate-fade-in">
          <div className="grid grid-rows-12 col-span-2 gap-4 h-full">
            <Card className="basis p-4 pb-6 row-span-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium mt-2 text-foreground">
                  Mesajlar
                </h3>
                <Image
                  unoptimized
                  className="w-5 h-5"
                  width={30}
                  height={30}
                  src="/instagram.png"
                />
              </div>
              <div className="flex gap-4 place-items-baseline flex-wrap">
                <h3 className="text-4xl font-semibold mt-2">
                  {analytics.data.total_messengers}
                </h3>
                <Badge className="border-[0.5px] border-dashed border-teal-700/20 outline-1 flex items-center gap-1 pointer-events-none bg-gradient-to-tr from-teal-50 to-teal-50 text-teal-900">
                  <ArrowUp size={14} /> 12%
                </Badge>
              </div>
            </Card>
            <Card className="basis p-4 pb-6 row-span-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium mt-2 text-foreground">
                  Yorumlar
                </h3>
                <Image
                  unoptimized
                  className="w-5 h-5"
                  width={30}
                  height={30}
                  src="/instagram.png"
                />
              </div>
              <div className="flex gap-4 place-items-baseline flex-wrap">
                <h3 className="text-4xl font-semibold mt-2">213</h3>
                <Badge className="border-[0.5px] border-dashed border-red-700/20 outline-1 flex items-center gap-1 pointer-events-none bg-gradient-to-tr from-red-50 to-red-50 text-red-900">
                  <ArrowDown size={14} /> 2%
                </Badge>
              </div>
            </Card>
            <Card className="basis p-4 pb-6 row-span-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium mt-2 text-foreground">
                  Post Yanıtları
                </h3>
                <Image
                  unoptimized
                  className="w-5 h-5"
                  width={30}
                  height={30}
                  src="/instagram.png"
                />
              </div>
              <h3 className="text-4xl font-semibold mt-2">213</h3>
            </Card>
          </div>
          <div className="col-span-4 h-full">
            <RatioPieChart
              dateRangeString={dateRangeString}
              data={{
                total: analytics.data.total_messengers,
                total_phone_numbers: analytics.data.total_phone_numbers_given,
                ratio: analytics.data.total_phone_ratio,
              }}
            />
          </div>
          <div className="col-span-6">
            <ChatsChart
              data={analytics.data.data_series.map((serie) => ({
                day: serie.date.split("-")[2],
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
