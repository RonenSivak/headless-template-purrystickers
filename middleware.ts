import { NextRequest, NextResponse } from "next/server";
import { createClient, OAuthStrategy } from "@wix/sdk";

export async function middleware(request: NextRequest) {
  if (!request.cookies.get("session")) {
    const response = NextResponse.next();
    const wixClient = createClient({
      auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
    });
    response.cookies.set(
      "session",
      JSON.stringify(await wixClient.auth.generateVisitorTokens()),
    );
    return response;
  }
}

export const config = {
  unstable_allowDynamic: ["/node_modules/.pnpm/lodash@*/**"],
};
