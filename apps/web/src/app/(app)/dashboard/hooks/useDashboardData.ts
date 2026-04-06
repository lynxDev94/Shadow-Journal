import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchDashboardMood,
  fetchDashboardStats,
  submitMoodScore,
} from "../api";
import { dashboardKeys } from "../queryKeys";

const MOOD_WINDOW_DAYS = 7;

export function useDashboardData() {
  const queryClient = useQueryClient();
  const [moodValue, setMoodValue] = useState(50);

  const moodQuery = useQuery({
    queryKey: dashboardKeys.mood(MOOD_WINDOW_DAYS),
    queryFn: () => fetchDashboardMood(MOOD_WINDOW_DAYS),
  });

  const statsQuery = useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: fetchDashboardStats,
  });

  const submitMoodMutation = useMutation({
    mutationFn: submitMoodScore,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: dashboardKeys.mood(MOOD_WINDOW_DAYS),
      });
    },
  });

  useEffect(() => {
    if (typeof moodQuery.data?.todayMood === "number") {
      setMoodValue(moodQuery.data.todayMood);
    }
  }, [moodQuery.data?.todayMood]);

  return {
    moodValue,
    setMoodValue,
    submittedToday: moodQuery.data?.submittedToday ?? false,
    trendLabels: moodQuery.data?.trend.labels ?? [],
    trendPoints: moodQuery.data?.trend.points ?? [],
    trendLoading: moodQuery.isPending,
    moodLoading: moodQuery.isFetching,
    submitLoading: submitMoodMutation.isPending,
    stats: statsQuery.data ?? null,
    onSubmitMood: () => submitMoodMutation.mutate(moodValue),
  };
}
