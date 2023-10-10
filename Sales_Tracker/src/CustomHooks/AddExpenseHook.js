import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { AddExpenses } from "../Utility/APICalls";

function useSaveAllExpenses() {
  const queryClient = useQueryClient();

  const saveExpensesMutation = useMutation(
    (expensesData) => AddExpenses({ expenses: expensesData }),
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
        queryClient.invalidateQueries(["expenses"]);
        queryClient.invalidateQueries(["items"]);
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Expenses saved",
          showConfirmButton: false,
          timer: 1500,
        });
      },
    }
  );

  const handleSaveAllExpenses = async (
    expenses,
    navigate,
    setIsExpensesExist
  ) => {
    if (expenses.length > 0) {
      try {
        // Call 'saveExpensesMutation' to save the expenses
        await saveExpensesMutation.mutateAsync(expenses);

        // Set 'isExpensesExist' to true if expenses were saved successfully
        setIsExpensesExist(true);

        // Navigate to the desired location
        navigate("/menu");
      } catch (error) {
        // Handle any errors that may occur during the mutation.
      }
    } else {
      setIsExpensesExist(false);
    }
  };

  return { handleSaveAllExpenses };
}

export default useSaveAllExpenses;
