"use client";
import React, { useEffect, useState } from "react";
import Collections from "@/app/Collections";
import { CollectionType } from "@/lib/types";
import { getCollections } from "@/models/collections";
import { useWixClientContext } from "@/context/WixClientContext";

export default function Page() {
  const { wixClient } = useWixClientContext();

  const [collections, setCollections] = useState<CollectionType[]>([]);
  const loadCollections = async () => {
    setCollections(await getCollections(wixClient));
  };

  useEffect(() => {
    loadCollections();
  }, []);
  return <Collections collections={collections} />;
}
