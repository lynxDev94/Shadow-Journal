import type { ReactNode } from "react";
import type { PlanCatalogEntry } from "../_lib/planCatalog";
import type { PlanBadge, PlanConfig } from "../_lib/types";
import { PlanPriceLine } from "./planPriceLine";

type PlanConfigFromCatalogOptions = {
  cta: ReactNode;
  badge?: PlanBadge;
  hover?: boolean;
};

export function planConfigFromCatalog(
  entry: PlanCatalogEntry,
  options: PlanConfigFromCatalogOptions,
): PlanConfig {
  return {
    id: entry.id,
    title: entry.title,
    description: entry.description,
    tone: entry.tone,
    features: entry.features,
    hover: options.hover ?? entry.hover,
    badge: options.badge ?? entry.fixedBadge,
    priceContent: (
      <PlanPriceLine
        euros={entry.priceEuros}
        periodLabel={entry.pricePeriod}
      />
    ),
    cta: options.cta,
  };
}
