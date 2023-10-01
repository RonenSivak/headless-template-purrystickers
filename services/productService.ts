import { WixClient } from "@wix/sdk";
import { products } from "@wix/stores";
import { ProductType } from "@/lib/types";

export async function getProducts(
  wixClient: WixClient,
  collectionSlug: string,
) {
  if (collectionSlug === undefined) return [];
  const { collection } = await wixClient.collections.getCollectionBySlug(
    collectionSlug,
  );
  const { items } = await wixClient.products.queryProducts().find();
  const collectionItems = items.filter(
    (item: products.Product) => item.collectionIds?.includes(collection._id),
  );

  return productsAdapter(collectionItems);
}

const productsAdapter = (products: products.Product[]) => {
  return products.map(productAdapter);
};

const productAdapter = (product: products.Product): ProductType => {
  return {
    id: product._id,
    name: product.name,
    price: product.price,
    image: product.media?.mainMedia?.thumbnail?.url,
  };
};

export const getProduct = async (
  wixClient: WixClient,
  productID: string,
): Promise<ProductType> => {
  const { product } = await wixClient.products.getProduct(productID);
  return productAdapter(product);
};
