"use client";
import React, { useEffect, useState } from "react";
import { useWixClientContext } from "@/context/WixClientContext";
import { getProducts } from "@/models/products";
import { CollectionType, ProductType } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { imageConvertor } from "@/util/imageConvertor";
import Loader from "@/util/Load";
import { getCollection } from "@/models/collections";

export default function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { wixClient } = useWixClientContext();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [collection, setCollection] = useState<CollectionType>();
  const loadProducts = async () => {
    setProducts(await getProducts(wixClient, slug));
    setCollection(await getCollection(wixClient, slug));
  };

  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <div className="flex flex-col w-full justify-start justify-items-center text-center flex-wrap min-w-full h-full">
      <Loader waitingNode={products}>
        <header className="text-purple-700">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
            {collection?.title || "Error loading collection name"}
          </h1>
          <p className="mb-6 text-lg font-normal lg:text-xl sm:px-16 xl:px-48">
            {collection?.description}
          </p>
        </header>
        <div className="flex flex-row">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              price={product.price}
              image={imageConvertor(product.image!)}
              id={product.id}
            />
          ))}
        </div>
      </Loader>
    </div>
  );
}
