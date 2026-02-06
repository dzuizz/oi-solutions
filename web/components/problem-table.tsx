"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { ProblemMeta } from "@/lib/types";

type SortKey = "title" | "year" | "difficulty";
type SortDir = "asc" | "desc";

const difficultyOrder = { easy: 0, medium: 1, hard: 2 };
const difficultyColors = {
  easy: "text-green-600 dark:text-green-400",
  medium: "text-yellow-600 dark:text-yellow-400",
  hard: "text-red-600 dark:text-red-400",
};

export function ProblemTable({
  problems,
  contests,
  topics,
}: {
  problems: ProblemMeta[];
  contests: string[];
  topics: string[];
}) {
  const [search, setSearch] = useState("");
  const [contestFilter, setContestFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [topicFilter, setTopicFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const filtered = useMemo(() => {
    let result = problems;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (contestFilter) {
      result = result.filter((p) => p.contest === contestFilter);
    }
    if (difficultyFilter) {
      result = result.filter((p) => p.difficulty === difficultyFilter);
    }
    if (topicFilter) {
      result = result.filter((p) => p.topics.includes(topicFilter));
    }

    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "title") cmp = a.title.localeCompare(b.title);
      else if (sortKey === "year") cmp = a.year - b.year;
      else cmp = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [problems, search, contestFilter, difficultyFilter, topicFilter, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function sortIndicator(key: SortKey) {
    if (sortKey !== key) return "";
    return sortDir === "asc" ? " ↑" : " ↓";
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900"
        />
        <select
          value={contestFilter}
          onChange={(e) => setContestFilter(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900"
        >
          <option value="">All contests</option>
          {contests.map((c) => (
            <option key={c} value={c}>
              {c.toUpperCase()}
            </option>
          ))}
        </select>
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900"
        >
          <option value="">All difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select
          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900"
        >
          <option value="">All topics</option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t.replace(/-/g, " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <tr>
              <th
                className="cursor-pointer px-4 py-3 font-medium"
                onClick={() => toggleSort("title")}
              >
                Title{sortIndicator("title")}
              </th>
              <th className="px-4 py-3 font-medium">Contest</th>
              <th
                className="cursor-pointer px-4 py-3 font-medium"
                onClick={() => toggleSort("year")}
              >
                Year{sortIndicator("year")}
              </th>
              <th
                className="cursor-pointer px-4 py-3 font-medium"
                onClick={() => toggleSort("difficulty")}
              >
                Difficulty{sortIndicator("difficulty")}
              </th>
              <th className="px-4 py-3 font-medium">Topics</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.slug}
                className="border-b border-gray-100 last:border-0 dark:border-gray-800"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/problems/${p.slug}`}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {p.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  {p.contest.toUpperCase()}
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  {p.year}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`capitalize ${difficultyColors[p.difficulty]}`}
                  >
                    {p.difficulty}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {p.topics.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      >
                        {t.replace(/-/g, " ")}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-gray-400"
                >
                  No problems found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-sm text-gray-400">
        {filtered.length} of {problems.length} problems
      </p>
    </div>
  );
}
