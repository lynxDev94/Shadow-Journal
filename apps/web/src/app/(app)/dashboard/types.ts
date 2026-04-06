export type DashboardStats = {
  totalEntries: number;
  totalWords: number;
  streak: number;
  mostActiveDay: string;
  weekDays: boolean[];
};

export type MoodTrend = {
  labels: string[];
  points: (number | null)[];
};

export type DashboardMood = {
  trend: MoodTrend;
  submittedToday: boolean;
  todayMood: number | null;
};
