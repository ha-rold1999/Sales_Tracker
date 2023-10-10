import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { UpdateItemAPI } from "../Utility/APICalls";

function useUpdateItem() {
  const queryClient = useQueryClient();

  const updateItemMutation = useMutation(
    ({ data, itemName, stock, buyingPrice, sellingPrice }) =>
      UpdateItemAPI({ data, itemName, stock, buyingPrice, sellingPrice }),
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
          text: "This is on us, we are working on it.",
        });
      },
      onSuccess: () => {
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Item updated",
          showConfirmButton: false,
          timer: 1500,
        });
        queryClient.invalidateQueries(["items"]);
      },
    }
  );

  const handleUpdateItem = async (watch, data, navigate) => {
    const itemName = watch("itemName");
    const stock = watch("stock");
    const buyingPrice = watch("buyingPrice");
    const sellingPrice = watch("sellingPrice");

    try {
      await updateItemMutation.mutateAsync({
        data,
        itemName,
        stock,
        buyingPrice,
        sellingPrice,
      });
      navigate("/inventory");
    } catch (error) {
      console.error(error);
    }
  };

  return { handleUpdateItem };
}

export default useUpdateItem;
