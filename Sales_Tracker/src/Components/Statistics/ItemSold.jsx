import React from "react";
import { useQuery } from "react-query";
import {
  GetStoreTotalItemsSold,
  GetStoreAverageItemsSold,
} from "../../Utility/APICalls";

function ItemSold({ id }) {
  const {
    data: totalSold,
    isLoading: totalSoldLoading,
    isSuccess: totalSoldSuccess,
    isError: totalSoldError,
  } = useQuery(["itemSold"], () => GetStoreTotalItemsSold(id));

  const {
    data: averangeSold,
    isLoading: averangeSoldLoading,
    isSuccess: averangeSoldSuccess,
    isError: averangeSoldError,
  } = useQuery(["itemAvearageSold"], () => GetStoreAverageItemsSold(id));
  return (
    <div className="w-1/3  border-black border-2 rounded-lg p-1 space-y-1">
      <div className="w-full h-1/2 ">
        <div className="w-full flex justify-center">Total Sold </div>
        <div className="flex justify-center items-center w-full h-1/2  text-xl">
          {totalSoldSuccess && totalSold}
          {totalSoldLoading && "Loading..."}
          {totalSoldError && "Something went wrong"}
        </div>
      </div>
      <div className="w-full h-1/2 ">
        <div className="w-full flex justify-center">Sold Average</div>
        <div className="flex justify-center items-center w-full h-1/2  text-xl">
          {averangeSoldSuccess && averangeSold.toFuixed(2)}
          {averangeSoldLoading && "Loading..."}
          {averangeSoldError && "Something went wrong"}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ItemSold, (prev, next) => {
  return prev.id === next.id;
});
