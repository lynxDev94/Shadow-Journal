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

export type DeleteEntryDialogProps = {
  open: boolean;
  deleting: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
};

export type EntryAnalysisCardProps = {
  canAnalyze: boolean;
  creditsLoading: boolean;
  credits: number | null;
  body: string;
  analyzing: boolean;
  onAnalyze: () => void;
};

export type EntryDetailContentProps = {
  entry: Entry;
  onDeleteClick: () => void;
};
