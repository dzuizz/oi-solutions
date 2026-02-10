import Link from "next/link";
import type { ProblemMeta } from "@/lib/types";
import { DifficultyBadge } from "./difficulty-badge";
import { TopicTag } from "./topic-tag";

export function ProblemCard({ problem }: { problem: ProblemMeta }) {
  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="group relative block overflow-hidden rounded-xl border border-border p-4 transition-all hover:border-primary/30 hover:shadow-md"
    >
      <span className="absolute inset-y-0 left-0 w-1 bg-border transition-colors group-hover:bg-primary" />
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-semibold transition-colors group-hover:text-primary">{problem.title}</h3>
        <DifficultyBadge difficulty={problem.difficulty} />
      </div>
      <p className="mb-3 text-sm text-muted">
        {problem.contest.toUpperCase()} {problem.year}
        {problem.round ? ` (${problem.round})` : ""}
      </p>
      <div className="flex flex-wrap gap-1">
        {problem.topics.map((t) => (
          <TopicTag key={t} id={t} />
        ))}
      </div>
    </Link>
  );
}
