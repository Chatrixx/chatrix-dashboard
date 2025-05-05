import api from "@/api/_axios";
import { useQuery } from "@tanstack/react-query";
import ENDPOINTS from "@/api/endpoints";

export default function useClientsData({ searchTerm }) {
  const fetchClients = async () => {
    const clients = await api.get(ENDPOINTS.CLIENTS.GET_CLIENTS, {
      params: {
        searchTerm: searchTerm,
      },
    });
    return clients.data;
  };

  return useQuery({
    queryKey: ["clients", searchTerm],
    queryFn: fetchClients,
    refetchOnWindowFocus: true,
  });
}
