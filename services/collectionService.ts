import { WixClient } from "@wix/sdk";
import { collections } from "@wix/stores";
import { CollectionType } from "@/lib/types";

export async function getCollections(
  wixClient: WixClient,
): Promise<CollectionType[]> {
  const wixCollections: collections.Collection[] = await wixClient.collections
    .queryCollections()
    .find();

  return [
    ...collectionsAdapter(
      wixCollections.items.filter(
        (x: collections.Collection) =>
          !x.slug?.startsWith("hidden-") && x.slug?.startsWith("purry-"),
      ),
    ),
  ];
}

const collectionsAdapter = (collections: collections.Collection[]) => {
  return collections.map(collectionAdapter);
};

const collectionAdapter = (collection: collections.Collection) =>
  ({
    id: collection._id,
    title: collection.name,
    description: collection.description,
    handle: collection.slug,
    image: collection.media?.mainMedia?.thumbnail?.url,
  }) as CollectionType;

export async function getCollection(
  wixClient: WixClient,
  collectionSlug: string,
): Promise<CollectionType> {
  const allCollections: collections.Collection = await wixClient.collections
    .queryCollections()
    .find();

  const wixCollection: collections.Collection = allCollections.items.find(
    (x: collections.Collection) => x.slug === collectionSlug,
  );

  return collectionAdapter(wixCollection);
}
