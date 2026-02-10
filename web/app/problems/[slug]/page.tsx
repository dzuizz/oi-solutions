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

function ChevronSep() {
  return (
    <svg className="mx-1.5 h-4 w-4 text-muted/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
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
      <nav className="flex items-center text-sm text-muted">
        <Link href="/" className="transition-colors hover:text-foreground">
          Problems
        </Link>
        <ChevronSep />
        <Link
          href={`/contests/${problem.contest}`}
          className="transition-colors hover:text-foreground"
        >
          {contest?.shortName ?? problem.contest.toUpperCase()}
        </Link>
        <ChevronSep />
        <span className="text-foreground font-medium">
          {problem.title}
        </span>
      </nav>

      {/* Header card */}
      <div className="rounded-xl border border-border">
        <div className="p-6 space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">{problem.title}</h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted">
              {contest?.shortName ?? problem.contest.toUpperCase()} {problem.year}
              {problem.round ? ` (${problem.round})` : ""}
            </span>
            <DifficultyBadge difficulty={problem.difficulty} />
            {problem.topics.map((t) => (
              <TopicTag key={t} id={t} />
            ))}
          </div>
        </div>

        {/* Complexity + source strip */}
        <div className="flex flex-wrap items-center gap-6 border-t border-border px-6 py-3 text-sm">
          <div>
            <span className="text-muted">Time: </span>
            <code className="font-mono">{problem.complexity.time}</code>
          </div>
          <div>
            <span className="text-muted">Space: </span>
            <code className="font-mono">{problem.complexity.space}</code>
          </div>
          {problem.sourceUrl && (
            <a
              href={problem.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1 text-primary transition-colors hover:text-primary-hover"
            >
              View original problem
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Solution */}
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <span className="h-5 w-1 rounded-full bg-primary" />
          Solution
        </h2>
        <CodeBlock code={problem.code} />
      </section>

      {/* Editorial */}
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <span className="h-5 w-1 rounded-full bg-primary" />
          Editorial
        </h2>
        {problem.content ? (
          <p className="text-muted">{problem.content}</p>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-8 text-center">
            <p className="text-muted">Editorial coming soon.</p>
            <p className="mt-1 text-xs text-muted/60">Contributions welcome</p>
          </div>
        )}
      </section>
    </div>
  );
}
