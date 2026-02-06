import Link from "next/link";

export function TopicTag({ id, name }: { id: string; name?: string }) {
  const label = name ?? id.replace(/-/g, " ");
  return (
    <Link
      href={`/topics/${id}`}
      className="inline-block rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
    >
      {label}
    </Link>
  );
}
