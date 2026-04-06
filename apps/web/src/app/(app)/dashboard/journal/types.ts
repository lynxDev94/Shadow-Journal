import type { JungianAnalysisResult } from "@/components/journal/AiAnalysisModal";
import type { LucideIcon } from "lucide-react";

export type JournalTag = {
  id: string;
  label: string;
};

export type PromptCategory = {
  id: string;
  title: string;
  icon: LucideIcon;
  prompts: string[];
};

export type JournalEntry = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  entry_date: string;
};

export type AnalyzeJournalResponse = {
  analysis: JungianAnalysisResult;
  lowConfidence?: boolean;
};

export type JournalEditorPaneProps = {
  title: string;
  body: string;
  referencePrompt: string | null;
  wordCount: number;
  statusText: string;
  canAnalyze: boolean;
  saveLoading: boolean;
  editLoading: boolean;
  analysisLoading: boolean;
  isEdit: boolean;
  onTitleChange: (value: string) => void;
  onBodyChange: (value: string) => void;
  onOpenPrompts: () => void;
  onClearReferencePrompt: () => void;
  onAnalyze: () => void;
  onSave: () => void;
};

export type JournalHeaderProps = {
  isEdit: boolean;
};

export type JournalSidebarProps = {
  creditsLoading: boolean;
  credits: number | null;
  tags: JournalTag[];
  newTag: string;
  onNewTagChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (id: string) => void;
};

export type PromptIdeasDialogProps = {
  open: boolean;
  selectedPrompt: string | null;
  categories: PromptCategory[];
  onOpenChange: (open: boolean) => void;
  onSelectPrompt: (prompt: string | null) => void;
  onShuffle: () => void;
  onApply: () => void;
};
