"use client";
import React, { useEffect } from "react";
import { useCartContext } from "@/context/CartContext";
import { LineItem } from "@wix/ecom/build/es/src/ecom-v1-order.types";
import EmptyCart from "@/app/cart/EmptyCart";
import Cart from "@/app/cart/Cart";

export default function Page() {
  const { cart, items, updateLineItem, removeLineItem } = useCartContext();
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

  return !cart || items?.length === 0 ? (
    <EmptyCart />
  ) : (
    <Cart
      setCurrentItem={setCurrentItem}
      inputChangeHandler={inputChangeHandler}
      changeHandler={changeHandler}
    />
  );
}
