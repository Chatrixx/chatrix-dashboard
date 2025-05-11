import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getReadableDate } from "@/util/date";
import { Check, Trash } from "lucide-react";
import React, { useState } from "react";
import AreYouSureModalView from "./are-you-sure-modal-view";

export default function CompletedTreatmentsView({ customer }) {
  const [deletingTreatment, setDeletingTreatment] = useState(null);

  return (
    <Card>
      <AreYouSureModalView
        key={deletingTreatment?.id}
        treatment={deletingTreatment}
        setDeletingTreatment={setDeletingTreatment}
      />
      <CardHeader>
        <CardTitle className="text-lg">Tamamlanan Tedaviler</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 overflow-y-auto max-h-96">
          {customer.portfolio.treatments
            .filter((treatment) => treatment.status === "Tamamlandı")
            .map((treatment, index) => (
              <div
                key={index}
                className="flex items-start p-3 border rounded-lg"
              >
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{treatment.name}</h4>
                      <p className="text-sm text-gray-500">
                        {getReadableDate(treatment.date)}
                      </p>
                    </div>
                    {/* add items-center for shorter badge */}
                    <div className="flex space-x-2">
                      <Badge
                        className="bg-green-100 text-green-800"
                        variant="outline"
                      >
                        {treatment.status}
                      </Badge>
                      <Button
                        className="w-4 h-auto text-red-600 border-red-200 hover:bg-red-600 hover:text-white"
                        onClick={() => {
                          setDeletingTreatment(treatment);
                        }}
                        variant="outline"
                      >
                        <Trash />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button variant="outline" size="sm">
                      Detaylar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          {customer.portfolio.treatments.filter(
            (treatment) => treatment.status === "Tamamlandı",
          ).length === 0 && (
            <div className="text-center py-6 text-gray-500">
              Tamamlanan tedavi bulunmamaktadır.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
