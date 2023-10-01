import React from "react";

import Image from "next/image";
import Link from "next/link";

export default function CollectionCard<CollectionType>({
  // @ts-ignore
  handle, // @ts-ignore
  title, // @ts-ignore
  description, // @ts-ignore
  image,
}: CollectionType) {
  return (
    <div className="w-96 max-w-sm bg-white border border-gray-200 rounded-lg shadow mx-4 flex flex-col p-6">
      <div className="h-96 relative border-b-4 border-gray-100 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="transform duration-500 ease-in-out hover:scale-110 object-cover"
          sizes={"(max-width: 300px) 100vw, 640px"}
        />
      </div>
      <div className="px-5 pb-5 flex-1 mt-6 ">
        <h5 className="text-xl font-semibold tracking-tight text-purple-500">
          {title}
        </h5>

        <div className="flex items-center justify-between pt-8">
          <span className="text-md text-gray-500 ">{description}</span>
        </div>

        <Link
          href={`/collection/${handle}`}
          className="inline-block text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-5"
        >
          Check it Out
        </Link>
      </div>
    </div>
  );
}
