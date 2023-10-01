import React, { useEffect } from "react";
import { useCartContext } from "@/context/CartContext";
import EmptyCart from "@/app/cart/EmptyCart";
import Image from "next/image";
import { imageConvertor } from "@/util/imageConvertor";
import { LineItem } from "@wix/ecom/build/es/src/ecom-v1-order.types";
import Link from "next/link";

export default function CartSidebar({
  toggleCart,
  showCart,
}: {
  toggleCart: () => void;
  showCart: boolean;
}) {
  const { cart, addToCart, total, items, updateLineItem, removeLineItem } =
    useCartContext();
  const handleToggle = () => {
    toggleCart();
  };

  const [currentItem, setCurrentItem] = React.useState<LineItem>();
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const lines = [
      {
        id: e.target.id,
        quantity: e.target.value,
      },
    ];
    updateLineItem!(lines);
  };

  useEffect(() => {
    setCurrentItem((prevState) => {
      return items?.find((item) => item._id === prevState?._id);
    });
  }, [items]);

  const changeHandler = (increment: boolean) => {
    setCurrentItem((prevItem) => {
      if (!prevItem) {
        return null; // Handle the case where currentItem is null
      }

      const updatedQuantity = increment
        ? prevItem.quantity + 1
        : prevItem.quantity - 1;

      if (updatedQuantity === 0) {
        removeLineItem!([prevItem._id]);
        return null;
      }
      const lines = [
        {
          id: prevItem._id,
          quantity: updatedQuantity,
        },
      ];

      updateLineItem!(lines);

      // Return the updated item with the new quantity
      return {
        ...prevItem,
        quantity: updatedQuantity,
      };
    });
  };

  return (
    <div
      className={`top-0 right-0 w-[45vw] bg-gray-50  p-10 pl-20 text-white fixed h-full z-40  ease-in-out duration-500
       shadow-2xl transform
       ${showCart ? "translate-x-0 " : "translate-x-full"}`}
    >
      <button
        className="absolute top-10 right-10 text-purple-700"
        onClick={handleToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 className="mt-20 text-xl text-center font-semibold text-purple-700">
        {!cart || items?.length === 0 ? (
          <EmptyCart />
        ) : (
          <div>
            <h1 className="text-2xl font-semibold text-purple-700 mb-10 flex items-center justify-center">
              Shopping Cart
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 576 512"
                fill="currentColor"
                className="w-6 h-5 ml-1"
              >
                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
              </svg>
            </h1>
            <table className="w-full">
              <thead>
                <tr className="text-base border-b-2 border-purple-700 ">
                  <th className="text-left font-semibold">Product</th>
                  <th className="text-left font-semibold">Price</th>
                  <th className="text-left font-semibold">Quantity</th>
                  <th className="text-left font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {items?.map((item, index) => (
                  <tr key={index} className="border-b-2">
                    <td className="py-4 text-base">
                      <div className="flex items-center text-base">
                        <Image
                          className="h-16 w-16 mr-4 text-base"
                          src={imageConvertor(item.image!)}
                          alt="Product image"
                          width={64}
                          height={64}
                        />
                        <span className="font-semibold text-base">
                          {item?.productName.original}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-base">
                      {item?.price?.formattedAmount}
                    </td>
                    <td className="py-4 text-base">
                      <div className="flex items-center text-base">
                        <button
                          className="border rounded-md py-2 px-4 mr-2 text-base"
                          onClick={() => {
                            setCurrentItem(item);
                            changeHandler(false);
                          }}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="text-center w-11 placeholder-gray-900 focus:ring-2 focus:outline-none focus:ring-purple-900 text-base bg-gray-50"
                          placeholder={item?.quantity + ""}
                          id={item?._id + ""}
                          onChange={inputChangeHandler}
                        />

                        <button
                          className="border rounded-md py-2 px-4 ml-2 text-base"
                          onClick={() => {
                            setCurrentItem(item);
                            changeHandler(true);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 text-base">
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
        )}
      </h2>
      <h2 className="text-xl mt-20 font-semibold text-purple-700 mb-10 flex items-center justify-center">
        Total: ${total}
      </h2>
      <div className="flex justify-center">
        <div className="font-semibold text-xl text-white flex items-center justify-center bg-purple-400 rounded-md py-2 px-4 ml-2 text-base hover:bg-purple-500 transition duration-200 w-48">
          <Link href="/cart" onClick={toggleCart}>
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
