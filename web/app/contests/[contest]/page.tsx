import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContests, getContestById, getProblemsByContest } from "@/lib/content";

export function generateStaticParams() {
  return getContests().map((c) => ({ contest: c.id }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ contest: string }>;
}): Promise<Metadata> {
  return params.then(({ contest }) => {
    const c = getContestById(contest);
    return { title: c?.shortName ?? contest.toUpperCase() };
  });
}

export default async function ContestDetailPage({
  params,
}: {
  params: Promise<{ contest: string }>;
}) {
  const { contest: contestId } = await params;
  const contest = getContestById(contestId);
  if (!contest) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/contests"
          className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Contests
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">{contest.name}</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contest.years.map((y) => {
          const problems = getProblemsByContest(
            contestId,
            y.year,
            y.round
          );
          return (
            <Link
              key={`${y.year}-${y.round ?? ""}`}
              href={`/contests/${contestId}/${y.year}${y.round ? `?round=${y.round}` : ""}`}
              className="group relative block overflow-hidden rounded-xl border border-border p-6 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <span className="absolute inset-y-0 left-0 w-1 bg-border transition-colors group-hover:bg-primary" />
              <h2 className="text-lg font-semibold transition-colors group-hover:text-primary">
                {y.year}
                {y.round ? ` (${y.round})` : ""}
              </h2>
              <p className="text-sm text-muted">
                {problems.length} problem{problems.length !== 1 ? "s" : ""}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
