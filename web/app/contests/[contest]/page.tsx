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
          className="text-sm text-gray-500 hover:underline dark:text-gray-400"
        >
          ← Contests
        </Link>
        <h1 className="mt-2 text-3xl font-bold">{contest.name}</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
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
              className="rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-600"
            >
              <h2 className="text-lg font-semibold">
                {y.year}
                {y.round ? ` (${y.round})` : ""}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {problems.length} problem{problems.length !== 1 ? "s" : ""}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
