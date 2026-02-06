import type { Metadata } from "next";
import { getAllProblems, getContests, getTopics } from "@/lib/content";
import { ProblemTable } from "@/components/problem-table";

export const metadata: Metadata = {
  title: "Problems",
};

export default function ProblemsPage() {
  const problems = getAllProblems();
  const contests = getContests().map((c) => c.id);
  const topics = getTopics().map((t) => t.id);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Problems</h1>
      <ProblemTable problems={problems} contests={contests} topics={topics} />
    </div>
  );
}
