"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Cart } from "@wix/ecom/build/es/src/ecom-v1-cart-cart.types";
import { useWixClientContext } from "@/context/WixClientContext";
import { LineItem } from "@wix/ecom/build/es/src/ecom-v1-order.types";

interface CartContextProps {
  cart: Cart | undefined;
  setCart: Dispatch<SetStateAction<Cart | undefined>>;
  total?: number;
  setTotal?: Dispatch<SetStateAction<number | undefined>>;
  items?: LineItem[];
  setItems?: Dispatch<SetStateAction<LineItem[] | undefined>>;
  addToCart?: (products: { prodId: string; quantity: number }[]) => void;
  getProductFromCart?: (prodId: string) => Promise<Cart["lineItems"][0]>;
  updateLineItem?: (
    lines: {
      id: string;
      quantity: number;
    }[],
  ) => void;
  removeLineItem?: (lineItemIds: string[]) => void;
  totalQuantity?: number;
}

const CartContext = createContext<CartContextProps>({
  cart: undefined,
  setCart: () => {},
  total: 0,
  setTotal: () => {},
  items: [],
  setItems: () => {},
  addToCart: () => {},
  getProductFromCart: () => Promise.resolve(undefined),
  updateLineItem: () => {},
  removeLineItem: () => {},
  totalQuantity: 0,
});

export function CartContextProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { wixClient } = useWixClientContext();
  const [cart, setCart] = useState<Cart | undefined>(undefined);
  const [total, setTotal] = useState<number | undefined>(0);
  const [items, setItems] = useState<LineItem[] | undefined>([]);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  const getCurrentCart = async () => {
    try {
      const curCart = await wixClient.currentCart.getCurrentCart();
      setCart(curCart);
    } catch (e) {
      setCart(undefined);
    }
  };

  const addToCart = async (
    products: {
      prodId: string;
      quantity: number;
    }[],
  ) => {
    console.log(products);
    const { cart } = await wixClient.currentCart.addToCurrentCart({
      lineItems: products.map((product) => ({
        catalogReference: {
          appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e",
          catalogItemId: product.prodId,
        },
        quantity: product.quantity,
      })),
    });
    setCart(cart);
  };

  const getProductFromCart = async (prodId: string) => {
    try {
      const product = cart?.lineItems?.find(
        (product) => product.catalogReference?.catalogItemId === prodId,
      );
      return product;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  };

  const updateLineItem = async (
    lines: {
      id: string;
      quantity: number;
    }[],
  ) => {
    try {
      const lineItems = lines?.map((line) => ({
        _id: line.id,
        quantity: line.quantity,
      }));
      const { cart } =
        await wixClient.currentCart.updateCurrentCartLineItemQuantity(
          lineItems,
        );
      setCart(cart);
    } catch (e) {
      console.log(e);
    }
  };

  const removeLineItem = async (lineItemIds: string[]) => {
    const { cart } = await wixClient.currentCart.removeLineItemsFromCurrentCart(
      lineItemIds,
    );
    setCart(cart);
  };

  useEffect(() => {
    getCurrentCart();
  }, []);

  useEffect(() => {
    if (cart) {
      const total = cart.lineItems.reduce(
        (acc, lineItem) => acc + lineItem.quantity * lineItem.price.amount,
        0,
      );
      setTotal(Number(total.toFixed(2)));
    }
    const totalQuantity: number =
      cart?.lineItems.reduce((acc, lineItem) => acc + lineItem.quantity, 0) ||
      0;
    setItems(cart?.lineItems);
    setTotalQuantity(totalQuantity);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        total,
        setTotal,
        items,
        setItems,
        addToCart,
        getProductFromCart,
        updateLineItem,
        removeLineItem,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }

  return context;
}
