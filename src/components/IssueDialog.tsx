import IssuePage from "@/pages/IssuePage";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { ReactNode } from "react";

export default function IssueDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <IssuePage />
      </DialogContent>
    </Dialog>
  );
}
