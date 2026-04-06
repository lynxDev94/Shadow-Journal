"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useCreditsContext } from "@/providers/Credits";
import { countJournalWords } from "@/lib/journal-word-count";
import type { Entry } from "../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Lightbulb,
  MessageCircle,
  Pencil,
  Sparkles,
  Trash2,
} from "lucide-react";
import { AiAnalysisModal } from "@/components/journal/AiAnalysisModal";
import { formatDateTime } from "@/lib/utils";
import type { AnalyzeEntryResponse } from "../types";

const MIN_WORDS_FOR_ANALYSIS = 200;

async function fetchEntryById(id: string): Promise<Entry | null> {
  const response = await fetch(`/api/entries/${id}`);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error("Failed to load entry.");
  }

  const data = await response.json();
  return data?.entry ?? null;
}

async function deleteEntryById(id: string): Promise<void> {
  const response = await fetch(`/api/entries/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Failed to delete entry.");
  }
}

async function analyzeEntryById(id: string): Promise<AnalyzeEntryResponse> {
  const response = await fetch(`/api/entries/${id}/analysis`, {
    method: "POST",
  });
  const data = await response.json();
  if (!response.ok || !data?.analysis) {
    throw new Error(
      (typeof data?.message === "string" && data.message) ||
        (typeof data?.error === "string" && data.error) ||
        "Analysis failed",
    );
  }

  return data;
}

export default function EntryReadPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    credits,
    loading: creditsLoading,
    refreshCredits,
  } = useCreditsContext();
  const id = typeof params.id === "string" ? params.id : null;
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(false);

  const entryQuery = useQuery({
    queryKey: ["entry", id],
    queryFn: () => fetchEntryById(id as string),
    enabled: Boolean(id),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEntryById,
    onSuccess: () => {
      setDeleteOpen(false);
      router.push("/dashboard/entries");
      void queryClient.invalidateQueries({ queryKey: ["entries"] });
      void queryClient.invalidateQueries({ queryKey: ["entry", id] });
    },
  });

  const analyzeMutation = useMutation({
    mutationFn: analyzeEntryById,
    onSuccess: () => {
      void refreshCredits();
    },
  });

  const entry = entryQuery.data ?? null;
  const loading = Boolean(id) && entryQuery.isLoading;
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

  const entryWordCount = entry ? countJournalWords(entry.body ?? "") : 0;
  const canAnalyzeLength = entryWordCount >= MIN_WORDS_FOR_ANALYSIS;
  const canAnalyzeCredits = !creditsLoading && credits !== null && credits >= 1;
  const canAnalyze = canAnalyzeCredits && canAnalyzeLength;

  const handleDelete = async () => {
    if (!id) return;
    deleteMutation.mutate(id);
  };

  const handleAnalyze = async () => {
    if (!id || !canAnalyze) return;
    setAnalysisOpen(true);
    analyzeMutation.reset();
    analyzeMutation.mutate(id);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl font-sans text-slate-800">
        <Link
          href="/dashboard/entries"
          className="hover:text-brand mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to History
        </Link>
        <div className="flex h-48 items-center justify-center">
          <div className="border-brand h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="mx-auto max-w-4xl font-sans text-slate-800">
        <Link
          href="/dashboard/entries"
          className="hover:text-brand mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to History
        </Link>
        <p className="mt-8 text-slate-600">Entry not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl font-sans text-slate-800">
      <Link
        href="/dashboard/entries"
        className="hover:text-brand mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to History
      </Link>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]">
        <div className="border-dashboard-stroke shadow-card-layered rounded-2xl border bg-white p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                {formatDateTime(entry.created_at)}
              </p>
              <h1 className="font-headline mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                {entry.title || "Untitled reflection"}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/dashboard/journal?edit=${entry.id}`}>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  aria-label="Edit entry"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                aria-label="Delete entry"
                onClick={() => setDeleteOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {entry.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="prose prose-slate mt-8 max-w-none">
            {(entry.body || "")
              .split("\n\n")
              .filter(Boolean)
              .map((paragraph, i) => (
                <p
                  key={i}
                  className="mb-4 text-base leading-relaxed text-slate-700"
                >
                  {paragraph}
                </p>
              ))}
            {!entry.body?.trim() && (
              <p className="text-slate-500 italic">No content</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-dashboard-stroke shadow-card-layered rounded-2xl border bg-white">
            <div className="border-dashboard-stroke bg-brand/5 flex items-center gap-2 border-b px-5 py-3.5">
              <Lightbulb className="text-brand h-5 w-5 shrink-0" />
              <h2 className="text-brand font-sans text-sm font-bold tracking-wider uppercase">
                AI Analysis
              </h2>
            </div>
            <div className="space-y-4 p-5">
              <p className="text-sm text-slate-600">
                Run a Jungian analysis grounded in your local knowledge base for
                themes, projections, questions, and one shadow-work exercise.
                Uses{" "}
                <span className="font-medium text-slate-800">1 credit</span> per
                run. The entry body must be at least{" "}
                <span className="font-medium text-slate-800">
                  {MIN_WORDS_FOR_ANALYSIS} words
                </span>
                .
              </p>
              {!creditsLoading && credits !== null && credits < 1 && (
                <p className="text-sm text-amber-800">
                  You&apos;re out of credits.{" "}
                  <Link
                    href="/dashboard/pricing"
                    className="text-brand font-semibold underline-offset-2 hover:underline"
                  >
                    Pricing
                  </Link>
                </p>
              )}
              <Button
                variant="primary"
                className="bg-brand hover:bg-brand/90 w-full gap-2 rounded-xl text-white"
                onClick={handleAnalyze}
                disabled={
                  analyzeMutation.isPending ||
                  !canAnalyze ||
                  !entry.body?.trim()
                }
              >
                <Sparkles className="h-4 w-4" />
                {analyzeMutation.isPending ? "Analyzing..." : "Analyze with AI"}
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2 rounded-xl"
                disabled
              >
                <MessageCircle className="h-4 w-4" />
                Dialogue with this Shadow
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete entry</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The entry will be permanently
              removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AiAnalysisModal
        open={analysisOpen}
        onOpenChange={setAnalysisOpen}
        loading={analyzeMutation.isPending}
        error={analysisError}
        result={analysisResult}
      />
    </div>
  );
}
