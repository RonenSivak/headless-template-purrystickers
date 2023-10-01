import React from "react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="text-center mt-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="3em"
        viewBox="0 0 576 512"
        fill="currentColor"
        className="mx-auto w-16 h-16 text-gray-500"
      >
        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
      </svg>
      <h2 className="text-2xl mt-4 text-gray-700 font-semibold">
        Your cart is empty
      </h2>
      <p className="text-gray-500 mt-2">
        Explore our products and add items to your cart.
      </p>
      <Link
        href="/"
        className="text-purple-700 mt-4 block font-semibold flex items-center justify-center"
      >
        <span className="mr-2">Continue Shopping</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      </Link>
    </div>
  );
}
