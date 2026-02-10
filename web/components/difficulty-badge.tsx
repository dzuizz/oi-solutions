const config = {
  easy: {
    dot: "bg-green-500",
    badge: "bg-green-100 text-green-800 dark:bg-green-400/10 dark:text-green-400",
  },
  medium: {
    dot: "bg-yellow-500",
    badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-400/10 dark:text-yellow-400",
  },
  hard: {
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-800 dark:bg-red-400/10 dark:text-red-400",
  },
};

export function DifficultyBadge({
  difficulty,
}: {
  difficulty: "easy" | "medium" | "hard";
}) {
  const { dot, badge } = config[difficulty];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {difficulty}
    </span>
  );
}
