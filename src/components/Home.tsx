import { useEffect, useState } from "react";
import { CreateProjectDialog } from "./CreateProjectDialog";
import ProjectRow from "./ProjectRow";
import { Input } from "./ui/input";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { User } from "@/context/AuthProvider";

export type ProjectType = {
  key: string;
  title: string;
  description?: string;
  owner: User;
  admins: User[];
  users: User[];
  updatedby?: User;
  _id: string;
};

type ProjectResponseType = {
  projects: ProjectType[];
};

export default function Home() {
  const [projects, setProjects] = useState<ProjectType[]>();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getAllProjects = async () => {
      try {
        const { data } =
          await axiosPrivate.get<ProjectResponseType>("/projects");
        setProjects(data.projects);
      } catch (error) {
        console.error(error);
      }
    };
    getAllProjects();
  }, [axiosPrivate]);

  return (
    <div className="py-6 px-8">
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-semibold">Projects</div>
        <CreateProjectDialog />
      </div>
      <div className="max-w-56">
        <Input
          type="text"
          placeholder="Search projects"
          className="text-sm border-slate-400"
        />
      </div>
      {projects && projects.length > 0 ? (
        <table className="mt-8 w-[100%]">
          <tbody>
            <tr>
              <th className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              </th>
              <th>Name</th>
              <th>Key</th>
              <th>Type</th>
              <th>Lead</th>
              <th className="text-right">More actions</th>
            </tr>
            {projects.map((project) => (
              <ProjectRow key={project._id} project={project} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-slate-600 mt-10">
          You have no projects, create project to get started
        </div>
      )}
    </div>
  );
}
