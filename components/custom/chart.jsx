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
  { id: "chatsGradient", start: "#4CAF50", end: "#C8E6C9" },
  { id: "phoneNumbersGradient", start: "#FF9800", end: "#FFC107" },
];

const CustomChart = () => {
  return (
    <Card className="w-full p-4 shadow-lg">
      <CardHeader>
        <CardTitle>Chat and Phone Number Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis>
              <Label
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
              >
                Count
              </Label>
            </YAxis>
            <Tooltip />
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
                      <stop offset="0%" stopColor="#4CAF50" stopOpacity={1} />
                      <stop
                        offset="100%"
                        stopColor="#C8E6C9"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="phoneNumbersGradient"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#FF9800" stopOpacity={1} />
                      <stop
                        offset="100%"
                        stopColor="#FFC107"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill="url(#chatsGradient)"
                    stroke="#4CAF50"
                    strokeWidth={2}
                    rx={5}
                    ry={5}
                  />
                  <rect
                    x={x}
                    y={y + height * 0.3}
                    width={width}
                    height={height * 0.7}
                    fill="url(#phoneNumbersGradient)"
                    stroke="#FF9800"
                    strokeWidth={2}
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
