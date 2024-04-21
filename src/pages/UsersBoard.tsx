
import { Link } from "react-router-dom";
import AddUserSheet from "@/components/AddUserSheet";
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


function UserBoard() {

    const { currProject, setCurrProject } = useContext(ProjectsContext);
    const owner = currProject?.owner;
    const admins = currProject?.admins;
    const users = currProject?.users;

    const [otherUsers, setOtherUsers] = useState<User[]>();
    const [searchProjectUser, setSearchProjectUser] = useState('');
    const [searchOtherUser, setSearchOtherUser] = useState('');

    const axiosPrivate = useAxiosPrivate();

    const getAllUsers = async () => {
        try {
            const { data } = await axiosPrivate.get(`/projects/get-all-not-project-user/${currProject?._id}`);
            setOtherUsers(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);



    const changeRole = async (role: string, userId: string) => {
        await axiosPrivate.put(`/projects/change-role/${currProject?._id}`, { role, userId });
        getCurrProject();
        getAllUsers();
    }

    const getCurrProject = async () => {
        try {
            const { data } = await axiosPrivate.get(`/projects/${currProject?._id}`);
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
            <div className="font-semibold py-4 text-2xl">
                Users
            </div>
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
                    userId={owner?._id}
                    firstname={owner?.firstname}
                    email={owner?.email}
                    avatar={owner?.avatar}
                    role={"Owner"}
                    changeRole={changeRole}
                />

                {/* --------------------- ADMIN ------------------- */}
                {admins?.filter((admin) => {
                    return searchProjectUser.toLowerCase() === ""
                        ? admin
                        : admin.firstname
                            .toLowerCase()
                            .includes(searchProjectUser.toLowerCase()) ||
                        admin.email
                            .toLowerCase()
                            .includes(searchProjectUser.toLowerCase())
                }).map((admin) => {
                    if (owner?._id !== admin._id) {
                        return (
                            <UserCard
                                key={admin?._id}
                                userId={admin?._id}
                                firstname={admin?.firstname}
                                email={admin?.email}
                                avatar={admin?.avatar}
                                role={"Admin"}
                                changeRole={changeRole}
                            />
                        )
                    }
                })}

                {/* --------------------- USERS ------------------- */}
                {users?.filter((user) => {
                    return searchProjectUser.toLowerCase() === ""
                        ? user
                        : user.firstname
                            .toLowerCase()
                            .includes(searchProjectUser.toLowerCase()) ||
                        user.email
                            .toLowerCase()
                            .includes(searchProjectUser.toLowerCase())
                }).map((user) => {
                    return (
                        <UserCard
                            key={user?._id}
                            userId={user?._id}
                            firstname={user?.firstname}
                            email={user?.email}
                            avatar={user?.avatar}
                            role={"User"}
                            changeRole={changeRole}
                        />
                    )
                })}
            </div>

            <hr />
            <div className="font-semibold py-4 text-2xl">
                Other Users
            </div>
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
                {otherUsers?.filter((user) => {
                    return searchOtherUser.toLowerCase() === ""
                        ? user
                        : user.firstname
                            .toLowerCase()
                            .includes(searchOtherUser.toLowerCase()) ||
                        user.email
                            .toLowerCase()
                            .includes(searchOtherUser.toLowerCase())
                }).map((user) => {
                    return (
                        <UserCard
                            key={user?._id}
                            userId={user?._id}
                            firstname={user?.firstname}
                            email={user?.email}
                            avatar={user?.avatar}
                            role={""}
                            changeRole={changeRole}
                        />
                    )
                })}
            </div>


        </div>
    )
}

export default UserBoard;