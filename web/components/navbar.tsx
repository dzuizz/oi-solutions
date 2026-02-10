"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar({ problemCount }: { problemCount?: number }) {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || (href === "/" && pathname === "/problems");
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-3">
        <Link href="/" className="flex items-center gap-1.5 font-mono text-lg font-bold tracking-tight">
          <span className="text-primary">&lt;/&gt;</span>
          <span>OI-Solutions</span>
        </Link>

        <div className="mx-4 h-5 w-px bg-border" />

        <div className="flex gap-3 text-xs sm:gap-5 sm:text-sm">
          <Link
            href="/"
            className={`relative py-1 transition-colors ${
              isActive("/")
                ? "text-foreground font-medium"
                : "text-muted hover:text-foreground"
            }`}
          >
            Problems
            {problemCount != null && (
              <span className="ml-1.5 rounded-full bg-primary-subtle px-1.5 py-0.5 text-xs font-normal text-primary">
                {problemCount}
              </span>
            )}
            {isActive("/") && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full translate-y-[13px] rounded-full bg-primary" />
            )}
          </Link>
          <Link
            href="/contests"
            className={`relative py-1 transition-colors ${
              isActive("/contests") || pathname.startsWith("/contests")
                ? "text-foreground font-medium"
                : "text-muted hover:text-foreground"
            }`}
          >
            Contests
            {(isActive("/contests") || pathname.startsWith("/contests")) && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full translate-y-[13px] rounded-full bg-primary" />
            )}
          </Link>
          <Link
            href="/topics"
            className={`relative py-1 transition-colors ${
              isActive("/topics") || pathname.startsWith("/topics")
                ? "text-foreground font-medium"
                : "text-muted hover:text-foreground"
            }`}
          >
            Topics
            {(isActive("/topics") || pathname.startsWith("/topics")) && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full translate-y-[13px] rounded-full bg-primary" />
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
