import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Edit, Loader2, Trash } from "lucide-react";
import React, { useState } from "react";
import { NewTreatmentsModalView } from "./new-treatments-modal-view";
import { Button } from "@/components/ui/button";
import EditTreatmentModalView from "./edit-treatment-modal-view";
import { toast } from "sonner";
import { getReadableDate } from "@/util/date";
import AreYouSureModalView from "./are-you-sure-modal-view";
import api from "@/api/_axios";

export default function CurrentTreatmentsView({ customer }) {
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [loadingTreatmentId, setLoadingTreatmentId] = useState(null);
  const [deletingTreatment, setDeletingTreatment] = useState(null);
  const handleDone = (treatmentId) => async () => {
    setLoadingTreatmentId(treatmentId);
    try {
      // const res = await api.put(`/update-treatment`, {
      //   treatmentId,
      //   treatmentStatus: "Tamamlandı",
      // });
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Tedavi tamamlandı olarak işaretlendi");
    } catch (err) {
      toast.error(err?.message || "Hata oluştu");
    } finally {
      setLoadingTreatmentId(null);
    }
  };
  return (
    <Card>
      <EditTreatmentModalView
        key={editingTreatment?.id}
        treatment={editingTreatment}
        setEditingTreatment={setEditingTreatment}
      />
      <AreYouSureModalView
        key={deletingTreatment?.id}
        treatment={deletingTreatment}
        setDeletingTreatment={setDeletingTreatment}
      />
      <CardHeader>
        <CardTitle className="text-lg">Mevcut Tedaviler</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 overflow-y-scroll max-h-96">
          {customer.portfolio.treatments
            .filter((treatment) => treatment?.status !== "Tamamlandı")
            .map((treatment, index) => (
              <div
                key={index}
                className="flex items-start p-3 border rounded-lg"
              >
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{treatment?.name}</h4>
                      <p className="text-sm text-gray-500">
                        {getReadableDate(treatment?.date)}
                      </p>
                    </div>
                    <div className="flex  space-x-2">
                      <Badge variant="outline">{treatment?.status}</Badge>
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
                  <div className="mt-3 flex space-x-2 justify-between">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Detaylar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-200 hover:bg-green-50"
                        onClick={handleDone(treatment.id)}
                      >
                        {loadingTreatmentId === treatment.id ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Tamamlandı Olarak İşaretle"
                        )}
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        onClick={() => {
                          setEditingTreatment(treatment);
                        }}
                      >
                        <Edit className="mr-1 w-4 h-4" />
                        Düzenle
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {customer.portfolio.treatments.filter(
            (treatment) => treatment?.status !== "Tamamlandı",
          ).length === 0 && (
            <div className="text-center py-6 text-gray-500">
              Mevcut tedavi bulunmamaktadır.
            </div>
          )}
        </div>
        <NewTreatmentsModalView customer={customer} />
      </CardContent>
    </Card>
  );
}
