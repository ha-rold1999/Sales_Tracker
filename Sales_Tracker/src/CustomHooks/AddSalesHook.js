import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { AddSales } from "../Utility/APICalls";

function useSaveAllSales() {
  const queryClient = useQueryClient();

  const saveSalesMutation = useMutation(
    (salesData) => AddSales({ sales: salesData }),
    {
      onMutate: () => {
        Swal.showLoading();
      },
      onError: (error) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This is on us, we are working on it.",
        });
      },
      onSuccess: () => {
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Sales saved",
          showConfirmButton: false,
          timer: 1500,
        });
        queryClient.invalidateQueries("itemsProfit");
        queryClient.invalidateQueries("itemsSold");
        queryClient.invalidateQueries("profitReport");
        queryClient.invalidateQueries("incomeReport");
        queryClient.invalidateQueries("sales");
        queryClient.invalidateQueries("items");
        queryClient.invalidateQueries("profitSummary");
        queryClient.invalidateQueries("averageSummary");
        queryClient.invalidateQueries("incomeTotal");
        queryClient.invalidateQueries("averageIncome");
      },
    }
  );

  const handleSaveAllSales = async (sales, navigate, setIsSalesExist) => {
    if (sales.length > 0) {
      try {
        // Call 'saveSalesMutation' to save the sales
        await saveSalesMutation.mutateAsync(sales);

        // Set 'isSalesExist' to true if sales were saved successfully
        setIsSalesExist(true);

        // Navigate to the desired location
        navigate("/menu");
      } catch (error) {
        // Handle any errors that may occur during the mutation.
      }
    } else {
      setIsSalesExist(false);
    }
  };

  return { handleSaveAllSales };
}

export default useSaveAllSales;
