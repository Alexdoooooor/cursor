"use client";

import type { Project } from "@/types/domain";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TimelinePanelProps = {
  project: Project;
};

export function TimelinePanel({ project }: TimelinePanelProps) {
  return (
    <div className="space-y-6">
      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle>Черновой монтаж</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-4">
            <div className="flex flex-wrap gap-3">
              {project.timeline.map((clip, index) => (
                <div
                  key={clip.id}
                  className="min-w-[220px] rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Клип {index + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{clip.label}</h3>
                  <p className="mt-1 text-sm text-white/60">
                    {clip.durationSec} сек · дорожка «{clip.lane}»
                  </p>
                </div>
              ))}
              {project.timeline.length === 0 && (
                <p className="text-sm text-white/55">
                  Утвердите хотя бы один take в storyboard, чтобы собрать rough cut.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
