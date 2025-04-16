import { CHANNELS } from "@/constants/channels";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export default function useAnalytics({ date, groupBy }) {
  const fetchAnalytics = useCallback(async () => {
    return await api.get("/analytics", {
      params: {
        startDate: date.from,
        endDate: date.to,
        channel: CHANNELS.INSTAGRAM,
        groupBy,
      },
    });
  }, [date, groupBy]);

  return useQuery({
    queryKey: ["analytics", date, groupBy],
    queryFn: fetchAnalytics,
    enabled: !!date && !!groupBy,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
}
