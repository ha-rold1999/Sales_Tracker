import React from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";
import { useQuery } from "react-query";
import { GetItemSoldReport } from "../../Utility/APICalls";

export default function ItemSoldStatistics() {
  const { data, isLoading, isSuccess } = useQuery(
    ["itemsSold"],
    async () => await GetItemSoldReport()
  );
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={300} height={100}>
        <Pie dataKey="total" data={data} outerRadius={80} fill="orange" />
        <Tooltip formatter={(value, name) => [value, name]} />
      </PieChart>
    </ResponsiveContainer>
  );
}
