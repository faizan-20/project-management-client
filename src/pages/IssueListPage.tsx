import IssueCard from "@/components/IssueCard";
import { useIssuesStore } from "@/context/store";

function IssueListPage() {
    const issues = useIssuesStore((state) => state.issues);

  return (
    <>
      <div className="flex border-2 w-72 h-[80vh] overflow-auto py-5 bg-slate-200">
        <div className="flex flex-col w-72">
          {issues.map((issue) => 
          <IssueCard key={issue._id} issue={issue} />
          )}
        </div>
      </div>
    </>
  )
}

export default IssueListPage