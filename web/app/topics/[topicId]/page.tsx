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
          className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Topics
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">{topic.name}</h1>
        <p className="text-sm text-muted">
          {problems.length} problem{problems.length !== 1 ? "s" : ""}
        </p>
      </div>

      {problems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-8 text-center">
          <p className="text-muted">No problems with this topic yet.</p>
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
