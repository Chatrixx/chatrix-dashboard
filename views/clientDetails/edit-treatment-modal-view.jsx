import React, { useEffect, useState } from "react";
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
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function EditTreatmentModalView({
  setEditingTreatment,
  treatment,
}) {
  const [treatmentName, setTreatmentName] = useState(treatment?.name);
  const [treatmentPrice, setTreatmentPrice] = useState(treatment?.price);
  const [treatmentDescription, setTreatmentDescription] = useState(
    treatment?.description,
  );
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
      // const res = await api.put(`/update-treatment`, {
      //   treatmentId: treatment?._id,
      //   treatmentName,
      //   treatmentPrice,
      //   treatmentDescription,
      // });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Tedavi düzelendi");
    } catch (error) {
      toast.error(error?.message || "Bilinmeyen bir hata olustu");
    } finally {
      setError("");
      setIsLoading(false);
    }
  };
  return (
    <Dialog
      open={!!treatment}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setEditingTreatment(null);
        }
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tedaviyi Düzenle</DialogTitle>
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
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Değişiklikleri Kaydet"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
