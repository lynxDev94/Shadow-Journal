import { Button } from "@/components/ui/button";
import type { ExtraAnalysisCardProps } from "../_lib/types";

export function ExtraAnalysisCard({
  displayPriceEur,
  extraPriceId,
  isLoading,
  onBuy,
}: ExtraAnalysisCardProps) {
  const buttonLabel = isLoading
    ? "Redirecting…"
    : extraPriceId
      ? "Buy 1 analysis"
      : "Currently unavailable";

  return (
    <div className="border-dashboard-stroke shadow-card-layered mt-8 rounded-2xl border bg-white p-5 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            One-time · not recurring
          </p>
          <h3 className="font-headline mt-1 text-xl font-bold text-slate-900">
            Extra AI analysis
          </h3>
          <p className="mt-1 max-w-xl text-sm text-slate-600">
            Ran out of monthly analyses or want one more deep dive? Buy a single
            credit. Works whether you&apos;re on a plan or on the free tier -
            credits stack with your subscription allowance.
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-center">
          <div className="text-center sm:text-right">
            <p className="text-2xl font-bold text-slate-900">
              €{displayPriceEur}
            </p>
            <p className="text-xs text-slate-500">one-time payment</p>
          </div>
          <Button
            variant="primary"
            size="lg"
            className="bg-brand hover:bg-brand/90 w-full rounded-xl text-white sm:w-auto"
            disabled={!extraPriceId || isLoading}
            onClick={onBuy}
          >
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
