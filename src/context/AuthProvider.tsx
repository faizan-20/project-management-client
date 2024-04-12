import { ProjectType } from "@/pages/Home";
import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type User = {
  firstname: string;
  email: string;
  accessToken: string;
  avatar?: string;
  favoriteProjects?: ProjectType[];
};

export interface AuthContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const defaultState = {
  user: {
    firstname: "",
    email: "",
    accessToken: "",
    favoriteProjects: [],
  },
  setUser: () => {},
} as AuthContextInterface;

export const AuthContext = createContext(defaultState);

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({
    firstname: "",
    email: "",
    accessToken: "",
    favoriteProjects: [],
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
