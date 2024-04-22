import IssueCard from "@/components/IssueCard";
import { useIssuesStore } from "@/context/issuesStore";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useParams } from "react-router-dom";
import { ProjectType } from "./Home";
import { useEffect, useState } from "react";
import { axiosPrivate } from "@/api/axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function IssueListPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const issues = useIssuesStore((state) => state.issues);
  const [currProject, setCurrProject] = useState<ProjectType>();

  useEffect(() => {
    const getCurrProject = async () => {
      try {
        const { data } = await axiosPrivate.get(`/projects/${projectId}`);
        setCurrProject(data.project);
      } catch (error) {
        console.error(error);
      }
    };

    getCurrProject();
  }, [projectId, axiosPrivate]);

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
          <Input type="text" placeholder="Search Issues" />
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                <div className="font-bold">Project : {currProject?.title}</div>
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
              <DropdownMenuItem>
                <input type="checkbox" className="mr-2" /> {currProject?.title}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
              <DropdownMenuItem>
                <input type="checkbox" className="mr-2" /> Epic
              </DropdownMenuItem>
              <DropdownMenuItem>
                <input type="checkbox" className="mr-2" /> Task
              </DropdownMenuItem>
              <DropdownMenuItem>
                <input type="checkbox" className="mr-2" /> Subtask
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
              <DropdownMenuItem>
                <input type="checkbox" className="mr-2" /> To Do
              </DropdownMenuItem>
              <DropdownMenuItem>
                <input type="checkbox" className="mr-2" />
                <div className="bg-sky-200">In Progress</div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <input type="checkbox" className="mr-2" />
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
              <DropdownMenuItem>
                <input type="checkbox" className="mr-2" /> Assignee1
              </DropdownMenuItem>
              <DropdownMenuItem>
                <input type="checkbox" className="mr-2" /> Assignee2
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex border-2 w-72 h-[70vh] overflow-auto py-5 bg-slate-200">
        <div className="flex flex-col w-72">
          {issues.map((issue) => (
            <IssueCard key={issue._id} issue={issue} />
          ))}
        </div>
      </div>
    </>
  );
}

export default IssueListPage;
