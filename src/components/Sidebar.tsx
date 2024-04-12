import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { ProjectType } from "@/pages/Home";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function Sidebar() {
  const { projectId } = useParams();
  const axiosPrivate = useAxiosPrivate();

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
                ? "bg-blue-50 border-l-4 font-bold border-blue-700 text-blue-700 inline-block w-full rounded-sm stroke-blue-700"
                : "text-gray-500 inline-block w-full stroke-gray-600"
            }
          >
            <div className="flex items-center pl-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
              <div className="text-base p-2 pl-1 cursor-pointer">Board</div>
            </div>
          </NavLink>

          <NavLink
            to={`/project/${projectId}/timeline`}
            className={({ isActive }) =>
              isActive
                ? "bg-blue-50 border-l-4 font-bold border-blue-700 text-blue-700 inline-block w-full rounded-sm stroke-blue-700"
                : "text-gray-500 inline-block w-full stroke-gray-600"
            }
          >
            <div className="flex items-center pl-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                />
              </svg>
              <div className="text-base p-2 pl-1 cursor-pointer">Timeline</div>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
