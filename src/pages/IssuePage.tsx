import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IssueType } from "./ProjectBoard";
import { Textarea } from "@/components/ui/textarea";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useIssuesStore } from "@/context/issuesStore";
import ChildIssues from "@/components/ChildIssues";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import IssueComments from "@/components/IssueComments";
import IssueAttachment from "@/components/IssueAttachment";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import AttachedFileList from "@/components/AttachedFileList";
import { ProjectsContext } from "@/context/ProjectsProvider";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

const IssuePage = ({ issue }: { issue: IssueType }) => {
  const [currIssue, setCurrIssue] = useState(issue);
  const [showEditor, setShowEditor] = useState(false);
  const [showCommentEditor, setShowCommentEditor] = useState(false);
  const [description, setDescription] = useState(currIssue.description);

  const [assignee, setAsignee] = useState(currIssue.assignee);

  const [isInputVisible, setIsInputVisible] = useState(false); // set add child issue visibility

  const { currProject } = useContext(ProjectsContext);

  const setIssueStatus = useIssuesStore((state) => state.setIssueStatus);
  const setIssueDescription = useIssuesStore(
    (state) => state.setIssueDescription
  );
  const removeIssue = useIssuesStore((state) => state.removeIssue);

  const axiosPrivate = useAxiosPrivate();

  async function handleStatusChange(e: Event, status: string) {
    e.preventDefault();
    try {
      await axiosPrivate.post(`/issues/update-status/${currIssue._id}`, {
        status,
      });
      setIssueStatus(currIssue._id, status);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDescription() {
    try {
      await axiosPrivate.put(`/issues/update-issue/${currIssue._id}`, {
        description,
      });

      setCurrIssue({ ...currIssue, description });
      setIssueDescription(currIssue._id, description || "");
      setShowEditor(false);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteIssue = async (issueId: string) => {
    try {
      await axiosPrivate.delete(`/issues/${issueId}`);
      removeIssue(currIssue._id);
    } catch (error) {
      console.error(error);
    }
  };

  const addAssignee = async (assigneeId: string) => {
    try {
      const { data } = await axiosPrivate.put(
        `/issues/update-issue/${currIssue._id}`,
        {
          assignee: assigneeId,
        }
      );
      console.log(data);
      setCurrIssue({ ...currIssue, assignee });
      setAsignee(data.assignee);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex p-5">
      <div className="w-[40vw]">
        <Breadcrumb>
          <BreadcrumbList>
            {currIssue.parentIssue ? (
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() =>
                    setCurrIssue(currIssue.parentIssue || currIssue)
                  }
                  className="cursor-pointer"
                >
                  {currIssue.parentIssue.key}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbLink>Add parent</BreadcrumbLink>
              </BreadcrumbItem>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{currIssue.key}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex justify-between">
          <div className="font-semibold text-2xl mb-2 mt-2">
            {currIssue.title}
          </div>
          <ConfirmationDialog
            confirmationFunction={() => deleteIssue(currIssue._id)}
            title={`Delete this issue forever?`}
            description="This action is permanent and connot be undone"
          >
            <Button
              variant="ghost"
              size="icon"
              id="deleteIssue"
              className="hover:text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </Button>
          </ConfirmationDialog>
        </div>
        <div className="flex mb-2">
          <IssueAttachment currIssue={currIssue} />
          <div className="pr-2">
            <Button variant="secondary" onClick={() => setIsInputVisible(true)}>
              Add a Child Issue
            </Button>
          </div>
          <div>
            <Button variant="secondary">
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 mr-1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M9.16488 17.6505C8.92513 17.8743 8.73958 18.0241 8.54996 18.1336C7.62175 18.6695 6.47816 18.6695 5.54996 18.1336C5.20791 17.9361 4.87912 17.6073 4.22153 16.9498C3.56394 16.2922 3.23514 15.9634 3.03767 15.6213C2.50177 14.6931 2.50177 13.5495 3.03767 12.6213C3.23514 12.2793 3.56394 11.9505 4.22153 11.2929L7.04996 8.46448C7.70755 7.80689 8.03634 7.47809 8.37838 7.28062C9.30659 6.74472 10.4502 6.74472 11.3784 7.28061C11.7204 7.47809 12.0492 7.80689 12.7068 8.46448C13.3644 9.12207 13.6932 9.45086 13.8907 9.7929C14.4266 10.7211 14.4266 11.8647 13.8907 12.7929C13.7812 12.9825 13.6314 13.1681 13.4075 13.4078M10.5919 10.5922C10.368 10.8319 10.2182 11.0175 10.1087 11.2071C9.57284 12.1353 9.57284 13.2789 10.1087 14.2071C10.3062 14.5492 10.635 14.878 11.2926 15.5355C11.9502 16.1931 12.279 16.5219 12.621 16.7194C13.5492 17.2553 14.6928 17.2553 15.621 16.7194C15.9631 16.5219 16.2919 16.1931 16.9495 15.5355L19.7779 12.7071C20.4355 12.0495 20.7643 11.7207 20.9617 11.3787C21.4976 10.4505 21.4976 9.30689 20.9617 8.37869C20.7643 8.03665 20.4355 7.70785 19.7779 7.05026C19.1203 6.39267 18.7915 6.06388 18.4495 5.8664C17.5212 5.3305 16.3777 5.3305 15.4495 5.8664C15.2598 5.97588 15.0743 6.12571 14.8345 6.34955"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                </g>
              </svg>
              Link Issue
            </Button>
          </div>
        </div>
        <AttachedFileList currIssue={currIssue} />
        <div className="mb-9">
          <div className="font-semibold text-sm">Description</div>
          {showEditor ? (
            <div className="mt-2 mr-2">
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex gap-2 mt-2">
                <Button onClick={handleDescription}>Save</Button>
                <Button
                  variant="secondary"
                  onClick={() => setShowEditor(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : currIssue.description?.length ? (
            <div
              className="text-sm text-gray-700 mb-2 mt-1 cursor-text h-fit whitespace-pre-wrap"
              onClick={() => setShowEditor(true)}
            >
              {currIssue.description}
            </div>
          ) : (
            <div
              className="text-gray-500 text-sm cursor-text"
              onClick={() => setShowEditor(true)}
            >
              Add a description...
            </div>
          )}
        </div>
        <div>
          <ChildIssues
            currIssue={currIssue}
            isInputVisible={isInputVisible}
            setIsInputVisible={setIsInputVisible}
            setCurrIssue={setCurrIssue}
          />
        </div>
        <IssueComments
          showCommentEditor={showCommentEditor}
          setShowCommentEditor={setShowCommentEditor}
          currIssue={currIssue}
        />
      </div>

      <div className="w-1/2">
        <div className="ml-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                <div className="font-bold">
                  {currIssue.status.toUpperCase()}
                </div>
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
              <DropdownMenuItem onSelect={(e) => handleStatusChange(e, "todo")}>
                To Do
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => handleStatusChange(e, "inprogress")}
              >
                <div className="bg-sky-200">In Progress</div>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(e) => handleStatusChange(e, "done")}>
                <div className="bg-green-200">Done</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="w-full mt-3 ml-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-700">Details</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className=" text-gray-600">Assignee</TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {assignee ? (
                      <TableCell className="text-blue-600/80 cursor-pointer">
                        {assignee.firstname}
                      </TableCell>
                    ) : (
                      <TableCell className="text-blue-600/80 cursor-pointer">
                        Unassigned
                      </TableCell>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => addAssignee(currProject?.owner._id || "")}
                    >
                      <div className="flex gap-3 items-center">
                        <Avatar>
                          <AvatarImage
                            className="rounded-full w-7 h-7"
                            src={`${currProject?.owner.avatar}`}
                          />
                        </Avatar>
                        <div>{currProject?.owner.firstname}</div>
                      </div>
                    </DropdownMenuItem>
                    {currProject?.users.map((user) => (
                      <DropdownMenuItem
                        key={user._id}
                        onSelect={() => addAssignee(user._id)}
                      >
                        <div className="flex gap-3 items-center">
                          <Avatar>
                            <AvatarImage
                              className="rounded-full w-7 h-7"
                              src={`${user.avatar}`}
                            />
                          </Avatar>
                          <div>{user.firstname}</div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableRow>
              <TableRow>
                <TableCell className=" text-gray-600">Parent</TableCell>
                {currIssue.parentIssue ? (
                  <TableCell className=" text-gray-600">
                    {currIssue.parentIssue.title}
                  </TableCell>
                ) : (
                  <TableCell className=" text-gray-600">Unassigned</TableCell>
                )}
              </TableRow>
              <TableRow>
                <TableCell className=" text-gray-600">Reporter</TableCell>
                <TableCell className=" text-gray-600">
                  {currIssue.createdBy?.firstname}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 pl-3">
          <div className=" text-gray-400 text-xs">
            Updated At: {currIssue.updatedAt}
          </div>
          <div className="text-gray-400 text-xs">
            Created At: {currIssue.updatedAt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuePage;
