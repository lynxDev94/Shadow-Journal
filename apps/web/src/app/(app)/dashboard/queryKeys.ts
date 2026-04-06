export const dashboardKeys = {
  all: ["dashboard"] as const,
  mood: (days: number) => [...dashboardKeys.all, "mood", days] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
};
