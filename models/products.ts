import { WixClient } from "@wix/sdk";
import { ProductType } from "@/lib/types";
import {
  getProduct as serviceProduct,
  getProducts as serviceProducts,
} from "@/services/productService";

export const getProducts = (
  wixClient: WixClient,
  collectionSlug: string,
): Promise<ProductType[]> => {
  return serviceProducts(wixClient, collectionSlug);
};

export const getProduct = (
  wixClient: WixClient,
  productID: string,
): Promise<ProductType> => {
  return serviceProduct(wixClient, productID);
};
