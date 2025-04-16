import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export default function useChats() {
  const fetchChats = useCallback(async () => {
    return await api.get("/chats", {});
  }, []);

  return useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
}
