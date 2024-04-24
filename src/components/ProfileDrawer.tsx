import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "./ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { useState } from "react";
import { axiosPrivate } from "@/api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export default function ProfileDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const logoutUser = async () => {
    try {
      await axiosPrivate.get("/users/logout");
      localStorage.removeItem("accessToken");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <div className="flex justify-evenly items-center flex-1 ">
            {/* ADD AVATAR HERE */}
            <Avatar>
              <AvatarImage
                className="rounded-full w-24 h-auto"
                src={user?.avatar}
                alt={`${user?.firstname}'s Avatar`}
              />
              <AvatarFallback className="rounded-full">
                {user?.firstname && user.firstname.length > 0
                  ? user.firstname[0].toLowerCase()
                  : ""}
              </AvatarFallback>
            </Avatar>

            <div className="text-lg">
              <div className="font-bold">
                Name:{" "}
                <span className="font-normal">
                  {" "}
                  {user?.firstname} {user?.lastname}
                </span>
              </div>
              <div className="font-bold">
                Email: <span className="font-normal"> {user?.email}</span>
              </div>
            </div>
          </div>

          <DrawerFooter>
            <Button variant="secondary">Edit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="destructive" onClick={logoutUser}>
                Logout
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
