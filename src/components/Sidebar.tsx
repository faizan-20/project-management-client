import { ProjectsContext } from "@/context/ProjectsProvider";
import { ProjectType } from "@/pages/Home";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Sidebar() {
  const { projects } = useContext(ProjectsContext);
  const { projectId } = useParams();
  const [currProject, setCurrProject] = useState<ProjectType>();

  useEffect(() => {
    setCurrProject(projects.find((project) => project._id === projectId));
  }, [projectId, projects]);

  return (
    <>
      <div className="flex flex-col border-r-4 border-gray-200 w-1/6 p-5 h-[calc(100vh-3rem)]">
        <div className="py-2">
          <div className="font-bold text-base text-gray-600">
            {currProject?.title}
          </div>
          <div className="text-xs text-gray-400">Software Project</div>
        </div>

        <div className="py-3">
          <div className="text-gray-600 text-xs font-bold">PLANNING</div>
          <div className="">
            <a className="cursor-pointer">
              <div className="text-base font-normal text-gray-500 py-2">
                Board
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
