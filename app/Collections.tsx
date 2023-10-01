import React from "react";
import CollectionCard from "@/components/CollectionCard";
import {CollectionType} from "@/lib/types";
import Loader from "@/util/Load";
import {imageConvertor} from "@/util/imageConvertor";

// @ts-ignore
export default function Collections({ collections }: CollectionType[]) {
  return (
    <section className="flex flex-col items-center justify-center my-20">
      <h1 className="text-3xl font-bold text-purple-600 mb-10">
        Check out our stickers Collections
      </h1>
      <Loader waitingNode={collections}>
        <div className="flex w-full justify-start justify-items-center text-center flex-wrap min-w-full">
          {collections
            .slice(0, 3)
            .map((collection: CollectionType, index: number) => (
              <CollectionCard
                key={index}
                handle={collection?.handle}
                title={collection?.title}
                description={collection?.description}
                image={imageConvertor(collection!.image)}
              />
            ))}
        </div>
      </Loader>
    </section>
  );
}
