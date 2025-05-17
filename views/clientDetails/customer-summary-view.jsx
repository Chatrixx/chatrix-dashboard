import api from "@/api/_axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getReadableDate } from "@/util/date";
import { Info } from "lucide-react";

export default function CustomerSummaryView({ data, refetch }) {
  const test =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const handleRefresh = async () => {
    const res = await api.post("/client/generate-summary", {
      clientId: data?.client_id,
    });

    if (res.status === 200) {
      refetch();
    } else {
      console.error("Error generating summary:", res.data);
    }
  };
  return (
    <Card>
      <CardHeader className="grid grid-cols-2 items-center">
        <div className="flex flex-col">
          <CardTitle className="text-lg">Müşteri Özeti</CardTitle>
          <CardDescription>Konuşma analizine dayalı</CardDescription>
        </div>
        {!data?.client_summary && (
          <div className="flex justify-end">
            <Button variant="outline" className="w-fit" onClick={handleRefresh}>
              <span className="text-gray-500">Yenile</span>
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data?.client_summary ? (
            <div>
              <h4 className="font-medium mb-2">Ana Sorun</h4>
              <p className="text-sm text-gray-700">
                {data?.client_summary?.main_issue}
              </p>
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center h-full">
              <Badge className="bg-red-50 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200">
                <Info className="w-6 h-6 mr-2 " />
                <p className="text-lg">Özet için yenileyin</p>
              </Badge>
            </div>
          )}

          {/* <div>
            <h4 className="font-medium mb-2">Önemli Noktalar</h4>
            <ul className="list-disc pl-5 space-y-1">
              {data?.chat_summary?.key_points.map((point, index) => (
                <li key={index} className="text-sm">
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="font-medium mr-2">Duygu Durumu:</span>
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                {data?.chat_summary?.sentiment}
              </Badge>
            </div>
            <div className="text-xs text-gray-500">
              Son güncelleme:{" "}
              {getReadableDate(data?.chat_summary?.last_updated)}
            </div>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
