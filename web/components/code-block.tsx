import { highlightCode } from "@/lib/highlight";

export async function CodeBlock({ code }: { code: string }) {
  const html = await highlightCode(code);
  return (
    <div
      className="overflow-x-auto rounded-lg border border-gray-200 text-sm dark:border-gray-800 [&_pre]:p-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
