import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function ChatsAreaChart({ data }) {
  return (
    <Card className="w-full">
      <CardHeader className="mb-4 font-semibold tracking-tight">
        Sohbetler ve Telefon Numaraları
      </CardHeader>
      <CardContent className="pl-0 pr-4">
        <ResponsiveContainer className="min-h-[400px]">
          <AreaChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} opacity={0.2} />

            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2A87F8" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#2A87F8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00a5ad" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#00a5ad" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              local="tr"
              tickLine={false}
              tickMargin={10}
              style={{
                fontSize: "0.72rem",
                color: "#6B7280",
              }}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              style={{
                fontSize: "0.72rem",
                color: "#6B7280",
              }}
              tickLine={false}
              axisLine={false}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="natural"
              dataKey="chats"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="natural"
              dataKey="phoneNumbers"
              stroke="#2A87F8"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
