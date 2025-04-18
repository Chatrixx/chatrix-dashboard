import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function CustomChart({ data }) {
  return (
    <ResponsiveContainer className="w-full min-h-[280px]">
      <BarChart
        compact
        barGap={0}
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
        />
        <YAxis
          style={{
            fontSize: "0.72rem",
            color: "#6B7280",
          }}
          tickLine={false}
          axisLine={false}
        />
        <Legend />
        <Bar
          animationBegin={2}
          dataKey="chats"
          name="Chats"
          fill="url(#chatsGradient)"
          barSize={36}
          shape={({ x, y, width, height, payload }) => (
            <g>
              <defs>
                <linearGradient id="chatsGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#b0d2fd" />
                  <stop offset="100%" stopColor="#b0d2fd" />
                </linearGradient>
                <linearGradient
                  id="phoneNumbersGradient"
                  x1="0"
                  x2="1"
                  y1="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#2a87f8" />
                  <stop offset="100%" stopColor="#2a87f8 " />
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
                className="cursor-pointer"
                x={x}
                y={y + height * (1 - payload.ratio)}
                width={width}
                height={height * payload.ratio * 1}
                fill="url(#phoneNumbersGradient)"
                rx={5}
                ry={5}
              />
            </g>
          )}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
