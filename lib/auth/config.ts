export const APP_SESSION_COOKIE = "cinecraft_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 12;

export type SessionUser = {
  username: string;
  role: "owner" | "admin" | "producer";
};

export const DEMO_USER: SessionUser = {
  username: process.env.AUTH_USERNAME ?? "demo@cinecraft.ai",
  role: "owner",
};

export function getAuthSecret(): string {
  return process.env.AUTH_SECRET ?? "dev-cinecraft-secret";
}

export function getAuthCredentials() {
  return {
    username: process.env.AUTH_USERNAME ?? "demo@cinecraft.ai",
    password: process.env.AUTH_PASSWORD ?? "cinecraft-demo",
  };
}

export function isValidDemoCredential(username: string, password: string): boolean {
  const credentials = getAuthCredentials();
  return username === credentials.username && password === credentials.password;
}
