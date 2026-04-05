import { Check, X } from "lucide-react";
import type { PlanConfig, PlanFeature } from "../_lib/types";
import { badgeToClass, toneToContainerClass } from "./planCard.styles";

function FeatureItem({ feature }: { feature: PlanFeature }) {
  const usesX = feature.kind === "x";
  const toneClass = feature.tone === "amber" ? "text-amber-500" : "text-brand";
  const itemClass = feature.muted ? "text-slate-400" : "text-slate-600";
  const Icon = usesX ? X : Check;

  return (
    <li className={`flex items-center gap-2 ${itemClass}`}>
      <Icon className={`h-4 w-4 shrink-0 ${usesX ? "" : toneClass}`} />
      {feature.label}
    </li>
  );
}

export function PlanCard({ plan }: { plan: PlanConfig }) {
  const badgeClass = plan.badge ? badgeToClass[plan.badge.tone] : "";
  const hoverClass = plan.hover
    ? "transition-shadow hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)]"
    : "";

  return (
    <div
      className={`relative flex flex-col ${toneToContainerClass[plan.tone]} ${
        hoverClass
      }`}
    >
      {plan.badge && (
        <div className={`absolute top-3 right-3 ${badgeClass}`}>
          {plan.badge.label}
        </div>
      )}

      <h3 className="mb-2 font-sans text-lg font-bold text-slate-900">
        {plan.title}
      </h3>
      <p className="mb-4 text-sm text-slate-500">{plan.description}</p>
      <div className="mb-5 text-2xl font-bold text-slate-900">
        {plan.priceContent}
      </div>
      <ul className="mb-6 space-y-2.5 text-sm">
        {plan.features.map((feature) => (
          <FeatureItem
            key={feature.label}
            feature={feature}
          />
        ))}
      </ul>
      <div className="mt-auto">{plan.cta}</div>
    </div>
  );
}
