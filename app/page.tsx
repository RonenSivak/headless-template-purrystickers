"use client";
import { useWixClientContext } from "@/context/WixClientContext";
import { getCollections } from "@/models/collections";
import { useEffect, useState } from "react";
import { CollectionType } from "@/lib/types";
import Collections from "@/app/Collections";
import Hero from "@/app/Hero";

export default function Home() {
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const { wixClient } = useWixClientContext();
  const loadCollections = async () => {
    setCollections(await getCollections(wixClient));
  };

  useEffect(() => {
    loadCollections();
  }, []);

  return (
    <main>
      <Hero />
      <Collections collections={collections} />
    </main>
  );
}
