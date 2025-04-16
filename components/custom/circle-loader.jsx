import { Loader2 } from "lucide-react";
import React from "react";

export default function CircleLoader() {
  return (
    <div className="flex items-center justify-center w-full py-4">
      <Loader2 className="animate-spin text-teal-500" size={24} />
    </div>
  );
}
