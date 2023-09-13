import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function ProfitStatistics({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <CartesianGrid stroke="grey" strokeWidth={2} className="bg-red-500" />
        <Line
          type="monotone"
          dataKey="sale"
          stroke="blue"
          strokeWidth={3}
          onClick={(data, index) => console.log(data)}
        />

        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
