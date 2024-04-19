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

const UserCard = () => {

    return (
        <div>
            <Card key={1}>
                <CardHeader className="flex-row gap-4 items-center">
                    {/* AVATAR */}
                    <Avatar>
                        <AvatarImage src="" alt="user img" />
                        <AvatarFallback>
                            "pic"
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>Firstname</CardTitle>
                        <CardDescription>user@gmail.com</CardDescription>
                    </div>
                </CardHeader>
                <CardFooter className="flex justify-between">
                    <Button variant="secondary">Owner</Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Add to project</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuItem>
                                <span>Admin</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span>User</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <span>Cancel</span>
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardFooter>
            </Card>
        </div>
    )
}

export default UserCard