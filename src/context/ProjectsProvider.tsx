import { ProjectType } from "@/components/Home";
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
  setProjects: Dispatch<SetStateAction<ProjectType[]>>;
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
  setProjects: () => {},
} as ProjectsContextType;

type ProjectsProviderProps = {
  children: ReactNode;
};

export const ProjectsContext = createContext(defaultState);

const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  const [projects, setProjects] = useState<ProjectType[]>(
    defaultState.projects
  );

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const ProjectsState = () => {
  return useContext(ProjectsContext);
};

export default ProjectsProvider;
