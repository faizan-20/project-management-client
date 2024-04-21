import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { IssueType } from "@/pages/ProjectBoard";
import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { ProjectsContext } from "@/context/ProjectsProvider";
import { useIssuesStore } from "@/context/issuesStore";

export default function ChildIssues({
  currIssue,
  isInputVisible,
  setIsInputVisible,
  setCurrIssue,
}: {
  currIssue: IssueType;
  isInputVisible: boolean;
  setIsInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrIssue: React.Dispatch<React.SetStateAction<IssueType>>;
}) {
  const [title, setTitle] = useState("");

  const axiosPrivate = useAxiosPrivate();
  const { currProject } = useContext(ProjectsContext);

  const childIssues = useIssuesStore((state) => state.childIssues);
  const setChildIssues = useIssuesStore((state) => state.setChildIssues);
  const addChildIssue = useIssuesStore((state) => state.addChildIssue);

  useEffect(() => {
    const getAllChildIssues = async () => {
      try {
        const { data } = await axiosPrivate.get(
          `/issues/get-all-child/${currIssue._id}`
        );
        setChildIssues(data.childIssues);
        console.log(data.childIssues);
      } catch (error) {
        console.error(error);
      }
    };

    getAllChildIssues();
  }, [axiosPrivate, currIssue._id, setChildIssues]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axiosPrivate.post(
        `/issues/add-child-issue/${currIssue._id}`,
        {
          projectId: currProject?._id,
          title,
        }
      );
      addChildIssue(data.childIssue);
      setTitle("");
    } catch (error) {
      console.error(error);
    }
  };

  return childIssues.length || isInputVisible ? (
    <div className="mb-9 flex flex-col mr-2">
      <div className="font-semibold text-sm mb-2 flex flex-col gap-1">
        Child issues
      </div>
      <div className="flex flex-col gap-2">
        {childIssues.map((issue) => (
          <Card
            key={issue._id}
            className="flex text-sm px-2 justify-between items-center"
            onClick={() => setCurrIssue(issue)}
          >
            <div className="flex gap-4">
              <div className="text-sky-600 font-bold">{issue.key}</div>
              <div>{issue.title}</div>
            </div>
            <div className="p-2 bg-gray-100 m-2 text-xs rounded-sm font-bold">
              {issue.status.toUpperCase()}
            </div>
          </Card>
        ))}
      </div>
      {isInputVisible && (
        <form className="mt-2" onSubmit={(e) => submitHandler(e)}>
          <Input
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="mt-2">
            <Button className="text-sm" type="submit">
              Create
            </Button>
            <Button
              className="text-sm"
              variant="ghost"
              onClick={() => setIsInputVisible(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  ) : (
    <></>
  );
}
