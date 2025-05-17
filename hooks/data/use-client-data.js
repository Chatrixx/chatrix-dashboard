import api from "@/api/_axios";
import { useQuery } from "@tanstack/react-query";
import ENDPOINTS from "@/api/endpoints";

export default function useClientData({ id }) {
  const fetchClient = async () => {
    const client = await api.get(ENDPOINTS.CLIENTS.GET_CLIENT_BY_ID(id));
    return client.data;
  };

  return useQuery({
    queryKey: ["client", id],
    queryFn: fetchClient,
    refetchOnWindowFocus: false,
  });
}
