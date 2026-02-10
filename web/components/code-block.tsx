import { highlightCode } from "@/lib/highlight";
import { CopyButton } from "./copy-button";

export async function CodeBlock({ code }: { code: string }) {
  const html = await highlightCode(code);
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="text-xs font-medium text-muted">C++</span>
        <CopyButton code={code} />
      </div>
      <div
        className="overflow-x-auto text-sm [&_pre]:p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
