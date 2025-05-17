import api from "@/api/_axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AddAppointmentModalView({ customer }) {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [appointmentStatus, setAppointmentStatus] = useState("");
  const [appointmentNote, setAppointmentNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleAddAppointment = async () => {
    setIsLoading(true);

    try {
      if (!appointmentDate) {
        toast.error("Lütfen Tarih Giriniz.");
        return;
      }
      if (!appointmentType) {
        toast.error("Lütfen Randevu Türü Giriniz.");
        return;
      }
      if (!appointmentStatus) {
        toast.error("Lütfen Randevu Durumu Giriniz.");
        return;
      }
      //   const res = await api.post("/add-appointment", {
      //     customerId: customer._id,
      //     appointmentDate,
      //     appointmentType,
      //     appointmentStatus,
      //     appointmentNote,
      //   });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Randevu eklendi");
      setAppointmentDate("");
      setAppointmentNote("");
      setAppointmentStatus("");
      setAppointmentType("");
    } catch (error) {
      toast.error(error?.message || "Bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
          <Calendar className="mr-2 h-4 w-4" />
          Yeni Randevu Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Yeni Randevu Ekle</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Tarih
            </Label>
            <Input
              id="date"
              placeholder=""
              type="datetime-local"
              className="col-span-3"
              onChange={(e) => setAppointmentDate(e.target.value)}
              value={appointmentDate}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Randevu Türü
            </Label>
            <Input
              id="type"
              placeholder="Tedavi"
              type="text"
              className="col-span-3"
              onChange={(e) => setAppointmentType(e.target.value)}
              value={appointmentType}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Randevu Durumu
            </Label>
            <Input
              id="status"
              placeholder="Planlandı"
              type="text"
              className="col-span-3"
              onChange={(e) => setAppointmentStatus(e.target.value)}
              value={appointmentStatus}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="note" className="text-right">
              Randevu Notu
            </Label>
            <Input
              id="note"
              className="col-span-3"
              onChange={(e) => setAppointmentNote(e.target.value)}
              value={appointmentNote}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            type="submit"
            onClick={handleAddAppointment}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Ekle"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
