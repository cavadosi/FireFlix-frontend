import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background animate-fade-in pl-2">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-lg text-secondary-foreground">Loading...</p>
      </div>
    </div>
  );
}
