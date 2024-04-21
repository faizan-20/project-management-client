import { IssueType } from "@/pages/ProjectBoard";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type AllIssuesContextType = {
  allIssues: IssueType[];
  setAllIssues: Dispatch<SetStateAction<IssueType[]>>;
};

const defaultState: AllIssuesContextType = {
  allIssues: [],
  setAllIssues: () => {},
};

export const AllIssuesContext = createContext(defaultState);

const AllIssuesProvider = ({ children }: { children: ReactNode }) => {
  const [allIssues, setAllIssues] = useState<IssueType[]>(
    defaultState.allIssues
  );

  return (
    <AllIssuesContext.Provider value={{ allIssues, setAllIssues }}>
      {children}
    </AllIssuesContext.Provider>
  );
};

export const AllIssuesState = () => {
  return useContext(AllIssuesContext);
};

export default AllIssuesProvider;
