import { AuthContext } from "@/context/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useContext } from "react";

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center px-6 h-12 border-b-2 border-slate-200">
      <div className="flex gap-4 items-center">
        <div className="flex mr-6 gap-2 items-center hover:cursor-pointer hover:bg-slate-300 px-2 py-1 transition-all rounded-sm">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-blue-600"
            >
              <path d="M15 3.75H9v16.5h6V3.75ZM16.5 20.25h3.375c1.035 0 1.875-.84 1.875-1.875V5.625c0-1.036-.84-1.875-1.875-1.875H16.5v16.5ZM4.125 3.75H7.5v16.5H4.125a1.875 1.875 0 0 1-1.875-1.875V5.625c0-1.036.84-1.875 1.875-1.875Z" />
            </svg>
          </div>
          <div className="text-lg font-semibold "> KiraSoftware</div>
        </div>
        <div className="text-base text-slate-800 flex items-center gap-1 hover:cursor-pointer hover:bg-slate-300 px-2 py-1 transition-all rounded-sm">
          <div>Your Work</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
        <div className="text-base text-slate-800 flex items-center gap-1 hover:cursor-pointer hover:bg-slate-300 px-2 py-1 transition-all rounded-sm">
          <div>Projects</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="text-base text-slate-600 hover:cursor-pointer hover:bg-slate-300 px-2 py-1 transition-all rounded-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="text-base text-slate-800 hover:cursor-pointer hover:bg-slate-300 px-2 py-1 transition-all rounded-sm">
          <div className="w-6 h-6">
            <Avatar>
              <AvatarImage
                className="rounded-full"
                src={user.avatar}
                alt={`${user.firstname}'s Avatar`}
              />
              <AvatarFallback className="rounded-full">
                {user.firstname[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
}
