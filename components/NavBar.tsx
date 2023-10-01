"use client";
import React from "react";
import Link from "next/link";
import CartSidebar from "@/components/CartSidebar";
import { useCartContext } from "@/context/CartContext";

export default function NavBar() {
  const [showCart, setShowCart] = React.useState(false);
  const { items, totalQuantity } = useCartContext();
  const toggleCart = () => setShowCart((prevState) => !prevState);
  return (
    <nav className="bg-white text-purple-700 fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <CartSidebar toggleCart={toggleCart} showCart={showCart} />

      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="self-center text-2xl font-semibold whitespace-nowrap">
          <Link href="/" className="flex items-center">
            {process.env.SITE_NAME || "Logo"}
          </Link>
        </div>
        <div className="flex md:order-2 relative">
          <button
            onClick={toggleCart}
            type="button"
            className="text-gray-700 bg-white hover:bg-purple-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
              fill="currentColor"
              className="w-6 h-5 mr-2 -ml-1"
            >
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
            </svg>
            My Cart
          </button>
          {totalQuantity > 0 && (
            <div className="absolute top-0 right-0 bg-purple-500 text-white w-6 h-6 flex items-center justify-center rounded-full">
              {totalQuantity}
            </div>
          )}
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        ></div>
      </div>
    </nav>
  );
}
