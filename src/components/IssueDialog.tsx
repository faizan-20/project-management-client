import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import IssuePage from "@/pages/IssuePage";
import { ReactNode } from "react";

export function IssueDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[60vw] h-content">
        <IssuePage />
      </DialogContent>
    </Dialog>
  );
}
