"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient, OAuthStrategy, WixClient } from "@wix/sdk";
import { currentCart } from "@wix/ecom";
import { collections, products } from "@wix/stores";
import { members } from "@wix/members";
import Cookies from "js-cookie";

const WixClientContext = createContext({
  wixClient: {} as WixClient,
  getWixClient: () => ({}) as WixClient,
});
const getWixClient = (): WixClient => {
  const wixClient = createClient({
    modules: { currentCart, products, collections, members },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: JSON.parse(Cookies.get("session") || "{}"),
    }),
  });
  return wixClient;
};

export function WixClientContextProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [wixClient, setWixClient] = useState<WixClient>(getWixClient());
  useEffect(() => {
    setWixClient(getWixClient());
  }, []);

  return (
    <WixClientContext.Provider value={{ wixClient, getWixClient }}>
      {children}
    </WixClientContext.Provider>
  );
}

export function useWixClientContext(): {
  wixClient: WixClient;
  getWixClient: () => WixClient;
} {
  return useContext(WixClientContext);
}
