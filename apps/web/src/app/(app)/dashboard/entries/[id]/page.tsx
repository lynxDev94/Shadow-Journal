"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AiAnalysisModal } from "@/components/journal/AiAnalysisModal";
import { useEntryDetail } from "../hooks/useEntryDetail";
import { EntryAnalysisCard } from "./_components/entryAnalysisCard";
import { EntryDetailContent } from "./_components/entryDetailContent";
import { DeleteEntryDialog } from "./_components/deleteEntryDialog";

export default function EntryReadPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : null;
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const {
    entry,
    isLoading,
    isError,
    queryError,
    credits,
    creditsLoading,
    canAnalyze,
    deleteMutation,
    analyzeMutation,
    analysisResult,
    analysisError,
    runDelete,
    runAnalyze,
  } = useEntryDetail(id);

  const handleAnalyze = () => {
    setAnalysisOpen(true);
    runAnalyze();
  };

  if (isLoading) {
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

  if (isError) {
    return (
      <div className="mx-auto max-w-4xl font-sans text-slate-800">
        <Link
          href="/dashboard/entries"
          className="hover:text-brand mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to History
        </Link>
        <div className="border-dashboard-stroke rounded-2xl border border-dashed bg-slate-50/50 p-12 text-center">
          <p className="text-sm font-medium text-slate-600">
            Could not load this entry right now.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {queryError || "Please refresh and try again."}
          </p>
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
        <EntryDetailContent
          entry={entry}
          onDeleteClick={() => setDeleteOpen(true)}
        />

        <div className="space-y-4">
          <EntryAnalysisCard
            canAnalyze={canAnalyze}
            creditsLoading={creditsLoading}
            credits={credits}
            body={entry.body ?? ""}
            analyzing={analyzeMutation.isPending}
            onAnalyze={handleAnalyze}
          />
        </div>
      </div>

      <DeleteEntryDialog
        open={deleteOpen}
        deleting={deleteMutation.isPending}
        onOpenChange={setDeleteOpen}
        onConfirmDelete={runDelete}
      />

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
