import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getReadableDate } from "@/util/date";
import React from "react";

export default function TreatmentHistoryView({ customer }) {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">Tedavi Geçmişi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-y-auto max-h-96">
          <div className="space-y-1">
            {customer.portfolio.treatments.map((treatment, index) => (
              <div key={index} className="flex gap-2">
                <div className="mt-1 min-h-max flex flex-col items-center">
                  <div
                    className={`h-4 w-4 rounded-full 
                            ${
                              treatment.status === "Tamamlandı"
                                ? "bg-green-200"
                                : ""
                            }
                            bg-gray-200 mb-2`}
                  />
                  <div
                    className={`flex-grow w-0.5 
                            ${
                              treatment.status === "Tamamlandı"
                                ? "bg-green-200"
                                : ""
                            }
                            bg-gray-200`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b">
                    <div>
                      <h4 className="font-medium">{treatment.name}</h4>
                      <p className="text-sm text-gray-500">
                        {getReadableDate(treatment.date)}
                      </p>
                    </div>
                    <Badge
                      variant={
                        treatment.status === "Tamamlandı"
                          ? "default"
                          : "outline"
                      }
                      className={`mt-2 md:mt-0 ${
                        treatment.status === "Tamamlandı"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }`}
                    >
                      {treatment.status}
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm mb-4">
                    <p>Tedavi notları burada görüntülenecektir.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
