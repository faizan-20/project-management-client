import { axiosPrivate } from "@/api/axios";
import { ProjectType } from "@/pages/Home";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function Sidebar() {
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

    // setCurrProject(projects.find((project) => project._id === projectId));
  }, [projectId]);

  return (
    <>
      <div className="flex flex-col border-r-4 border-gray-200 min-w-[15rem] w-1/6 p-5 h-[calc(100vh-3rem)]">
        <div className="py-2">
          <div className="font-bold text-base text-gray-600">
            {currProject?.title}
          </div>
          <div className="text-xs text-gray-400">Software Project</div>
        </div>

        <div className="py-3 flex flex-col gap-1">
          <div className="text-gray-600 text-xs font-bold pb-3">PLANNING</div>

          <NavLink
            to={`/project/${projectId}/board`}
            className={({ isActive }) =>
              isActive
                ? "bg-blue-50 border-l-4 font-bold border-blue-700 text-blue-700 inline-block w-full rounded-sm"
                : "text-gray-500 inline-block w-full"
            }
          >
            <div className="text-base p-2 cursor-pointer">Board</div>
          </NavLink>

          <NavLink
            to={`/project/${projectId}/timeline`}
            className={({ isActive }) =>
              isActive
                ? "bg-blue-50 border-l-4 font-bold border-blue-700 text-blue-700 inline-block w-full rounded-sm"
                : "text-gray-500 inline-block w-full"
            }
          >
            <div className="text-base p-2 cursor-pointer">Timeline</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
