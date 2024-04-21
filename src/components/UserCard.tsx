import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const UserCard = ({ userId, firstname, email, role, avatar, changeRole }: {
    userId: any,
    firstname: any,
    email: any,
    role: any,
    avatar: any,
    changeRole: any,
}) => {


    return (
        <div>
            <Card key={userId}>
                <CardHeader className="flex-row gap-4 items-center">
                    {/* AVATAR */}
                    <Avatar>
                        <AvatarImage src={avatar} alt="user img" />
                        <AvatarFallback>
                            "pic"
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>{firstname}</CardTitle>
                        <CardDescription>{email}</CardDescription>
                    </div>
                </CardHeader>
                <CardFooter className="flex justify-between">
                    {!role ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Add to project</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuItem  onClick={() => { changeRole('admin', userId) }}>
                                    <span>Admin</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => { changeRole('admin', userId) }}>
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
                                <DropdownMenuItem onClick={() => { changeRole('admin', userId) }}>
                                    <span>Admin</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => { changeRole('user', userId) }}>
                                    <span>User</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => { changeRole('', userId) }}>
                                    <span>Other User</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <span>Cancel</span>
                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                    {role && (<Button variant="secondary">{role}</Button>)}
                </CardFooter>
            </Card>
        </div>
    )
}

export default UserCard