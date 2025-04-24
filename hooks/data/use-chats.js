import api from "@/api/_axios";
import ENDPOINTS from "@/api/endpoints";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export default function useChats() {
  const fetchChats = useCallback(async () => {
    return await api.get(ENDPOINTS.CHATS.GET_CHATS);
  }, []);

  return useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
    refetchOnWindowFocus: false,
  });
}
