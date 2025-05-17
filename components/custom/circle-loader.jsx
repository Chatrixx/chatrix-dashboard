import { Loader2 } from "lucide-react";
import React from "react";

export default function CircleLoader() {
  return (
    <div className="flex items-center justify-center w-full py-4 animate-fade-in">
      <div className="animate-pulse">
        <Loader2 className="animate-spin text-primary-foreground" size={24} />
      </div>
    </div>
  );
}
