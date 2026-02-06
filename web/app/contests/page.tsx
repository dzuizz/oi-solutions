import type { Metadata } from "next";
import Link from "next/link";
import { getContests, getProblemsByContest } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contests",
};

export default function ContestsPage() {
  const contests = getContests();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Contests</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {contests.map((c) => {
          const count = getProblemsByContest(c.id).length;
          return (
            <Link
              key={c.id}
              href={`/contests/${c.id}`}
              className="rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-600"
            >
              <h2 className="text-lg font-semibold">{c.shortName}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {c.name}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {count} problem{count !== 1 ? "s" : ""} &middot;{" "}
                {c.years.length} year{c.years.length !== 1 ? "s" : ""}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
