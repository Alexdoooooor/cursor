import { Film, LockKeyhole, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";

import { loginAction } from "@/app/login/actions";
import { getSessionUser } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

const features = [
  "Story Bible, Character Bible и storyboard в одном месте",
  "Контроль continuity, света, линз и prompt-блоков",
  "Generation queue, rough cut, audio stage и export center",
];

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await getSessionUser();

  if (session) {
    redirect("/projects");
  }

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const error = resolvedSearchParams?.error;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(61,224,198,0.14),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.14),_transparent_28%),linear-gradient(180deg,_#05070b_0%,_#090f17_100%)] px-6 py-10 text-white">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
            <Sparkles className="h-4 w-4" />
            Русский control room для AI video production
          </div>

          <div className="space-y-6">
            <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
              Войдите в студию и управляйте нейрогенеративным фильмом как продакшн-системой.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              CineCraft Control Room объединяет шоты, героев, свет, continuity, audio stage,
              rough timeline и orchestration генерации в едином русскоязычном интерфейсе.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-slate-300"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>

        <Card className="border-white/10 bg-black/30 shadow-[0_24px_90px_rgba(2,6,23,0.45)]">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-3 text-cyan-200">
              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3">
                <Film className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-2xl">Вход в CineCraft</CardTitle>
                <CardDescription className="text-slate-400">
                  Авторизуйтесь для доступа к проектам, shot planning и generation queue.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form
              action={async (formData) => {
                "use server";
                await loginAction(formData);
              }}
              className="space-y-5"
            >
              <div className="space-y-2">
                <Label htmlFor="username">Логин</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="demo"
                  autoComplete="username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Введите пароль"
                  autoComplete="current-password"
                  required
                />
              </div>

              {error ? (
                <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                  {error === "invalid_credentials"
                    ? "Неверный email или пароль."
                    : "Не удалось выполнить вход. Попробуйте снова."}
                </div>
              ) : null}

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                <div className="mb-2 flex items-center gap-2 font-medium text-white">
                  <LockKeyhole className="h-4 w-4 text-cyan-300" />
                  Демо-доступ
                </div>
                <div>Логин: demo</div>
                <div>Пароль: demo-cinecraft</div>
              </div>

              <Button type="submit" className="w-full">
                Войти в студию
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
