import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjectByIdOrSlug } from "@/lib/data/projects-store";

type UsagePageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function UsagePage({ params }: UsagePageProps) {
  const { projectId } = await params;
  const project = await getProjectByIdOrSlug(projectId);

  if (!project) {
    return <div className="text-sm text-slate-400">Проект не найден.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Использование и бюджет</h1>
        <Badge tone="outline">MVP</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-sm text-white/70">Оценка расходов</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold text-white">
            ${project.usage.totalCostUsd.toFixed(1)}
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-sm text-white/70">Задач в очереди</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold text-white">
            {project.usage.queuedJobs}
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-sm text-white/70">Сгенерировано тейков</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold text-white">
            {project.usage.completedJobs}
          </CardContent>
        </Card>
      </div>

      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="text-white">Рекомендации по бюджету</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-white/70">
          <p>— Установите лимит длительности генерации для черновых шотов на уровне 4–6 секунд.</p>
          <p>— Выносите стиль и героев в reference bundles, чтобы не тратить токены на повторение описаний.</p>
          <p>— Утверждайте канонический тейк перед запуском lip-sync и музыкального этапа.</p>
        </CardContent>
      </Card>
    </div>
  );
}
