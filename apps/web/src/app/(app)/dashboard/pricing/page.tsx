import { Suspense } from "react";
import { PricingPageClient } from "./_components/pricingPageClient";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardPricingPage() {
  return (
    <>
      <Toaster />
      <Suspense fallback={<div className="text-slate-500 text-sm">Loading pricing…</div>}>
        <PricingPageClient />
      </Suspense>
    </>
  );
}