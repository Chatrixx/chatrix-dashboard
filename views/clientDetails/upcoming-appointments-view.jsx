import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import React from "react";
import AddAppointmentModalView from "./add-appointment-modal-view";
import { getReadableDate } from "@/util/date";

export default function UpcomingAppointmentsView({ customer }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };
  return (
    <Card className="md:col-span-1 max-h-min">
      <CardHeader>
        <CardTitle className="text-lg">Yaklaşan Randevular</CardTitle>
        <CardDescription>
          Toplam: {customer.portfolio.appointmentCount} randevu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-auto">
          {customer.portfolio.appointments
            .filter((apt) => {
              const now = new Date();
              const aptDate = new Date(apt.date);
              const oneWeekLater = new Date();
              oneWeekLater.setDate(now.getDate() + 7);
              return aptDate >= now && aptDate <= oneWeekLater;
            })
            .map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-start p-3 border rounded-lg"
              >
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{appointment.type}</h4>
                      <p className="text-sm text-gray-500">
                        {formatDate(appointment.date)}
                      </p>
                    </div>
                    <Badge
                      variant={
                        appointment.status === "Onaylandı"
                          ? "default"
                          : "outline"
                      }
                    >
                      {appointment.status}
                    </Badge>
                  </div>

                  {appointment.notes && (
                    <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      {appointment.notes}
                    </p>
                  )}
                  <div className="mt-3 flex space-x-2">
                    <Button variant="outline" size="sm">
                      Düzenle
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 border-red-200 hover:bg-red-50"
                    >
                      İptal Et
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <AddAppointmentModalView customer={customer} />
      </CardContent>
    </Card>
  );
}
