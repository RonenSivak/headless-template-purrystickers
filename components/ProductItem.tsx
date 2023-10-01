import React from "react";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/lib/types";

export default function ProductItem({ image, name, price }: ProductType) {
  return <ProductCard image={image} name={name} price={price} />;
}
