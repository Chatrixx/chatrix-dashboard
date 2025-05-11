import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/api/_axios";

export default function AreYouSureModalView({
  setDeletingTreatment,
  treatment,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = (treatmentId) => async () => {
    setIsLoading(true);
    try {
      //   const res = await api.delete(`/delete-treatment/${treatmentId}`);

      toast.success("Tedavi silindi");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // optionally refresh treatment list or trigger parent update
    } catch (error) {
      toast.error(error?.message || "Silme işlemi başarısız");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog
      open={!!treatment}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setDeletingTreatment(null);
        }
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tedaviyi Sil</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Tedadiviyi silmek istediğinizden emin misiniz?
        </DialogDescription>
        <DialogFooter>
          <Button
            className="bg-gray-600 hover:bg-gray-800"
            onClick={() => {
              setDeletingTreatment(null);
            }}
          >
            İptal
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700"
            type="submit"
            onClick={handleDelete(treatment?.id)}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Sil"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
