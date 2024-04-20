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
  currProject: ProjectType | null;
  setCurrProject: Dispatch<SetStateAction<ProjectType | null>>;
};

const defaultState: ProjectsContextType = {
  projects: [],
  favProjects: [],
  setProjects: () => {},
  setFavProjects: () => {},
  currProject: null,
  setCurrProject: () => {},
};

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
  const [currProject, setCurrProject] = useState<ProjectType | null>(
    defaultState.currProject
  );

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        favProjects,
        setProjects,
        setFavProjects,
        currProject,
        setCurrProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const ProjectsState = () => {
  return useContext(ProjectsContext);
};

export default ProjectsProvider;
