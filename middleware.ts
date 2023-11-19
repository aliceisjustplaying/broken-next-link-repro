import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const getValidSubdomain = (host?: string | null) => {
  let subdomain: string | null = null;
  if (!host && typeof window !== "undefined") {
    // On client side, get the host from window
    host = window.location.host;
  }

  if (host && host.includes(".")) {
    const candidate = host.split(".")[0];
    if (
      candidate &&
      !candidate.includes("localhost") &&
      !candidate.includes("paperclip")
    ) {
      // Valid candidate
      subdomain = candidate;
    }
  }
  return subdomain;
};

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files
const DID_PATH_URI = "/.well-known/atproto-did";

export async function middleware(req: NextRequest) {
  // Clone the URL
  const url = req.nextUrl.clone();

  // Skip public files
  if (
    (PUBLIC_FILE.test(url.pathname) || url.pathname.includes("_next")) &&
    !url.pathname.includes(DID_PATH_URI)
  ) {
    console.log(`>>> Skipping: ${url.pathname}`);
    return;
  }

  const host = req.headers.get("host");
  const subdomain = getValidSubdomain(host);
  if (subdomain) {
    // Subdomain available, rewriting
    console.log(
      `>>> Rewriting: ${url.pathname} to /${subdomain}${url.pathname}`
    );
    url.pathname = `/${subdomain}${url.pathname}`;
  }

  return NextResponse.rewrite(url);
}
