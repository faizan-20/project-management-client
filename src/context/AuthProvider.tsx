import { ProjectType } from "@/pages/Home";
import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type User = {
  _id: string;
  firstname: string;
  lastname?: string;
  email: string;
  accessToken: string;
  avatar?: string;
  favoriteProjects?: ProjectType[];
};

export interface AuthContextInterface {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const defaultState = {
  user: {
    _id: "",
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
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
