import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

const data = [
  { day: "Monday", chats: 100, phoneNumbers: 30 },
  { day: "Tuesday", chats: 150, phoneNumbers: 50 },
  { day: "Wednesday", chats: 120, phoneNumbers: 40 },
];

const gradientColors = [
  { id: "chatsGradient", start: "#0F71F2", end: "#42cdff" },
  { id: "phoneNumbersGradient", start: "#00cc77", end: "#00cc77" },
];

const CustomChart = () => {
  return (
    <Card className="w-full pt-4">
      <CardHeader>
        <CardTitle>Chats and Phone Numbers</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid
              style={{
                opacity: 0.3,
              }}
              // horizontal
              vertical={false}
            />
            {/* <XAxis dataKey="day" /> */}
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false}></YAxis>
            {/* <Tooltip /> */}
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
                      <stop offset="0%" stopColor="#b9cacf" />
                      <stop offset="100%" stopColor="#b9cacf" />
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
                    className="transition-opacity opacity-65 hover:opacity-100 duration-500 cursor-pointer"
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
