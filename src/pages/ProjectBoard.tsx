import ProgressBoard from "@/components/ProgressBoard";
import { Input } from "@/components/ui/input";
import { ProjectsContext } from "@/context/ProjectsProvider";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { ProjectType } from "@/pages/Home";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type IssueType = {
  _id: string;
  type: string;
  projectId: string;
  title: string;
  key: string;
  status: string;
};

function ProjectBoard() {
  const { projectId } = useParams();
  const axiosPrivate = useAxiosPrivate();

  const { favProjects, setFavProjects } = useContext(ProjectsContext);

  const [currProject, setCurrProject] = useState<ProjectType>();
  const [allIssues, setAllIssues] = useState<IssueType[]>([]);

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
        const { data } = await axiosPrivate.get(`/issues/${projectId}`);
        setAllIssues(data.issues);
      } catch (error) {
        console.error(error);
      }
    };

    getCurrProject();
    getAllIssues();
  }, [projectId]);

  const toggleFavoriteProject = async () => {
    try {
      if (favProjects.includes(currProject?._id ? currProject._id : "")) {
        await axiosPrivate.post(
          `/projects/remove-favour-project/${currProject?._id}`
        );
        setFavProjects((prevArray) =>
          prevArray.filter((item) => item !== currProject?._id)
        );
      } else {
        await axiosPrivate.post(
          `/projects/add-favour-project/${currProject?._id}`
        );
        setFavProjects([
          ...favProjects,
          currProject?._id ? currProject._id : "",
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col px-6">
      <div className="text-gray-600 text-sm tracking-wide">
        Projects / {currProject?.title}
      </div>
      <div className="flex flex-row justify-between">
        <div className="font-semibold py-4 text-2xl">
          {currProject?.key} board
        </div>
        <div className="py-4" onClick={toggleFavoriteProject}>
          {favProjects.includes(currProject?._id ? currProject._id : "") ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-amber-400 hover:cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-slate-400 hover:text-slate-900 hover:cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          )}
        </div>
      </div>
      <div>
        <Input
          type="text"
          name="search-issue"
          id="search-issue"
          placeholder="Search"
          className="px-2 text-base border-slate-200 border-2 max-w-60"
        />
      </div>
      <ProgressBoard
        allIssues={allIssues}
        projectId={projectId}
        setAllIssues={setAllIssues}
      />
    </div>
  );
}

export default ProjectBoard;
