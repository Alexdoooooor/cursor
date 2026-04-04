import { AppShell } from "@/components/app-shell/app-shell";
import { getSessionUser } from "@/lib/auth/session";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  if (!user) {
    return null;
  }

  return <AppShell>{children}</AppShell>;
}
