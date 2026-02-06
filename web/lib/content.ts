import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ProblemMeta, Problem, Contest, Topic } from "./types";

const ROOT_DIR = path.resolve(process.cwd(), "..");
const CONTENT_DIR = path.join(ROOT_DIR, "content", "problems");
const DATA_DIR = path.join(ROOT_DIR, "data");

let cachedProblems: ProblemMeta[] | null = null;

export function getAllProblems(): ProblemMeta[] {
  if (cachedProblems) return cachedProblems;

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const problems = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data } = matter(raw);
    return data as ProblemMeta;
  });

  problems.sort((a, b) => a.title.localeCompare(b.title));
  cachedProblems = problems;
  return problems;
}

export function getAllSlugs(): string[] {
  return getAllProblems().map((p) => p.slug);
}

export function getProblemBySlug(slug: string): Problem {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const meta = data as ProblemMeta;

  const codePath = path.join(ROOT_DIR, meta.solutionPath);
  const code = fs.readFileSync(codePath, "utf-8");

  return { ...meta, code, content: content.trim() };
}

export function getContests(): Contest[] {
  const raw = fs.readFileSync(path.join(DATA_DIR, "contests.json"), "utf-8");
  return JSON.parse(raw) as Contest[];
}

export function getContestById(id: string): Contest | undefined {
  return getContests().find((c) => c.id === id);
}

export function getProblemsByContest(
  contestId: string,
  year?: number,
  round?: string
): ProblemMeta[] {
  return getAllProblems().filter((p) => {
    if (p.contest !== contestId) return false;
    if (year !== undefined && p.year !== year) return false;
    if (round !== undefined && p.round !== round) return false;
    return true;
  });
}

export function getTopics(): Topic[] {
  const raw = fs.readFileSync(path.join(DATA_DIR, "topics.json"), "utf-8");
  return JSON.parse(raw) as Topic[];
}

export function getTopicById(id: string): Topic | undefined {
  return getTopics().find((t) => t.id === id);
}

export function getProblemsByTopic(topicId: string): ProblemMeta[] {
  return getAllProblems().filter((p) => p.topics.includes(topicId));
}
