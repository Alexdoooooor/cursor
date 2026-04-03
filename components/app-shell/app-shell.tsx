"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { AppHeader } from "@/components/app-shell/header";
import { AppSidebar } from "@/components/app-shell/sidebar";
import { demoProjects } from "@/lib/data/demo";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  const currentProject = useMemo(() => {
    const projectId = pathname.match(/projects\/([^/]+)/)?.[1];
    return demoProjects.find((project) => project.id === projectId) ?? null;
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(61,224,198,0.12),_transparent_35%),linear-gradient(180deg,_#070b12_0%,_#05070b_100%)] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1800px]">
        <AppSidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <AppHeader currentProject={currentProject} />
          <main className="flex-1 overflow-y-auto px-4 pb-8 pt-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
