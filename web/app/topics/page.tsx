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
      <h1 className="text-3xl font-bold">Topics</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {topics.map((t) => {
          const count = getProblemsByTopic(t.id).length;
          return (
            <Link
              key={t.id}
              href={`/topics/${t.id}`}
              className="rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-600"
            >
              <h2 className="font-semibold">{t.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {count} problem{count !== 1 ? "s" : ""}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
