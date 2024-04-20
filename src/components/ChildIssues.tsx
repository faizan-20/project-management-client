import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { IssueType } from "@/pages/ProjectBoard";
import { useContext, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { ProjectsContext } from "@/context/ProjectsProvider";

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

  console.log(currIssue);

  const submitHandler = async () => {
    try {
      axiosPrivate.post(`/issues/add-child-issue/${currIssue._id}`, {
        projectId: currProject?._id,
        title,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-9 flex flex-col mr-2">
      <div className="font-semibold text-sm mb-2 flex flex-col gap-1">
        Child issues
      </div>
      {currIssue.childIssues?.map((issue) => (
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
      {isInputVisible && (
        <form className="mt-2">
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
  );
}
