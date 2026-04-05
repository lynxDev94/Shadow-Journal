import type { ReactNode } from "react";

export type LoadingState = "reflect" | "initiate" | "extra" | "portal" | null;
export type SubscriptionTier = "reflect" | "initiate";

export type PlanFeature = {
  label: string;
  kind?: "check" | "x";
  tone?: "brand" | "amber";
  muted?: boolean;
};

export type PlanBadge = {
  label: string;
  tone: "success" | "brand" | "comingSoon";
};

export type PlanTone = "default" | "brand" | "comingSoon";

export type PlanConfig = {
  id: "free" | "reflect" | "initiate" | "integrator";
  title: string;
  description: string;
  priceContent: ReactNode;
  features: PlanFeature[];
  tone: PlanTone;
  badge?: PlanBadge;
  cta: ReactNode;
  hover?: boolean;
};

export type ExtraAnalysisCardProps = {
  displayPriceEur: number | string;
  extraPriceId: string;
  isLoading: boolean;
  onBuy: () => void;
};

export type PlansGridProps = {
  reflectId: string;
  initiateId: string;
  loading: LoadingState;
  onReflect: boolean;
  onInitiate: boolean;
  onHigherThanReflect: boolean;
  paidActive: boolean;
  onSubscribe: (priceId: string, tier: SubscriptionTier) => void;
};
