import Link from "next/link";
import { getAllProblems, getContests, getTopics } from "@/lib/content";

export default function Home() {
  const problems = getAllProblems();
  const contests = getContests();
  const topics = getTopics();

  return (
    <div className="space-y-12">
      <section className="space-y-4 pt-8">
        <h1 className="text-4xl font-bold tracking-tight">OI-Solutions</h1>
        <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Code solutions and editorials for Informatics Olympiad competitions.
          Browse problems by contest, topic, or difficulty.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
          <p className="text-3xl font-bold">{problems.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Problems</p>
        </div>
        <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
          <p className="text-3xl font-bold">{contests.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Contests</p>
        </div>
        <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
          <p className="text-3xl font-bold">{topics.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Topics</p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/problems"
          className="rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-600"
        >
          <h2 className="mb-1 font-semibold">Browse Problems</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Filter and search all solutions
          </p>
        </Link>
        <Link
          href="/contests"
          className="rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-600"
        >
          <h2 className="mb-1 font-semibold">By Contest</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            AIO, NOI, APIO and more
          </p>
        </Link>
        <Link
          href="/topics"
          className="rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-600"
        >
          <h2 className="mb-1 font-semibold">By Topic</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            DP, greedy, graphs and more
          </p>
        </Link>
      </section>
    </div>
  );
}
