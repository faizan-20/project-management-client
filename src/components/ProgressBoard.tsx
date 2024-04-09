import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect, useRef, useState } from "react";
import IssueCard from "@/components/IssueCard";
import { IssueType } from "@/pages/ProjectBoard";
import { Input } from "./ui/input";

export default function ProgressBoard({
  allIssues,
  projectId,
  setAllIssues,
}: {
  allIssues: IssueType[];
  projectId: string | undefined;
  setAllIssues: React.Dispatch<React.SetStateAction<IssueType[]>>;
}) {
  const [issueVisible, setIssueVisible] = useState(false);
  const [progressIssueVisible, setProgressIssueVisible] = useState(false);
  const [doneIssueVisible, setDoneIssueVisible] = useState(false);
  const [issueTitle, setIssueTitle] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const progressInputRef = useRef<HTMLInputElement>(null);
  const doneInputRef = useRef<HTMLInputElement>(null);
  const axiosPrivate = useAxiosPrivate();

  const handleKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    status: string
  ) => {
    console.log();
    if (e.key === "Escape") {
      setIssueVisible(false);
      setProgressIssueVisible(false);
      setDoneIssueVisible(false);
    }

    if (e.key === "Enter") {
      try {
        const { data } = await axiosPrivate.post("/issues/create-issue", {
          projectId,
          title: issueTitle,
          status: status,
        });
        setIssueTitle("");
        setAllIssues([...allIssues, data.issue]);
      } catch (error) {
        console.error(error);
      } finally {
        setIssueVisible(false);
        setProgressIssueVisible(false);
        setDoneIssueVisible(false);
      }
    }
  };

  // Focus on the input element when the div becomes visible
  useEffect(() => {
    if (issueVisible && inputRef.current) {
      inputRef.current.focus();
    }
    if (progressIssueVisible && progressInputRef.current) {
      progressInputRef.current.focus();
    }
    if (doneIssueVisible && doneInputRef.current) {
      doneInputRef.current.focus();
    }
  }, [issueVisible, progressIssueVisible, doneIssueVisible]);

  return (
    <div className="flex gap-4 mt-6">
      <div className="bg-slate-100 h-full min-h-32 w-60">
        <div className="text-xs text-gray-500 font-semibold m-4 mt-6">
          TO DO
        </div>
        <div>
          {allIssues.map((issue) => {
            if (issue.status === "todo") {
              return (
                <IssueCard
                  key={issue._id}
                  title={issue.title}
                  issueKey={issue.key}
                />
              );
            }
          })}
        </div>
        {!issueVisible ? (
          <div
            className={`text-sm font-semibold text-slate-800 mx-2 hover:bg-slate-200 p-2 cursor-pointer flex transition-colors`}
            onClick={() => setIssueVisible(true)}
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
        ) : (
          <div>
            <Input
              type="text"
              name="issue"
              id="issue"
              placeholder="What needs to be done?"
              className="px-2 text-base border-2 w-full h-20 bg-primary-foreground"
              onKeyDown={(e) => handleKeyDown(e, "todo")}
              ref={inputRef}
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="bg-slate-100 h-full min-h-32 w-60">
        <div className="text-xs text-gray-500 font-semibold m-4 flex justify-between items-center">
          <div>IN PROGRESS</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-7 h-7 text-slate-500 hover:bg-slate-200 rounded-sm cursor-pointer p-1 transition-all"
            onClick={() => setProgressIssueVisible(true)}
          >
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
        </div>
        <div>
          {allIssues.map((issue) => {
            if (issue.status === "inprogress") {
              return (
                <IssueCard
                  key={issue._id}
                  title={issue.title}
                  issueKey={issue.key}
                />
              );
            }
          })}
        </div>
        {progressIssueVisible && (
          <div>
            <Input
              type="text"
              name="issue"
              id="progress-issue"
              placeholder="What needs to be done?"
              className="px-2 text-base border-2 w-full h-20 bg-primary-foreground"
              onKeyDown={(e) => handleKeyDown(e, "inprogress")}
              ref={progressInputRef}
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="bg-slate-100 h-full min-h-32 w-60">
        <div className="text-xs text-gray-500 font-semibold m-4 flex justify-between items-center">
          <div>DONE</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-7 h-7 text-slate-500 hover:bg-slate-200 rounded-sm cursor-pointer p-1 transition-all"
            onClick={() => setDoneIssueVisible(true)}
          >
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
        </div>
        <div>
          {allIssues.map((issue) => {
            if (issue.status === "done") {
              return (
                <IssueCard
                  key={issue._id}
                  title={issue.title}
                  issueKey={issue.key}
                />
              );
            }
          })}
        </div>
        {doneIssueVisible && (
          <div>
            <Input
              type="text"
              name="issue"
              id="progress-issue"
              placeholder="What needs to be done?"
              className="px-2 text-base border-2 w-full h-20 bg-primary-foreground"
              onKeyDown={(e) => handleKeyDown(e, "done")}
              ref={doneInputRef}
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
