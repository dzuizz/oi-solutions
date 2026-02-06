import type { Metadata } from "next";
import Link from "next/link";
import { getAllSlugs, getProblemBySlug, getContestById } from "@/lib/content";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { TopicTag } from "@/components/topic-tag";
import { CodeBlock } from "@/components/code-block";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const problem = getProblemBySlug(slug);
    return { title: problem.title };
  });
}

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);
  const contest = getContestById(problem.contest);

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 dark:text-gray-400">
        <Link href="/problems" className="hover:underline">
          Problems
        </Link>
        {" / "}
        <Link
          href={`/contests/${problem.contest}`}
          className="hover:underline"
        >
          {contest?.shortName ?? problem.contest.toUpperCase()}
        </Link>
        {" / "}
        <span className="text-gray-900 dark:text-gray-100">
          {problem.title}
        </span>
      </nav>

      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">{problem.title}</h1>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {contest?.shortName ?? problem.contest.toUpperCase()} {problem.year}
            {problem.round ? ` (${problem.round})` : ""}
          </span>
          <DifficultyBadge difficulty={problem.difficulty} />
          {problem.topics.map((t) => (
            <TopicTag key={t} id={t} />
          ))}
        </div>
      </div>

      {/* Complexity */}
      <div className="flex gap-6 text-sm">
        <div>
          <span className="text-gray-500 dark:text-gray-400">Time: </span>
          <code className="font-mono">{problem.complexity.time}</code>
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-400">Space: </span>
          <code className="font-mono">{problem.complexity.space}</code>
        </div>
      </div>

      {/* Source link */}
      {problem.sourceUrl && (
        <a
          href={problem.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          View original problem →
        </a>
      )}

      {/* Code */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Solution</h2>
        <CodeBlock code={problem.code} />
      </section>

      {/* Editorial placeholder */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Editorial</h2>
        <p className="text-gray-500 dark:text-gray-400">
          {problem.content || "Editorial coming soon."}
        </p>
      </section>
    </div>
  );
}
