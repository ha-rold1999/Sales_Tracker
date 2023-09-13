import React from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";
import { useQuery } from "react-query";
import { GetItemProfitReport } from "../../Utility/APICalls";

export default function ItemProfitStatistics() {
  const { data, isLoading, isSuccess } = useQuery(
    ["itemsProfit"],
    async () => await GetItemProfitReport()
  );
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={300} height={100}>
        <Pie dataKey="total" data={data} outerRadius={80} fill="green" />
        <Tooltip formatter={(value, name) => [value, name]} />
      </PieChart>
    </ResponsiveContainer>
  );
}
