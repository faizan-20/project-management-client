import { IssueType } from "@/pages/ProjectBoard";
import { create } from "zustand";

type IssuesStore = {
  issues: IssueType[];
  childIssues: IssueType[];
  setIssues: (issues: IssueType[]) => void;
  setChildIssues: (issues: IssueType[]) => void;
  addIssue: (issue: IssueType) => void;
  addChildIssue: (issue: IssueType) => void;
  removeIssue: (issueId: string) => void;
  removeChildIssue: (issueId: string) => void;
  setIssueStatus: (issueId: string, status: string) => void;
  setIssueDescription: (issueId: string, desc: string) => void;
};

export const useIssuesStore = create<IssuesStore>((set) => ({
  issues: [],
  childIssues: [],
  setIssues: (allIssues) => {
    set(() => ({
      issues: [...allIssues],
    }));
  },
  setChildIssues: (issues) => {
    set(() => ({
      childIssues: [...issues],
    }));
  },
  addIssue: (issue) => {
    set((state) => ({
      issues: [issue, ...state.issues],
    }));
  },
  addChildIssue: (issue) => {
    set((state) => ({
      childIssues: [issue, ...state.childIssues],
    }));
  },
  removeIssue: (issueId) => {
    set((state) => ({
      issues: state.issues.filter((i) => i._id !== issueId),
    }));
  },
  removeChildIssue: (issueId) => {
    set((state) => ({
      childIssues: state.childIssues.filter((i) => i._id !== issueId),
    }));
  },
  setIssueStatus: (issueId, status) => {
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue._id === issueId ? { ...issue, status } : issue
      ),
    }));
  },
  setIssueDescription: (issueId, desc) => {
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue._id === issueId ? { ...issue, description: desc } : issue
      ),
    }));
  },
}));
