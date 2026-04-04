import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";
import { type NextResponse } from "next/server";

import {
  APP_SESSION_COOKIE,
  DEMO_USER,
  SESSION_TTL_SECONDS,
  type SessionUser,
  getAuthSecret,
} from "@/lib/auth/config";

type SessionPayload = {
  user: SessionUser;
  expiresAt: number;
};

function encodeBase64(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decodeBase64(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function createSignature(payload: string): string {
  return createHmac("sha256", getAuthSecret()).update(payload).digest("base64url");
}

export async function createSignedSession(user: SessionUser): Promise<string> {
  const payload: SessionPayload = {
    user,
    expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000,
  };

  const encodedPayload = encodeBase64(JSON.stringify(payload));
  const signature = createSignature(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

function parseSessionToken(token: string): SessionUser | null {
  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = createSignature(encodedPayload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(decodeBase64(encodedPayload)) as SessionPayload;

    if (payload.expiresAt < Date.now()) {
      return null;
    }

    return payload.user;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const rawValue = cookieStore.get(APP_SESSION_COOKIE)?.value;

  if (!rawValue) {
    return null;
  }

  return parseSessionToken(rawValue);
}

export async function getSessionUser(): Promise<SessionUser | null> {
  return getSession();
}

export async function requireSessionUser(): Promise<SessionUser> {
  const user = await getSession();
  return user ?? DEMO_USER;
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(APP_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}
