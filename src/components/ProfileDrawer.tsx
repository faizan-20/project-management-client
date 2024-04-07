import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { useState } from "react";
import { User } from "@/context/AuthProvider";
import { axiosPrivate } from "@/api/axios";
import { useNavigate } from "react-router-dom";

export default function ProfileDrawer({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await axiosPrivate.get("/users/logout");
      localStorage.removeItem("accessToken");
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
          <DrawerHeader>
            {/* ADD AVATAR HERE */}
            <Avatar>
              <AvatarImage
                className="rounded-full"
                src={user.avatar}
                alt={`${user.firstname}'s Avatar`}
              />
              <AvatarFallback className="rounded-full">
                {user.firstname && user.firstname.length > 0
                  ? user.firstname[0].toLowerCase()
                  : ""}
              </AvatarFallback>
            </Avatar>

            <DrawerTitle>
              Name: <span className="font-normal"> {user.firstname}</span>
            </DrawerTitle>
            <DrawerTitle>
              Email: <span className="font-normal"> {user.email}</span>
            </DrawerTitle>
          </DrawerHeader>

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
