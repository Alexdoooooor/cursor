import { NextResponse } from "next/server";

import { clearSessionCookie } from "@/lib/auth/session";

function buildLoginUrl(request: Request): URL {
  return new URL("/login", request.url);
}

export async function GET(request: Request) {
  const response = NextResponse.redirect(buildLoginUrl(request));
  await clearSessionCookie(response);
  return response;
}

export async function POST(request: Request) {
  const response = NextResponse.redirect(buildLoginUrl(request));
  await clearSessionCookie(response);
  return response;
}
