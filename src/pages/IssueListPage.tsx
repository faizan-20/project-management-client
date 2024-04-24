import IssueCard from "@/components/IssueCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { ProjectsContext } from "@/context/ProjectsProvider";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { IssueType } from "./ProjectBoard";

function IssueListPage() {
  const [searchIssue, setSearchIssue] = useState("");
  const [issueFilter, setIssueFilter] = useState({
    isChild: false,
    status: "",
    assignee: "",
  });

  const { projectId } = useParams<{ projectId: string }>();
  const { currProject, setCurrProject } = useContext(ProjectsContext);

  const [allIssues, setAllIssues] = useState<IssueType[]>([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getCurrProject = async () => {
      try {
        const { data } = await axiosPrivate.get(`/projects/${projectId}`);
        setCurrProject(data.project);
      } catch (error) {
        console.error(error);
      }
    };
    const getAllIssues = async () => {
      try {
        const { data } = await axiosPrivate.get(
          `/issues/get-all-issues-project/${projectId}`
        );
        setAllIssues(data.issues);
      } catch (error) {
        console.error(error);
      }
    };
    getAllIssues();

    if (!currProject) {
      getCurrProject();
    }
  }, [projectId, axiosPrivate, currProject, setCurrProject]);

  return (
    <>
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Project</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/project/${currProject?._id}/board`}>
                  {currProject?.title}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="text-2xl font-semibold mb-5">Issues</div>

      <div className="mb-4 flex gap-2">
        <div className="max-w-56">
          <Input
            type="text"
            placeholder="Search Issues"
            value={searchIssue}
            onChange={(e) => setSearchIssue(e.target.value)}
          />
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                <div className="font-bold">Type</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 font-bold ml-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-semibold">
              <DropdownMenuItem
                onClick={() =>
                  setIssueFilter({ ...issueFilter, isChild: false })
                }
              >
                <div>Task</div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setIssueFilter({ ...issueFilter, isChild: true })
                }
              >
                <div>Sub Task</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                <div className="font-bold">Status</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 font-bold ml-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-semibold">
              <DropdownMenuItem
                onClick={() =>
                  setIssueFilter({ ...issueFilter, status: "todo" })
                }
              >
                <div>To Do</div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setIssueFilter({ ...issueFilter, status: "inprogress" })
                }
              >
                <div className="bg-sky-200">In Progress</div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setIssueFilter({ ...issueFilter, status: "done" })
                }
              >
                <div className="bg-green-200">Done</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                <div className="font-bold">Assignee</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 font-bold ml-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-semibold">
              {currProject?.users.concat(currProject.admins).map((user) => (
                <DropdownMenuItem
                  key={user._id}
                  className="flex gap-2"
                  onClick={() =>
                    setIssueFilter({ ...issueFilter, assignee: user.firstname })
                  }
                >
                  <Avatar>
                    <AvatarImage
                      src={user.avatar}
                      className="rounded-full w-4 h-4"
                    />
                  </Avatar>
                  <div>{user.firstname}</div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setIssueFilter({ isChild: false, status: "", assignee: "" })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </Button>
        </div>
      </div>

      <div className="flex border-2 w-72 h-[70vh] overflow-auto py-1 bg-slate-200">
        <div className="flex flex-col w-72">
          {allIssues
            .filter((issue) => {
              // Filter by search keyword
              const searchMatch =
                searchIssue.toLowerCase() === "" ||
                issue.title.toLowerCase().includes(searchIssue.toLowerCase()) ||
                issue.key.toLowerCase().includes(searchIssue.toLowerCase());

              // Filter by type
              const typeMatch =
                issueFilter.isChild === false ||
                issue.isChild === issueFilter.isChild;

              // Filter by status
              const statusMatch =
                issueFilter.status === "" ||
                issue.status === issueFilter.status;

              // Filter by assignee
              const assigneeMatch =
                issueFilter.assignee === "" ||
                issue.assignee?.firstname === issueFilter.assignee;

              return searchMatch && typeMatch && statusMatch && assigneeMatch;
            })
            .map((issue) => (
              <IssueCard key={issue._id} issue={issue} />
            ))}
        </div>
      </div>
    </>
  );
}

export default IssueListPage;
