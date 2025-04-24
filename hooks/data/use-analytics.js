import { CHANNELS } from "@/constants/channels";
import api from "@/api/_axios";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import ENDPOINTS from "@/api/endpoints";

export default function useAnalytics({ date, groupBy }) {
  const fetchAnalytics = useCallback(async () => {
    return await api.get(ENDPOINTS.ANALYTICS.GET_ANALYTICS, {
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
  });
}
