import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useState } from "react";

export function CreateProjectDialog() {
  const [title, setTitle] = useState("")
  const [key, setKey] = useState("")
  const [template, setTemplate] = useState("")
  const [type, setType] = useState("")

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Project</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle >Create Project</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col" onSubmit={submitHandler}>
          
          <div className="flex flex-col pb-2">
            <Label htmlFor="project-title" className="text-slate-600 pb-1 font-bold">
              Title <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              name="project-title"
              id="project-title"
              placeholder="Enter Project Title"
              className="px-2 text-md border-slate-400 border-2 focus:border-slate-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col pb-2">
            <Label htmlFor="key" className="text-slate-600 pb-1 font-bold">
              Key <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              name="key"
              id="key"
              placeholder="Enter Project Key"
              className="px-2 text-md border-slate-400 border-2 focus:border-slate-600"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col pb-3">
            <Label htmlFor="project-template" className="text-slate-600 font-bold pb-1">
              Project Template
            </Label>
            <Select>
              <SelectTrigger
                id="project-template"
                name="project-template"
                value={template}
                onChange={(e: React.FormEvent<HTMLSelectElement>) => setTemplate((e.target as HTMLSelectElement).value)}
                className="px-2 text-md border-slate-400 border-2 focus:border-slate-600"
              >
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                    <SelectItem value="kanban">Kanban Project</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col pb-2">
            <Label htmlFor="project-type" className="text-slate-600 font-bold pb-1">
              Project Type
            </Label>
            <Select>
              <SelectTrigger
                id="project-type"
                name="project-type"
                value={type}
                // onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}
                className="px-2 text-md border-slate-400 border-2 focus:border-slate-600"
              >
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="team-managed">Team Managed Project</SelectItem>
                  <SelectItem value="company-managed">Company Managed Project</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

        </form>

        <DialogFooter>
          <Button type="submit">Create Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
