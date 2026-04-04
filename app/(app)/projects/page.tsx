import { NewProjectForm } from "@/components/projects/new-project-form";
import { ProjectCard } from "@/components/projects/project-card";
import { listProjects } from "@/lib/data/projects-store";

export default async function ProjectsPage() {
  const projects = await listProjects();

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
            Все проекты
          </p>
          <h1 className="text-4xl font-semibold text-white">
            Продакшн-контроль для нейрогенеративного кино
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-300">
            Создавайте фильмы, ролики и анимацию как полноценные проекты:
            драматургия, герои, визуальный язык, шоты, continuity, генерация,
            rough cut и экспорт — в одном русском интерфейсе.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Активные проекты", String(projects.length)],
              ["Готово к генерации", "12 шотов"],
              ["Средний continuity score", "91/100"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="text-sm text-slate-400">{label}</div>
                <div className="mt-2 text-2xl font-semibold text-white">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
        <NewProjectForm />
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
}
