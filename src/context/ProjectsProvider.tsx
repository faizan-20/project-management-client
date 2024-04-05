import { ProjectType } from "@/pages/Home";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type ProjectsContextType = {
  projects: ProjectType[];
  favProjects: string[];
  setProjects: Dispatch<SetStateAction<ProjectType[]>>;
  setFavProjects: Dispatch<SetStateAction<string[]>>;
};

const defaultState = {
  projects: [
    {
      key: "",
      title: "",
      owner: {
        email: "",
        firstname: "",
        accessToken: "",
      },
      admins: [],
      users: [],
      _id: "",
    },
  ],
  favProjects: [],
  setProjects: () => {},
  setFavProjects: () => {},
} as ProjectsContextType;

type ProjectsProviderProps = {
  children: ReactNode;
};

export const ProjectsContext = createContext(defaultState);

const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  const [projects, setProjects] = useState<ProjectType[]>(
    defaultState.projects
  );
  const [favProjects, setFavProjects] = useState<string[]>(
    defaultState.favProjects
  );

  return (
    <ProjectsContext.Provider
      value={{ projects, favProjects, setProjects, setFavProjects }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const ProjectsState = () => {
  return useContext(ProjectsContext);
};

export default ProjectsProvider;
