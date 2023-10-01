import { WixClient } from "@wix/sdk";
import {
  getCollection as serviceCollection,
  getCollections as serviceCollections,
} from "@/services/collectionService";
import { CollectionType } from "@/lib/types";

export const getCollections = (
  wixClient: WixClient,
): Promise<CollectionType[]> => {
  return serviceCollections(wixClient);
};

export const getCollection = (
  wixClient: WixClient,
  collectionSlug: string,
): Promise<CollectionType> => {
  return serviceCollection(wixClient, collectionSlug);
};
