import React from "react";
import "../../Style/style.css";

export default function Sales() {
  return (
    <div className="flex flex-col-2 h-full">
      <div className="h-full w-2/5 px-10 py-5 flex justify-center items-center flex-col">
        <div className="w-full">
          <select className="w-full p-2 text-2xl rounded-lg mb-5">
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <div className="flex justify-center space-x-2">
            <div className="text-3xl font-semibold">Sold</div>
            <input
              className="w-24 text-3xl font-semibold px-2 rounded-lg"
              type="number"
            />
          </div>
          <div className="flex justify-center mt-5">
            <button className="bg-green-500 w-1/2 py-5 text-xl font-bold border-2 border-black rounded-lg">
              Add Sale
            </button>
          </div>
          <div className="flex justify-center mt-10">
            <button className="bg-orange-500 w-full py-5 text-xl font-bold border-2 border-black rounded-lg">
              Save All Sales
            </button>
          </div>
          <div className="mt-12">
            <div className="flex flex-col-2 items-center ">
              <div className="text-xl font-semibold">Total Profit: </div>
              <div className="text-2xl font-bold"> ₱ 0.00</div>
            </div>
            <div className="flex flex-col-2 items-center">
              <div className="text-xl font-semibold">Total Profit: </div>
              <div className="text-2xl font-bold"> ₱ 0.00</div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-3/5 bg-white px-10 py-5 space-y-1 rounded-bl-3xl rounded-tl-3xl border-4 border-black overflow-y-auto hide-scrollbar">
        <div className="text-2xl font-bold">Sales</div>
        <div className="flex flex-col-4 w-full mb-10">
          <div className="w-1/4  flex  text-lg font-bold">Item</div>
          <div className="w-1/4 flex text-lg font-bold">Quantity</div>
          <div className="w-1/4  flex text-lg font-bold">Profit</div>
          <div className="w-1/4 flex  text-lg font-bold">Income</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>

        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">Item</div>
          <div className="w-1/4 flex text-lg">30</div>
          <div className="w-1/4  flex text-lg">10.00</div>
          <div className="w-1/4 flex text-lg">10.00</div>
        </div>
      </div>
    </div>
  );
}
