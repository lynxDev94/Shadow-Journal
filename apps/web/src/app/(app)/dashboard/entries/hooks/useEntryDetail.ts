import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { countJournalWords } from "@/lib/journal-word-count";
import { MIN_WORDS_FOR_ANALYSIS } from "@/lib/constants";
import { useCreditsContext } from "@/providers/Credits";
import { analyzeEntryById, deleteEntryById, fetchEntryById } from "../api";
import { entriesKeys } from "../queryKeys";

export function useEntryDetail(id: string | null) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    credits,
    loading: creditsLoading,
    refreshCredits,
  } = useCreditsContext();

  const entryQuery = useQuery({
    queryKey: entriesKeys.detail(id),
    queryFn: () => fetchEntryById(id as string),
    enabled: Boolean(id),
    staleTime: 30_000,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEntryById,
    onSuccess: () => {
      router.push("/dashboard/entries");
      void queryClient.invalidateQueries({ queryKey: entriesKeys.all });
      void queryClient.invalidateQueries({ queryKey: entriesKeys.detail(id) });
    },
  });

  const analyzeMutation = useMutation({
    mutationFn: analyzeEntryById,
    onSuccess: () => {
      void refreshCredits();
    },
  });

  const entry = entryQuery.data ?? null;
  const isLoading = Boolean(id) && entryQuery.isLoading;
  const isError = entryQuery.isError;
  const queryError =
    entryQuery.error instanceof Error ? entryQuery.error.message : null;

  const entryWordCount = entry ? countJournalWords(entry.body ?? "") : 0;
  const canAnalyzeLength = entryWordCount >= MIN_WORDS_FOR_ANALYSIS;
  const canAnalyzeCredits = !creditsLoading && credits !== null && credits >= 1;
  const canAnalyze = canAnalyzeCredits && canAnalyzeLength;

  const analysisResult = analyzeMutation.data
    ? {
        ...analyzeMutation.data.analysis,
        lowConfidence: Boolean(analyzeMutation.data.lowConfidence),
      }
    : null;
  const analysisError =
    analyzeMutation.error instanceof Error
      ? analyzeMutation.error.message
      : null;

  const runDelete = () => {
    if (!id) return;
    deleteMutation.mutate(id);
  };

  const runAnalyze = () => {
    if (!id || !canAnalyze) return;
    analyzeMutation.reset();
    analyzeMutation.mutate(id);
  };

  return {
    entry,
    isLoading,
    isError,
    queryError,
    credits,
    creditsLoading,
    canAnalyze,
    entryWordCount,
    deleteMutation,
    analyzeMutation,
    analysisResult,
    analysisError,
    runDelete,
    runAnalyze,
  };
}
