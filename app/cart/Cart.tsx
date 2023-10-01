import React from "react";
import { useCartContext } from "@/context/CartContext";
import { LineItem } from "@wix/ecom/build/es/src/ecom-v1-order.types";
import { imageConvertor } from "@/util/imageConvertor";
import Image from "next/image";

interface CartProps {
  setCurrentItem: React.Dispatch<React.SetStateAction<LineItem | undefined>>;
  inputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeHandler: (increment: boolean) => void;
}

export default function Cart({
  setCurrentItem,
  inputChangeHandler,
  changeHandler,
}: CartProps) {
  const { cart, addToCart, total, items, updateLineItem, removeLineItem } =
    useCartContext();
  return (
    <div className="bg-gray-50 h-full py-20 rounded">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4 text-purple-700 text-center">
          Shopping Cart
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">Product</th>
                    <th className="text-left font-semibold">Price</th>
                    <th className="text-left font-semibold">Quantity</th>
                    <th className="text-left font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items?.map((item, index) => (
                    <tr key={index}>
                      <td className="py-4">
                        <div className="flex items-center">
                          <Image
                            className="h-16 w-16 mr-4"
                            src={imageConvertor(item.image!)}
                            alt="Product image"
                            width={64}
                            height={64}
                          />
                          <span className="font-semibold">
                            {item?.productName.original}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">{item?.price?.formattedAmount}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <button
                            className="border rounded-md py-2 px-4 mr-2"
                            onClick={() => {
                              setCurrentItem(item);
                              changeHandler(false);
                            }}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="text-center w-11 placeholder-gray-900 focus:ring-2 focus:outline-none focus:ring-purple-900"
                            placeholder={item?.quantity + ""}
                            id={item?._id + ""}
                            onChange={inputChangeHandler}
                          />

                          <button
                            className="border rounded-md py-2 px-4 ml-2"
                            onClick={() => {
                              setCurrentItem(item);
                              changeHandler(true);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4">
                        $
                        {Number(
                          (item?.price?.amount * item?.quantity).toFixed(2),
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${total}</span>
              </div>
              <button className="bg-purple-800 text-white py-2 px-4 rounded-lg mt-4 w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
