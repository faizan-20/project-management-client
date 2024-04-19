
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



function UserBoard() {


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
                            {/* <Link to={`/project/${currProject?._id}/board`}>
                                {currProject?.title}
                            </Link> */}
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
                    // value={issueSearch}
                    // onChange={(e) => setIssueSearch(e.target.value)}
                    id="search-issue"
                    placeholder="Search"
                    className="px-2 text-base border-slate-200 border-2 max-w-60"
                />

                <AddUserSheet projectId={'test-projectid'}>
                    <div className="inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 py-2 px-4 bg-slate-100 text-secondary-foreground shadow-sm hover:bg-sky-100/80">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                            />
                        </svg>
                    </div>
                </AddUserSheet>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8 my-4">
                {/* --------------------- OWNER ------------------- */}
                <UserCard />
            </div>

        </div>
    )
}

export default UserBoard;