export interface ProblemMeta {
  slug: string;
  title: string;
  contest: string;
  year: number;
  round?: string;
  sourceUrl: string;
  solutionPath: string;
  difficulty: "easy" | "medium" | "hard";
  topics: string[];
  complexity: {
    time: string;
    space: string;
  };
}

export interface Problem extends ProblemMeta {
  code: string;
  content: string;
}

export interface ContestYear {
  year: number;
  round?: string;
}

export interface Contest {
  id: string;
  name: string;
  shortName: string;
  years: ContestYear[];
}

export interface Topic {
  id: string;
  name: string;
}
