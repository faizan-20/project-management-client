import { IssueType } from "@/pages/ProjectBoard";
import { create } from "zustand";

type IssuesStore = {
  issues: IssueType[];
  setIssues: (issues: IssueType[]) => void;
  addIssue: (issue: IssueType) => void;
  removeIssue: (issueId: string) => void;
  setIssueStatus: (issueId: string, status: string) => void;
};

export const useIssuesStore = create<IssuesStore>((set) => ({
  issues: [],
  setIssues: (allIssues) => {
    set(() => ({
      issues: [...allIssues],
    }));
  },
  addIssue: (issue) => {
    set((state) => ({
      issues: [issue, ...state.issues],
    }));
  },
  removeIssue: (issueId) => {
    set((state) => ({
      issues: state.issues.filter((i) => i._id !== issueId),
    }));
  },
  setIssueStatus: (issueId, status) => {
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue._id === issueId ? { ...issue, status } : issue
      ),
    }));
  },
}));
