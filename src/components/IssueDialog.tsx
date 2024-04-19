import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import IssuePage from "@/pages/IssuePage";
import { IssueType } from "@/pages/ProjectBoard";
import { ReactNode } from "react";

export function IssueDialog({
  children,
  issue,
}: {
  children: ReactNode;
  issue: IssueType;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-[65vw] min-h-[60vh] top-[40%] max-h-[70vh]">
        <IssuePage issue={issue} />
      </DialogContent>
    </Dialog>
  );
}
