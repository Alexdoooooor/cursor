"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  APP_SESSION_COOKIE,
  DEMO_USER,
  SESSION_TTL_SECONDS,
  isValidDemoCredential,
} from "@/lib/auth/config";

export async function loginAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (!isValidDemoCredential(email, password)) {
    redirect("/login" as never);
  }
  const cookieStore = await cookies();

  cookieStore.set(APP_SESSION_COOKIE, JSON.stringify(DEMO_USER), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_TTL_SECONDS,
    path: "/",
  });

  redirect("/projects" as never);
}
