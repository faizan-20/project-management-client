import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect, useRef, useState } from "react";
import IssueCard from "@/components/IssueCard";
import { Input } from "./ui/input";
import { useIssuesStore } from "@/context/store";

export default function ProgressBoard({
  issueSearch,
  projectId,
}: {
  issueSearch: string;
  projectId: string | undefined;
}) {
  const { issues, addIssue } = useIssuesStore((state) => ({
    issues: state.issues,
    addIssue: state.addIssue,
  }));

  const [visibleSection, setVisibleSection] = useState("");
  const [issueTitle, setIssueTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const axiosPrivate = useAxiosPrivate();

  console.log("progressBoard");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setVisibleSection("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    status: string
  ) => {
    if (e.key === "Escape") {
      setIssueTitle("");
      setVisibleSection("");
    }

    if (e.key === "Enter") {
      try {
        const { data } = await axiosPrivate.post("/issues/create-issue", {
          projectId,
          title: issueTitle,
          status,
        });
        setIssueTitle("");
        addIssue(data.issue);
      } catch (error) {
        console.error(error);
      } finally {
        setVisibleSection("");
      }
    }
  };

  const renderInputField = (status: string) => {
    return (
      <div>
        <Input
          type="text"
          name="issue"
          id={`input-${status}`}
          placeholder="What needs to be done?"
          className="px-2 text-base border-2 w-full h-20 bg-primary-foreground"
          onKeyDown={(e) => handleKeyDown(e, status)}
          ref={inputRef}
          value={issueTitle}
          onChange={(e) => setIssueTitle(e.target.value)}
        />
      </div>
    );
  };

  useEffect(() => {
    if (visibleSection && inputRef.current) {
      inputRef.current.focus();
    }
  }, [visibleSection]);

  return (
    <div className="flex gap-4 mt-6">
      {["todo", "inprogress", "done"].map((status) => (
        <div
          className="bg-slate-100 h-full min-h-32 w-60 rounded-sm px-1"
          key={status}
        >
          <div className="text-xs text-gray-500 font-semibold m-4 mt-6">
            {status.toUpperCase()}
          </div>
          <div>
            {issues
              .filter((issue) => {
                return issueSearch.toLowerCase() === ""
                  ? issue
                  : issue.title
                      .toLowerCase()
                      .includes(issueSearch.toLowerCase()) ||
                      issue.key
                        .toLowerCase()
                        .includes(issueSearch.toLowerCase());
              })
              .map((issue) => {
                if (issue.status === status) {
                  return <IssueCard key={issue._id} issue={issue} />;
                }
              })}
          </div>
          {!visibleSection && (
            <div
              className={`text-sm font-semibold text-slate-800 mx-2 hover:bg-slate-200 p-2 cursor-pointer flex transition-colors`}
              onClick={() => setVisibleSection(status)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-slate-500"
              >
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              </svg>
              <div>Create issue</div>
            </div>
          )}
          {visibleSection === status && renderInputField(status)}
        </div>
      ))}
    </div>
  );
}
