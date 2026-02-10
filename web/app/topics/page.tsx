import type { Metadata } from "next";
import Link from "next/link";
import { getTopics, getProblemsByTopic } from "@/lib/content";

export const metadata: Metadata = {
  title: "Topics",
};

export default function TopicsPage() {
  const topics = getTopics();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Topics</h1>
        <p className="mt-1 text-sm text-muted">Browse problems by algorithm or data structure</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t) => {
          const count = getProblemsByTopic(t.id).length;
          return (
            <Link
              key={t.id}
              href={`/topics/${t.id}`}
              className="group flex items-center justify-between overflow-hidden rounded-xl border border-border p-6 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div>
                <h2 className="font-semibold transition-colors group-hover:text-primary">{t.name}</h2>
                <p className="text-sm text-muted">
                  {count} problem{count !== 1 ? "s" : ""}
                </p>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-sm font-medium text-muted">
                {count}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
