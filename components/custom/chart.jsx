import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer } from "recharts";
import { Tabs, TabsList } from "@radix-ui/react-tabs";
import { TabsTrigger } from "../ui/tabs";
import { BarChart2, LucideTrendingUp } from "lucide-react";
import ChatsBarChart from "./bar-chart";
import ChatsAreaChart from "./area-chart";

export default function ChatsChart({ data }) {
  const [chartType, setChartType] = useState("col");
  return (
    <Card className="w-full">
      <CardHeader className="mb-4 ">
        <div className="flex justify-between items-center">
          <span className=" font-semibold tracking-tight">
            Sohbetler ve Telefon Numaraları
          </span>
          <Tabs value={chartType} onValueChange={setChartType}>
            <TabsList className="bg-muted rounded-md p-0.5">
              <TabsTrigger value="col" className="">
                <BarChart2 size={20} />
              </TabsTrigger>
              <TabsTrigger value="area">
                <LucideTrendingUp size={20} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="pl-0 pr-4">
        {chartType === "col" ? (
          <ChatsBarChart key="col" data={data} />
        ) : (
          <ChatsAreaChart key="area" data={data} />
        )}
      </CardContent>
    </Card>
  );
}
