import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getContests,
  getContestById,
  getProblemsByContest,
} from "@/lib/content";
import { ProblemCard } from "@/components/problem-card";

export function generateStaticParams() {
  const results: { contest: string; year: string }[] = [];
  for (const c of getContests()) {
    for (const y of c.years) {
      results.push({ contest: c.id, year: String(y.year) });
    }
  }
  return results;
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ contest: string; year: string }>;
}): Promise<Metadata> {
  return params.then(({ contest, year }) => {
    const c = getContestById(contest);
    return {
      title: `${c?.shortName ?? contest.toUpperCase()} ${year}`,
    };
  });
}

function ChevronSep() {
  return (
    <svg className="mx-1.5 h-4 w-4 text-muted/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default async function ContestYearPage({
  params,
}: {
  params: Promise<{ contest: string; year: string }>;
}) {
  const { contest: contestId, year: yearStr } = await params;
  const contest = getContestById(contestId);
  const year = parseInt(yearStr, 10);
  if (!contest || isNaN(year)) notFound();

  const yearEntry = contest.years.find((y) => y.year === year);
  if (!yearEntry) notFound();

  const problems = getProblemsByContest(contestId, year, yearEntry.round);

  return (
    <div className="space-y-6">
      <div>
        <nav className="flex items-center text-sm text-muted">
          <Link href="/contests" className="transition-colors hover:text-foreground">
            Contests
          </Link>
          <ChevronSep />
          <Link href={`/contests/${contestId}`} className="transition-colors hover:text-foreground">
            {contest.shortName}
          </Link>
          <ChevronSep />
          <span className="text-foreground font-medium">
            {year}
            {yearEntry.round ? ` (${yearEntry.round})` : ""}
          </span>
        </nav>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          {contest.shortName} {year}
          {yearEntry.round ? ` (${yearEntry.round})` : ""}
        </h1>
      </div>

      {problems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-8 text-center">
          <p className="text-muted">No solutions available yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {problems.map((p) => (
            <ProblemCard key={p.slug} problem={p} />
          ))}
        </div>
      )}
    </div>
  );
}
