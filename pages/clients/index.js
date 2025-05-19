import ClientCard from "@/components/custom/client-card";
import MainLayout from "@/components/custom/layout/main-layout";
import { Input } from "@/components/ui/input";
import useClientsData from "@/hooks/data/use-clients";
import { useDebounce } from "@/hooks/use-debounce";
import { Loader2, SearchX } from "lucide-react";
import { useState } from "react";

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState("");
  const q = useDebounce(searchTerm);
  const { data, isFetching } = useClientsData({ searchTerm: q });

  const RenderEmptyContent = () => (
    <div className="animate-fade-in w-full flex justify-center py-24 items-center gap-4">
      <SearchX className="text-muted-foreground" />
      <p className="text-muted-foreground">
        Bu aramaya uygun bir sonuç bulunamadı. Başka bir anahtar kelime ile
        deneyin.
      </p>
    </div>
  );

  const RenderLoader = () => (
    <div className="animate-fade-in w-full flex justify-center py-24">
      <Loader2 className="animate-spin" />
    </div>
  );

  const RenderData = () => (
    <div className="grid grid-cols-1 gap-2.5">
      {data?.map((patient, index) => (
        <ClientCard key={index} client={patient} />
      ))}
    </div>
  );

  return (
    <div className="space-y-4 p-4 w-full animate-fade-in">
      <div className="w-full mb-4">
        <Input
          placeholder="Bir hastanın adını veya numarasını giriniz.."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      {isFetching && RenderLoader()}
      {!isFetching && !data?.length > 0 && RenderEmptyContent()}
      {!isFetching && data?.length > 0 && RenderData()}
    </div>
  );
}

Clients.getLayout = (children) => <MainLayout>{children}</MainLayout>;
