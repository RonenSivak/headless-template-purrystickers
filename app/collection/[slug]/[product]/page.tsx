"use client";
import React, { useEffect, useState } from "react";
import { useWixClientContext } from "@/context/WixClientContext";
import { getProduct } from "@/models/products";
import { ProductType } from "@/lib/types";
import Image from "next/image";
import { imageConvertor } from "@/util/imageConvertor";
import { useCartContext } from "@/context/CartContext";

export default function Page({ params }: { params: { product: string } }) {
  const { wixClient } = useWixClientContext();
  const { addToCart } = useCartContext();
  const [product, setProduct] = useState<ProductType>();
  const loadProduct = async () => {
    const product = await getProduct(wixClient, params.product);
    setProduct(product);
  };
  useEffect(() => {
    loadProduct();
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20">
      <div className="container mx-auto mt-8 flex">
        <div className="w-1/2">
          <Image
            src={product?.image ? imageConvertor(product?.image) : ""}
            alt="Product"
            className="w-full h-auto rounded-lg shadow-lg"
            width={600}
            height={800}
          />
        </div>

        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {product?.name}
          </h2>
          <p className="text-2xl font-bold text-purple-600 mb-4">
            {product?.price?.formatted?.price}
          </p>
          <button
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
            onClick={() => {
              addToCart!([{ prodId: product!.id!, quantity: 1 }]);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Similar Products */}
      <div className="container mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Similar Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Repeat this block for each similar product */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src="https://via.placeholder.com/300x400"
              alt="Similar Product"
              className="w-full h-auto rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Product Title
            </h3>
            <p className="text-gray-600">$79.99</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-purple-700">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
