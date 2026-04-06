import { JungianAnalysisResult } from "@/components/journal/AiAnalysisModal";

export type Entry = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  entry_date: string;
  created_at: string;
};

export type EntriesHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export type EntriesEmptyStateProps = {
  hasSearch: boolean;
};

export type AnalyzeEntryResponse = {
  analysis: JungianAnalysisResult;
  lowConfidence?: boolean;
};
