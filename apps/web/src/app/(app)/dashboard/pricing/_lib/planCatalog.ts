import type { PlanBadge, PlanFeature, PlanTone } from "./types";

export type PlanCatalogEntry = {
  id: "free" | "reflect" | "initiate" | "integrator";
  title: string;
  description: string;
  tone: PlanTone;
  priceEuros: number;
  pricePeriod: "forever" | "month";
  features: PlanFeature[];
  hover?: boolean;
  fixedBadge?: PlanBadge;
};

export const FREE_PLAN: PlanCatalogEntry = {
  id: "free",
  title: "Start free",
  description: "Free journaling. No AI analysis.",
  tone: "default",
  priceEuros: 0,
  pricePeriod: "forever",
  features: [
    { label: "Unlimited journaling", tone: "brand" },
    { label: "AI analyses", kind: "x", muted: true },
  ],
};

export const REFLECT_PLAN: PlanCatalogEntry = {
  id: "reflect",
  title: "Get Reflect",
  description: "Journaling plus 10 AI reflections per month.",
  tone: "default",
  priceEuros: 14,
  pricePeriod: "month",
  hover: true,
  features: [
    { label: "Unlimited journaling", tone: "brand" },
    { label: "10 AI analyses per month", tone: "brand" },
  ],
};

export const INITIATE_PLAN: PlanCatalogEntry = {
  id: "initiate",
  title: "Get Initiate",
  description: "30 AI analyses per month, export & priority support.",
  tone: "brand",
  priceEuros: 29,
  pricePeriod: "month",
  features: [
    { label: "Unlimited journaling", tone: "brand" },
    { label: "30 AI analyses per month", tone: "brand" },
    { label: "Export & priority support", tone: "brand" },
  ],
};

export const INTEGRATOR_PLAN: PlanCatalogEntry = {
  id: "integrator",
  title: "The Integrator",
  description: "Unlimited analyses. Deep work, no limits.",
  tone: "comingSoon",
  priceEuros: 59,
  pricePeriod: "month",
  fixedBadge: { label: "Coming soon", tone: "comingSoon" },
  features: [
    { label: "Unlimited journaling", tone: "amber" },
    { label: "Unlimited AI analyses", tone: "amber" },
    { label: "Export & priority support", tone: "amber" },
    { label: "Archetype deep-dives", tone: "amber" },
  ],
};
