import Link from "next/link";
import type { ProblemMeta } from "@/lib/types";
import { DifficultyBadge } from "./difficulty-badge";
import { TopicTag } from "./topic-tag";

export function ProblemCard({ problem }: { problem: ProblemMeta }) {
  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="block rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-600"
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-semibold">{problem.title}</h3>
        <DifficultyBadge difficulty={problem.difficulty} />
      </div>
      <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
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
