import { useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { axiosPrivate } from "@/api/axios";
import { IssueType } from "@/pages/ProjectBoard";
import { useAttachmentStore } from "@/context/attachmentStore";

export default function IssueAttachment({
  currIssue,
}: {
  currIssue: IssueType;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setAttachment = useAttachmentStore((state) => state.setAttachment);

  const attachFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = e.target.files ? e.target.files[0] : undefined;

    try {
      await axiosPrivate.post(
        `/issues/add-attachment/${currIssue._id}`,
        {
          file: fileUploaded,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAttachment(e.target.files ? e.target.files[0].name : undefined);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pr-2">
      <Button
        variant="secondary"
        className="font-semibold"
        onClick={() => fileInputRef.current?.click()}
      >
        <svg
          viewBox="0 0 28 28"
          className="w-5 h-5 mr-1"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="2"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <title>attachment-2</title>
            <g id="Page-1" strokeWidth="2" fill="none" fillRule="evenodd">
              <g
                id="Icon-Set"
                transform="translate(-258.000000, -154.000000)"
                fill="#000000"
              >
                <path
                  d="M284.562,164.181 L270.325,178.26 C267.966,180.593 264.141,180.593 261.782,178.26 C259.423,175.928 259.423,172.146 261.782,169.813 L274.596,157.141 C276.168,155.586 278.718,155.586 280.291,157.141 C281.863,158.696 281.863,161.218 280.291,162.772 L267.477,175.444 C266.691,176.222 265.416,176.222 264.629,175.444 C263.843,174.667 263.843,173.406 264.629,172.628 L276.02,161.365 L274.596,159.957 L263.206,171.221 C261.633,172.775 261.633,175.297 263.206,176.853 C264.778,178.407 267.328,178.407 268.901,176.852 L281.714,164.181 C284.073,161.849 284.074,158.065 281.715,155.733 C279.355,153.4 275.531,153.4 273.172,155.733 L259.646,169.108 L259.696,169.157 C257.238,172.281 257.455,176.797 260.358,179.668 C263.262,182.539 267.828,182.754 270.987,180.323 L271.036,180.372 L285.986,165.589 L284.562,164.181"
                  id="attachment-2"
                >
                  {" "}
                </path>
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
        <div>Attach</div>
      </Button>
      <Input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={attachFile}
      />
    </div>
  );
}
