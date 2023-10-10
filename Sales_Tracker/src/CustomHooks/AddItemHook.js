import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { AddItemExpenses, AddItemCall } from "../Utility/APICalls";

function useAddItemAndExpense() {
  const queryClient = useQueryClient();

  const addItemMutation = useMutation(
    (addItemData) => AddItemCall(addItemData),
    {
      onMutate: () => {
        Swal.showLoading();
      },
      onError: (error) => {
        console.log(error);
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      },
    }
  );

  const addExpenseMutation = useMutation(
    (expenseData) => AddItemExpenses(expenseData),
    {
      onError: () => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This is on us, we are working on it.",
        });
      },
      onSuccess: () => {
        // Mutate the 'items' query here if needed
        queryClient.invalidateQueries(["items"]);
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Item added",
          showConfirmButton: false,
          timer: 1500,
        });
      },
    }
  );

  const handleAddItemAndExpense = async (
    itemName,
    stock,
    buyingPrice,
    sellingPrice,
    navigate
  ) => {
    try {
      const addItemData = {
        itemName,
        stock,
        buyingPrice,
        sellingPrice,
      };

      // Call 'addItemMutation' to add the item
      const addItemResponse = await addItemMutation.mutateAsync(addItemData);

      // Call 'addExpenseMutation' to add expenses
      const expenseData = {
        expenses: { item: addItemResponse, quantity: stock },
      };
      await addExpenseMutation.mutateAsync(expenseData);
      navigate("/inventory");
    } catch (error) {
      console.error(error);
    }
  };

  return { handleAddItemAndExpense };
}

export default useAddItemAndExpense;
