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
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
