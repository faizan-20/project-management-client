function IssueCard({ title, issueKey }: { title: string; issueKey: string }) {
  return (
    <div className="flex flex-col p-2 m-1 bg-white h-fit rounded-sm border border-slate-300 shadow-md cursor-pointer hover:bg-blue-50 transition-all duration-150">
      <div className="text-sm pb-4 pl-1">{title}</div>
      <div className="flex items-center">
        <div className="mr-2">
          <svg
            fill="#407cdd"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#407cdd"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M7 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7zm4 10.414-2.707-2.707 1.414-1.414L11 12.586l3.793-3.793 1.414 1.414L11 15.414z"></path>
            </g>
          </svg>
        </div>
        <div className="text-xs font-semibold text-gray-600">{issueKey}</div>
      </div>
    </div>
  );
}

export default IssueCard;
