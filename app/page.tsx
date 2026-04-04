import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Clapperboard, Film, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSessionUser } from "@/lib/auth/session";

const features = [
  {
    title: "Контроль сцен и шотов",
    description:
      "Структурируйте фильм по актам, сценам и шотам, фиксируйте камеру, свет, эмоцию и continuity constraints.",
    icon: Film,
  },
  {
    title: "Постоянство героев и мира",
    description:
      "Храните character bible, world bible и style bible, чтобы держать визуальную и драматургическую целостность.",
    icon: Clapperboard,
  },
  {
    title: "Очередь генерации и rough cut",
    description:
      "Запускайте генерацию, утверждайте takes, собирайте rough timeline и экспортируйте production manifest.",
    icon: Sparkles,
  },
];

export default async function HomePage() {
  const user = await getSessionUser();

  if (user) {
    redirect("/projects");
  }

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(110,211,255,0.16),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(254,179,102,0.18),_transparent_32%)]" />
      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-14 px-6 py-24 lg:px-10">
        <div className="max-w-4xl space-y-8">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
            Полностью русскоязычный control room для AI-видеопроизводства
          </div>
          <div className="space-y-6">
            <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-white md:text-7xl">
              Создавайте нейрогенеративные фильмы, ролики и сцены с полным контролем.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">
              CineCraft Control Room помогает управлять героями, светом, стилем, continuity,
              сторибордом, генерацией, аудио и экспортом как в настоящем продакшн-пайплайне.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/projects" className="min-w-[220px]">
              <Button size="lg" className="w-full">
                Открыть студию
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/projects/project-aurora" className="min-w-[220px]">
              <Button size="lg" variant="secondary" className="w-full">
                Смотреть демо-проект
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card key={feature.title} className="border-white/10 bg-white/[0.04] backdrop-blur">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#6ed3ff]/10 text-[#6ed3ff]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-400">
                    MVP уже включает проекты, story bible, character bible, storyboard, generation queue,
                    continuity panel, audio stage и export center.
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
