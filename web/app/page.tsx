import { getAllProblems, getContests, getTopics } from "@/lib/content";
import { ProblemTable } from "@/components/problem-table";

export default function Home() {
  const problems = getAllProblems();
  const contests = getContests();
  const topics = getTopics();

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Problems</h1>
        <p className="text-sm text-muted">
          {problems.length} problems across {contests.length} contests
        </p>
      </div>
      <ProblemTable
        problems={problems}
        contests={contests.map((c) => c.id)}
        topics={topics.map((t) => t.id)}
      />
    </div>
  );
}
