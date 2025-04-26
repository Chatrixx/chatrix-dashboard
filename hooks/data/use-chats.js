import api from "@/api/_axios";
import ENDPOINTS from "@/api/endpoints";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export default function useChats({ channel }) {
  const fetchChats = useCallback(async () => {
    return (
      await api.get(ENDPOINTS.CHATS.GET_CHATS, {
        params: {
          channel,
        },
      })
    ).data.map((user) => {
      const messages = user.chats;
      const lastMessage = messages[messages.length - 1];
      return {
        ...user,
        chats: messages,
        lastMessage,
      };
    });
  }, []);

  return useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
    refetchOnWindowFocus: false,
  });
}
