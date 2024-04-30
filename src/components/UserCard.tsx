import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/context/AuthProvider";

const UserCard = ({
  role,
  user,
  changeRole,
}: {
  role: string | undefined;
  user: User | undefined;
  changeRole: (
    role: string,
    userId: string | undefined
  ) => Promise<
    | {
        id: string;
        dismiss: () => void;
        // update: (props: ToasterToast) => void;
      }
    | undefined
  >;
}) => {
  return (
    <div>
      <Card key={user?._id}>
        <CardHeader className="flex-row gap-4 items-center">
          {/* AVATAR */}
          <Avatar>
            <AvatarImage src={user?.avatar} alt="user img" />
            <AvatarFallback>
              {user?.firstname[0].toUpperCase()}
              {user?.lastname ? user.lastname[0].toUpperCase() : ""}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>
              {user?.firstname} {user?.lastname}
            </CardTitle>
            <CardDescription>{user?.email}</CardDescription>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-between">
          {!role ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Add to project</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem
                  onClick={() => {
                    changeRole("admin", user?._id);
                  }}
                >
                  <span>Admin</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    changeRole("admin", user?._id);
                  }}
                >
                  <span>User</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Cancel</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Change Role</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem
                  onClick={() => {
                    changeRole("admin", user?._id);
                  }}
                >
                  <span>Admin</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    changeRole("user", user?._id);
                  }}
                >
                  <span>User</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    changeRole("", user?._id);
                  }}
                >
                  <span>Remove</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Cancel</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {role && <Button variant="secondary">{role}</Button>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserCard;
