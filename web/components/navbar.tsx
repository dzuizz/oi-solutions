import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold">
          OI-Solutions
        </Link>
        <div className="flex gap-6 text-sm">
          <Link
            href="/problems"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            Problems
          </Link>
          <Link
            href="/contests"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            Contests
          </Link>
          <Link
            href="/topics"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            Topics
          </Link>
        </div>
      </div>
    </nav>
  );
}
