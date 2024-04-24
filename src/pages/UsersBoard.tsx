import { Link, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import UserCard from "@/components/UserCard";
import { useContext, useEffect, useState } from "react";
import { ProjectsContext } from "@/context/ProjectsProvider";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { User } from "@/context/AuthProvider";
import { useToast } from "@/components/ui/use-toast";
import { isAxiosError } from "axios";

function UserBoard() {
  const { currProject, setCurrProject } = useContext(ProjectsContext);
  const owner = currProject?.owner;
  const admins = currProject?.admins;
  const users = currProject?.users;

  const [otherUsers, setOtherUsers] = useState<User[]>();
  const [searchProjectUser, setSearchProjectUser] = useState("");
  const [searchOtherUser, setSearchOtherUser] = useState("");

  const { projectId } = useParams<{ projectId: string }>();
  const { toast } = useToast();

  const axiosPrivate = useAxiosPrivate();

  const getAllOtherUsers = async () => {
    try {
      const { data } = await axiosPrivate.get(
        `/projects/get-all-not-project-user/${projectId}`
      );
      setOtherUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllOtherUsers();
  }, []);

  const changeRole = async (role: string, userId: string | undefined) => {
    if (userId === currProject?.owner._id) {
      return toast({
        title: "Cannot change owner",
      });
    }
    try {
      await axiosPrivate.put(`/projects/change-role/${currProject?._id}`, {
        role,
        userId,
      });
      getCurrProject();
      getAllOtherUsers();
      toast({
        title: "User role changed successfully",
      });
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          variant: "destructive",
          title: error?.response?.data?.message,
        });
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (!currProject) {
      getCurrProject();
      getAllOtherUsers();
    }
  }, [currProject]);

  const getCurrProject = async () => {
    try {
      const { data } = await axiosPrivate.get(`/projects/${projectId}`);
      setCurrProject(data.project);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col px-6 overflow-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Project</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/project/${currProject?._id}/board`}>
                {currProject?.title}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="font-semibold py-4 text-2xl">Users</div>
      <div className="flex justify-between">
        <Input
          type="text"
          name="search-issue"
          value={searchProjectUser}
          onChange={(e) => setSearchProjectUser(e.target.value)}
          id="search-issue"
          placeholder="Search project users"
          className="px-2 text-base border-slate-200 border-2 max-w-60"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8 my-4">
        {/* --------------------- OWNER ------------------- */}
        <UserCard
          key={owner?._id}
          user={owner}
          role={"Owner"}
          changeRole={changeRole}
        />

        {/* --------------------- ADMIN ------------------- */}
        {admins
          ?.filter((admin) => {
            return searchProjectUser.toLowerCase() === ""
              ? admin
              : admin.firstname
                  .toLowerCase()
                  .includes(searchProjectUser.toLowerCase()) ||
                  admin.email
                    .toLowerCase()
                    .includes(searchProjectUser.toLowerCase());
          })
          .map((admin) => {
            if (owner?._id !== admin._id) {
              return (
                <UserCard
                  key={admin?._id}
                  user={admin}
                  role={"Admin"}
                  changeRole={changeRole}
                />
              );
            }
          })}

        {/* --------------------- USERS ------------------- */}
        {users
          ?.filter((user) => {
            return searchProjectUser.toLowerCase() === ""
              ? user
              : user.firstname
                  .toLowerCase()
                  .includes(searchProjectUser.toLowerCase()) ||
                  user.email
                    .toLowerCase()
                    .includes(searchProjectUser.toLowerCase());
          })
          .map((user) => {
            return (
              <UserCard
                key={user?._id}
                user={user}
                role={"User"}
                changeRole={changeRole}
              />
            );
          })}
      </div>

      <hr />
      <div className="font-semibold py-4 text-2xl">Other Users</div>
      {/* SEARCH OTHER USERS */}
      <div className="flex justify-between">
        <Input
          type="text"
          name="search-issue"
          value={searchOtherUser}
          onChange={(e) => setSearchOtherUser(e.target.value)}
          id="search-issue"
          placeholder="Search other users"
          className="px-2 text-base border-slate-200 border-2 max-w-60"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8 my-4">
        {/* --------------------- OTHER USERS ------------------- */}
        {otherUsers?.length ? (
          otherUsers
            .filter((user) => {
              return searchOtherUser.toLowerCase() === ""
                ? user
                : user.firstname
                    .toLowerCase()
                    .includes(searchOtherUser.toLowerCase()) ||
                    user.email
                      .toLowerCase()
                      .includes(searchOtherUser.toLowerCase());
            })
            .map((user) => {
              return (
                <UserCard
                  key={user?._id}
                  user={user}
                  role={""}
                  changeRole={changeRole}
                />
              );
            })
        ) : (
          <div className="text-slate-400/80">No users Found</div>
        )}
      </div>
    </div>
  );
}

export default UserBoard;
