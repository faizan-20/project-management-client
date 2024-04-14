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
              <svg viewBox="0 -0.5 25 25" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.918 10.0005H7.082C6.66587 9.99708 6.26541 10.1591 5.96873 10.4509C5.67204 10.7427 5.50343 11.1404 5.5 11.5565V17.4455C5.5077 18.3117 6.21584 19.0078 7.082 19.0005H9.918C10.3341 19.004 10.7346 18.842 11.0313 18.5502C11.328 18.2584 11.4966 17.8607 11.5 17.4445V11.5565C11.4966 11.1404 11.328 10.7427 11.0313 10.4509C10.7346 10.1591 10.3341 9.99708 9.918 10.0005Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.918 4.0006H7.082C6.23326 3.97706 5.52559 4.64492 5.5 5.4936V6.5076C5.52559 7.35629 6.23326 8.02415 7.082 8.0006H9.918C10.7667 8.02415 11.4744 7.35629 11.5 6.5076V5.4936C11.4744 4.64492 10.7667 3.97706 9.918 4.0006Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.082 13.0007H17.917C18.3333 13.0044 18.734 12.8425 19.0309 12.5507C19.3278 12.2588 19.4966 11.861 19.5 11.4447V5.55666C19.4966 5.14054 19.328 4.74282 19.0313 4.45101C18.7346 4.1592 18.3341 3.9972 17.918 4.00066H15.082C14.6659 3.9972 14.2654 4.1592 13.9687 4.45101C13.672 4.74282 13.5034 5.14054 13.5 5.55666V11.4447C13.5034 11.8608 13.672 12.2585 13.9687 12.5503C14.2654 12.8421 14.6659 13.0041 15.082 13.0007Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.082 19.0006H17.917C18.7661 19.0247 19.4744 18.3567 19.5 17.5076V16.4936C19.4744 15.6449 18.7667 14.9771 17.918 15.0006H15.082C14.2333 14.9771 13.5256 15.6449 13.5 16.4936V17.5066C13.525 18.3557 14.2329 19.0241 15.082 19.0006Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </g>
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
