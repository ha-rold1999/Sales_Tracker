import React from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

export default function PieStatistics({ data }) {
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={300} height={100}>
        <Pie
          dataKey="total"
          data={data}
          outerRadius={80}
          stroke="black"
          strokeWidth={2}>
          {data?.map((entry, index) => (
            <Cell key={index} fill={getRandomColor()}>
              {entry.name}
            </Cell>
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [value, name]} />
      </PieChart>
    </ResponsiveContainer>
  );
}
