import { Link } from "react-router-dom";
import { ProjectType } from "./Home";

type ProjectRowProps = {
  project: ProjectType;
};

function ProjectRow({ project }: ProjectRowProps) {
  return (
    <tr>
      <td className="text-center">
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
      </td>
      <td className="text-blue-800 hover:underline min-w-[6vw] max-w-[6vw] hover:cursor-pointer">
        {project.title}
      </td>
      <td className="min-w-[5vw]">{project.key}</td>
      <td className="max-w-[7vw]">Team-managed Software</td>
      <td className="text-blue-800 max-w-[6vw]">
        <Link to="#" className="hover:underline">
          {project.owner.firstname}
        </Link>
      </td>
      <td className="flex justify-end">
        <div className="p-1 hover:bg-slate-200 rounded-sm cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </div>
      </td>
    </tr>
  );
}

export default ProjectRow;
