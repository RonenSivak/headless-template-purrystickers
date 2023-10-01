"use client";
import React from "react";
import Image from "next/image";
import { ProductType } from "@/lib/types";
import { useCartContext } from "@/context/CartContext";
import { usePathname, useRouter } from "next/navigation";

export const useNavigateToProduct = (id: string) => {
  const router = useRouter();
  const currentPage = usePathname();
  const navigateToProduct = () => {
    router.push(`${currentPage}/${id}`);
  };
  return navigateToProduct;
};

const ProductCard = ({ id, image, name, price }: ProductType) => {
  const { addToCart, cart, getProductFromCart } = useCartContext();

  const cartHandler = async () => {
    const products = [
      {
        prodId: id ? id : "",
        quantity: 1,
      },
    ];
    addToCart!(products);
  };

  return (
    <div
      className="w-96 max-w-sm bg-white border border-gray-200 rounded-lg shadow mx-4 my-4 flex flex-col p-6
      hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
    >
      <div
        className="flex-1  cursor-pointer"
        onClick={useNavigateToProduct(id!)}
        role="link"
      >
        <div className="h-96 relative border-b-4 border-gray-100 rounded-lg overflow-hidden">
          <Image
            src={image ? image : "/images/placeholder.png"}
            alt={name ? name : "placeholder"}
            fill
            className="transform duration-500 ease-in-out hover:scale-110 object-cover"
            sizes={"(max-width: 640px) 100vw, 640px"}
          />
        </div>
        <div className="px-5 pb-5 flex-1 mt-6 ">
          <h5 className="text-xl font-semibold tracking-tight text-purple-500">
            {name}
          </h5>
        </div>
      </div>

      <div className="flex items-center justify-between pt-8">
        <span className="text-3xl font-bold text-purple-500">
          ${price?.price}
        </span>
        <button
          onClick={cartHandler}
          className="z-40 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
