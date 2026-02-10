"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import type { ProblemMeta } from "@/lib/types";

type SortKey = "title" | "year" | "difficulty";
type SortDir = "asc" | "desc";

const difficultyOrder = { easy: 0, medium: 1, hard: 2 };
const difficultyConfig = {
  easy: { dot: "bg-green-500", text: "text-green-700 dark:text-green-400" },
  medium: { dot: "bg-yellow-500", text: "text-yellow-700 dark:text-yellow-400" },
  hard: { dot: "bg-red-500", text: "text-red-700 dark:text-red-400" },
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
  const searchRef = useRef<HTMLInputElement>(null);

  const hasFilters = search || contestFilter || difficultyFilter || topicFilter;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === searchRef.current) {
        setSearch("");
        searchRef.current?.blur();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  function clearFilters() {
    setSearch("");
    setContestFilter("");
    setDifficultyFilter("");
    setTopicFilter("");
  }

  function SortIndicator({ field }: { field: SortKey }) {
    const isActive = sortKey === field;
    return (
      <span className="ml-1 inline-flex flex-col leading-none text-[10px]">
        <span className={isActive && sortDir === "asc" ? "text-primary" : "text-muted/40"}>▲</span>
        <span className={isActive && sortDir === "desc" ? "text-primary" : "text-muted/40"}>▼</span>
      </span>
    );
  }

  const selectClass = (active: boolean) =>
    `rounded-md border px-2.5 py-1.5 text-sm transition-colors ${
      active
        ? "border-primary bg-primary-subtle text-foreground"
        : "border-border bg-background text-foreground"
    }`;

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-3 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2.5">
        <div className="relative">
          <svg className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={searchRef}
            type="text"
            placeholder="Search problems... (/)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`rounded-md border pl-8 pr-2.5 py-1.5 text-sm transition-colors ${
              search
                ? "border-primary bg-primary-subtle"
                : "border-border bg-background"
            }`}
          />
        </div>
        <select
          value={contestFilter}
          onChange={(e) => setContestFilter(e.target.value)}
          className={selectClass(!!contestFilter)}
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
          className={selectClass(!!difficultyFilter)}
        >
          <option value="">All difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select
          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value)}
          className={selectClass(!!topicFilter)}
        >
          <option value="">All topics</option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t.replace(/-/g, " ")}
            </option>
          ))}
        </select>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="rounded-md px-2 py-1 text-xs text-muted transition-colors hover:text-foreground"
          >
            Clear filters
          </button>
        )}
        <span className="ml-auto tabular-nums text-xs font-medium text-muted">
          {filtered.length} of {problems.length}
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 z-10 border-b border-border bg-surface">
            <tr>
              <th className="w-10 px-3 py-2.5 text-center text-xs font-medium uppercase tracking-wider text-muted">
                #
              </th>
              <th
                className="cursor-pointer select-none px-3 py-2.5 text-xs font-medium uppercase tracking-wider text-muted"
                onClick={() => toggleSort("title")}
              >
                Title <SortIndicator field="title" />
              </th>
              <th className="px-3 py-2.5 text-xs font-medium uppercase tracking-wider text-muted">
                Contest
              </th>
              <th
                className="cursor-pointer select-none px-3 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-muted"
                onClick={() => toggleSort("year")}
              >
                Year <SortIndicator field="year" />
              </th>
              <th
                className="cursor-pointer select-none px-3 py-2.5 text-xs font-medium uppercase tracking-wider text-muted"
                onClick={() => toggleSort("difficulty")}
              >
                Difficulty <SortIndicator field="difficulty" />
              </th>
              <th className="px-3 py-2.5 text-xs font-medium uppercase tracking-wider text-muted">
                Topics
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr
                key={p.slug}
                className="border-b border-border last:border-0 transition-colors hover:bg-primary-subtle"
              >
                <td className="px-3 py-2.5 text-center font-mono text-xs text-muted">
                  {i + 1}
                </td>
                <td className="px-3 py-2.5">
                  <Link
                    href={`/problems/${p.slug}`}
                    className="font-medium text-primary hover:text-primary-hover hover:underline"
                  >
                    {p.title}
                  </Link>
                </td>
                <td className="px-3 py-2.5">
                  <span className="inline-block rounded-md px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset ring-border text-muted">
                    {p.contest}
                  </span>
                </td>
                <td className="px-3 py-2.5 font-mono text-muted">
                  {p.year}
                </td>
                <td className="px-3 py-2.5">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium capitalize ${difficultyConfig[p.difficulty].text}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${difficultyConfig[p.difficulty].dot}`} />
                    {p.difficulty}
                  </span>
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex flex-wrap gap-1">
                    {p.topics.map((t) => (
                      <Link
                        key={t}
                        href={`/topics/${t}`}
                        className="rounded-md bg-surface px-1.5 py-0.5 text-xs text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
                      >
                        {t.replace(/-/g, " ")}
                      </Link>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-3 py-12 text-center"
                >
                  <p className="text-muted">No problems found.</p>
                  <p className="mt-1 text-xs text-muted/60">Try adjusting your search or filters</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
