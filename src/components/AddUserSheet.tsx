import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { User } from "@/context/AuthProvider";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

export default function AddUserSheet({
  children,
}: {
  children: React.ReactNode;
}) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data } = await axiosPrivate.get("/users/get-all");
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    getAllUsers();
  }, [axiosPrivate]);

  const searchUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axiosPrivate.get(
        `/users/get-all?search=${search}`
      );
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add user to the project</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <form className="flex gap-2" onSubmit={searchUser}>
            <Input
              type="text"
              name="add-user"
              placeholder="Search by name or email"
              className="text-base h-10 border-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </form>
          <div className="flex-col flex gap-2 mt-2">
            {users?.length ? (
              users.map((user) => (
                <Card key={user._id} className="flex items-center px-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={user.avatar} className="rounded-full" />
                  </Avatar>
                  <CardHeader>
                    <CardTitle>
                      {user.firstname} {user.lastname}
                    </CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <div className="self-center">No users found</div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
