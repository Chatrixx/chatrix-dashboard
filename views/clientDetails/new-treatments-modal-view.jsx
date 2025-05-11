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
import { Clock, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
export function NewTreatmentsModalView({ customer }) {
  const [treatmentName, setTreatmentName] = useState("");
  const [treatmentPrice, setTreatmentPrice] = useState("");
  const [treatmentDescription, setTreatmentDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddTreatment = async () => {
    setIsLoading(true);
    try {
      if (!treatmentName) {
        toast.error("Lütfen tedavi ismi girin.");
        return;
      }
      if (!treatmentPrice) {
        toast.error("Lütfen tedavi ücreti girin.");
        return;
      }

      //TODO:
      const res = await api.post("/add-treatment", {
        customerId: customer.id,
        treatmentName,
        treatmentPrice,
        treatmentDescription,
      });
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Yeni tedavi eklendi");
      setTreatmentName("");
      setTreatmentPrice("");
      setTreatmentDescription("");
    } catch (error) {
      toast.error(error?.message || "Bilinmeyen bir hata olustu");
    } finally {
      setError("");
      setIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          <Clock className="mr-2 h-4 w-4" />
          Yeni Tedavi Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Yeni Tedavi Ekle</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="treatment" className="text-right">
              Tedavi
            </Label>
            <Input
              id="treatment"
              placeholder="Implant"
              className="col-span-3"
              onChange={(e) => setTreatmentName(e.target.value)}
              value={treatmentName}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Fiyat
            </Label>
            <Input
              id="amount"
              placeholder="0.00"
              type="number"
              className="col-span-3"
              onChange={(e) => setTreatmentPrice(e.target.value)}
              value={treatmentPrice}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="treatment" className="text-right">
              Açıklama
            </Label>
            <Input
              id="description"
              className="col-span-3"
              onChange={(e) => setTreatmentDescription(e.target.value)}
              value={treatmentDescription}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            type="submit"
            onClick={handleAddTreatment}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Ekle"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
