import { useContext } from "react";
import { CreateProjectDialog } from "./CreateProjectDialog";
import { AuthContext } from "@/context/AuthProvider";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-hero h-screen flex flex-col">
      <div>Login Successful: {user.firstname}</div>
      <div>
        <CreateProjectDialog />
      </div>
    </div>
  );
}
