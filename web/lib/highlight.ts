import { codeToHtml } from "shiki";

export async function highlightCode(code: string): Promise<string> {
  return codeToHtml(code, {
    lang: "cpp",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });
}
