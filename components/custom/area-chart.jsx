import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload.reduce((acc, item) => {
      acc[item.dataKey] = item.value;
      return acc;
    }, {});
    return (
      <div className="bg-white border rounded-md p-2 shadow-md text-sm">
        <p className="font-semibold">{label}</p>
        <p>Chats: {data.chats}</p>
        <p>Phone Numbers: {data.phoneNumbers}</p>
        {data.ratio !== undefined && <p>Ratio: {data.ratio.toFixed(2)}</p>}
      </div>
    );
  }

  return null;
};

export default function ChatsAreaChart({ data }) {
  return (
    <ResponsiveContainer className="w-full min-h-[280px]">
      <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} opacity={0.2} />
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2A87F8" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#2A87F8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3A87F8" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#3A87F8" stopOpacity={0} />
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
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="natural"
          dataKey="chats"
          stroke="#8884d844"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="natural"
          dataKey="phoneNumbers"
          stroke="#3A87F844"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
