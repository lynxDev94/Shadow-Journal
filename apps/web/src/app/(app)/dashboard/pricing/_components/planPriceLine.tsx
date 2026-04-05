type PlanPriceLineProps = {
  euros: number;
  periodLabel: "forever" | "month";
};

export function PlanPriceLine({ euros, periodLabel }: PlanPriceLineProps) {
  const suffix = periodLabel === "forever" ? "/ forever" : "/ month";

  return (
    <>
      €{euros}{" "}
      <span className="text-sm font-normal text-slate-500">{suffix}</span>
    </>
  );
}
