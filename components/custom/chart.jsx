import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Pazartesi", chats: 300, phoneNumbers: 30 },
  { day: "Sali", chats: 140, phoneNumbers: 50 },
  { day: "Wednesday", chats: 210, phoneNumbers: 40 },
  { day: "Wednesday", chats: 120, phoneNumbers: 40 },
  { day: "Wednesday", chats: 330, phoneNumbers: 40 },
  { day: "Wednesday", chats: 330, phoneNumbers: 40 },
  { day: "Wednesday", chats: 330, phoneNumbers: 40 },
  { day: "Wednesday", chats: 330, phoneNumbers: 40 },

  { day: "Wednesday", chats: 330, phoneNumbers: 40 },

  { day: "Wednesday", chats: 210, phoneNumbers: 40 },
  { day: "Wednesday", chats: 120, phoneNumbers: 40 },
];

const CustomChart = () => {
  return (
    <Card className="w-full">
      <CardHeader className="mb-4">
        <span className=" font-semibold tracking-tight">
          Sohbetler ve Telefon Numaraları
        </span>
      </CardHeader>
      <CardContent className="pl-0 pr-4">
        <ResponsiveContainer className="min-h-[400px]">
          <BarChart
            compact
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} opacity={0.2} />
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
            ></YAxis>
            <Legend />
            <Bar
              dataKey="chats"
              name="Chats"
              fill="url(#chatsGradient)"
              barSize={50}
              shape={({ x, y, width, height }) => (
                <g>
                  <defs>
                    <linearGradient
                      id="chatsGradient"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#e6f1ff" />
                      <stop offset="100%" stopColor="#e6f1ff" />
                    </linearGradient>
                    <linearGradient
                      id="phoneNumbersGradient"
                      x1="0"
                      x2="1"
                      y1="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#0F71F2" stopOpacity={1} />
                      <stop offset="200%" stopColor="#0F71F2 " />
                    </linearGradient>
                  </defs>
                  <rect
                    className="cursor-pointer"
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill="url(#chatsGradient)"
                    rx={5}
                    ry={5}
                  />
                  <rect
                    className=" cursor-pointer"
                    x={x}
                    y={y + height * 0.3}
                    width={width}
                    height={height * 0.7}
                    fill="url(#phoneNumbersGradient)"
                    rx={5}
                    ry={5}
                  />
                </g>
              )}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CustomChart;
