import type { PlanBadge, PlanTone } from "../_lib/types";

export const toneToContainerClass: Record<PlanTone, string> = {
  default:
    "border-dashboard-stroke shadow-card-layered rounded-2xl border bg-white p-5 md:p-6",
  brand:
    "border-brand/40 shadow-card-layered overflow-hidden rounded-2xl border-2 bg-white p-5 md:p-6",
  comingSoon:
    "border-dashboard-stroke shadow-card-layered rounded-2xl border bg-white/80 p-5 md:p-6",
};

export const badgeToClass: Record<PlanBadge["tone"], string> = {
  success:
    "rounded-lg bg-emerald-600 px-2 py-1 text-[10px] font-bold tracking-tighter text-white uppercase",
  brand:
    "bg-brand rounded-lg px-2 py-1 text-[10px] font-bold tracking-tighter text-white uppercase",
  comingSoon:
    "border-amber-500/40 bg-amber-500/10 rounded-lg border px-2 py-1 text-[10px] font-bold tracking-tighter text-amber-700 uppercase",
};
