import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTopics, getTopicById, getProblemsByTopic } from "@/lib/content";
import { ProblemCard } from "@/components/problem-card";

export function generateStaticParams() {
  return getTopics().map((t) => ({ topicId: t.id }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ topicId: string }>;
}): Promise<Metadata> {
  return params.then(({ topicId }) => {
    const topic = getTopicById(topicId);
    return { title: topic?.name ?? topicId };
  });
}

export default async function TopicDetailPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;
  const topic = getTopicById(topicId);
  if (!topic) notFound();

  const problems = getProblemsByTopic(topicId);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/topics"
          className="text-sm text-gray-500 hover:underline dark:text-gray-400"
        >
          ← Topics
        </Link>
        <h1 className="mt-2 text-3xl font-bold">{topic.name}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {problems.length} problem{problems.length !== 1 ? "s" : ""}
        </p>
      </div>

      {problems.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No problems with this topic yet.
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
