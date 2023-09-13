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

export default function IncomeStatistics({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <CartesianGrid stroke="grey" strokeWidth={2} className="bg-red-500" />
        <Line type="monotone" dataKey="sale" stroke="green" strokeWidth={3} />

        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
