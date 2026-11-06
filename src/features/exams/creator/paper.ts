export type PaperSettings = {
  title: string;
  subtitle: string;
  minutes: number;
  markEach: number;
  negative: number;
  columns: 1 | 2;
  letters: "bn" | "en";
  size: "sm" | "md" | "lg";
  answerKey: boolean;
};
