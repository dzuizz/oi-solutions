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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Contests</h1>
        <p className="mt-1 text-sm text-muted">Browse problems by competition</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contests.map((c) => {
          const count = getProblemsByContest(c.id).length;
          return (
            <Link
              key={c.id}
              href={`/contests/${c.id}`}
              className="group relative block overflow-hidden rounded-xl border border-border p-6 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <span className="absolute inset-y-0 left-0 w-1 bg-border transition-colors group-hover:bg-primary" />
              <h2 className="text-lg font-semibold transition-colors group-hover:text-primary">{c.shortName}</h2>
              <p className="text-sm text-muted">
                {c.name}
              </p>
              <p className="mt-2 text-sm text-muted">
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
