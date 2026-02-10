import Link from "next/link";

export function TopicTag({ id, name }: { id: string; name?: string }) {
  const label = name ?? id.replace(/-/g, " ");
  return (
    <Link
      href={`/topics/${id}`}
      className="inline-block rounded-md bg-surface px-2 py-0.5 text-xs text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
    >
      {label}
    </Link>
  );
}
