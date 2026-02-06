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
        <nav className="text-sm text-gray-500 dark:text-gray-400">
          <Link href="/contests" className="hover:underline">
            Contests
          </Link>
          {" / "}
          <Link href={`/contests/${contestId}`} className="hover:underline">
            {contest.shortName}
          </Link>
          {" / "}
          <span className="text-gray-900 dark:text-gray-100">
            {year}
            {yearEntry.round ? ` (${yearEntry.round})` : ""}
          </span>
        </nav>
        <h1 className="mt-2 text-3xl font-bold">
          {contest.shortName} {year}
          {yearEntry.round ? ` (${yearEntry.round})` : ""}
        </h1>
      </div>

      {problems.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No solutions available yet.
        </p>
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
