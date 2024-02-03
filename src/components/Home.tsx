import { useContext } from "react";
import { CreateProjectDialog } from "./CreateProjectDialog";
import { AuthContext } from "@/context/AuthProvider";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div>Login Successful: {user.firstname}</div>
      <CreateProjectDialog />
    </div>
  );
}
