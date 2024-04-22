import { useAttachmentStore } from "@/context/attachmentStore";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { IssueType } from "@/pages/ProjectBoard";
import { useEffect } from "react";

export default function AttachedFileList({
  currIssue,
}: {
  currIssue: IssueType;
}) {
  const axiosPrivate = useAxiosPrivate();

  const attachmentName = useAttachmentStore((state) => state.attachment);
  const setAttachmentName = useAttachmentStore((state) => state.setAttachment);

  useEffect(() => {
    setAttachmentName(currIssue.attachment?.originalName);
  }, [setAttachmentName, currIssue.attachment?.originalName]);

  const downloadAttachment = async () => {
    try {
      const { data } = await axiosPrivate.get(
        `/issues/get-attachment/${currIssue._id}`,
        { responseType: "blob" }
      );

      const fileBlob = new Blob([data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(fileBlob);

      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.setAttribute("download", `attach_${currIssue.title}`);

      document.body.appendChild(tempLink);
      tempLink.click();

      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    attachmentName && (
      <div className="my-2 bg-slate-400/10 w-fit px-2 py-1 cursor-pointer text-slate-800 rounded-sm text-xs flex justify-between items-center gap-1">
        <div className="flex items-center gap-2" onClick={downloadAttachment}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3 h-3"
          >
            <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
            <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
          </svg>
          <div>{attachmentName}</div>
        </div>
        <div className="p-2 hover:bg-slate-400/60 rounded-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3 h-3"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </div>
      </div>
    )
  );
}
