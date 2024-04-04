import { axiosPrivate } from "@/api/axios";
import { ProjectType } from "@/pages/Home";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function ProjectBoard() {
  const { projectId } = useParams();
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
  }, [projectId]);

  return (
    <div className="flex flex-col px-6">
      <div className="text-gray-600 text-sm tracking-wide">Projects / {currProject?.title}</div>
      <div className="flex flex-row justify-between">
        <div className="font-semibold py-4 text-2xl">{currProject?.key} board</div>
        <div className="py-4">
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
        </div>
      </div>
      <div>
        Search bar
      </div>

      <div className="flex flex-row">
        <div className="border-2 bg-gray-100 h-60 w-60"></div>
        <div className="border-2 bg-gray-100 h-60 w-60"></div>
        <div className="border-2 bg-gray-100 h-60 w-60"></div>
      </div>
    </div>
  )
}

export default ProjectBoard;