import { PriceData } from "@wix/stores/build/es/src/stores-catalog-v1-product.types";

export type ProductType = {
  id?: string | undefined;
  name?: string | null | undefined;
  price?: PriceData | undefined;
  image?: string | undefined;
};

export type SEO = {
  title: string;
  description: string;
};

export type CollectionType =
  | {
      id: string;
      handle: string;
      title: string;
      description: string;
      image: string;
    }
  | undefined;
