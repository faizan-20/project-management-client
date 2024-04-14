import Editor from "@/components/Editor"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


function IssuePage() {
  const [showEditor, setShowEditor] = useState(false)
  const [showCommentEditor, setShowCommentEditor] = useState(false)

  function handleDescriptionClick() {
    setShowEditor(true)
  }

  function handleCommentClick() {
    setShowCommentEditor(true)
  }

  return (
    <div className="flex p-5">
      <div className="w-1/2">
        <div className="font-semibold text-2xl pb-2">Issue Name</div>
        <div className="flex pb-5">
          <div className="pr-2">
            <Button className="bg-slate-200 text-black">
              <svg viewBox="0 0 28 28" className="w-5 h-5" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="2"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> <title>attachment-2</title>
                <g id="Page-1" stroke-width="2" fill="none" fill-rule="evenodd"> 
                    <g id="Icon-Set" transform="translate(-258.000000, -154.000000)" fill="#000000">
                      <path d="M284.562,164.181 L270.325,178.26 C267.966,180.593 264.141,180.593 261.782,178.26 C259.423,175.928 259.423,172.146 261.782,169.813 L274.596,157.141 C276.168,155.586 278.718,155.586 280.291,157.141 C281.863,158.696 281.863,161.218 280.291,162.772 L267.477,175.444 C266.691,176.222 265.416,176.222 264.629,175.444 C263.843,174.667 263.843,173.406 264.629,172.628 L276.02,161.365 L274.596,159.957 L263.206,171.221 C261.633,172.775 261.633,175.297 263.206,176.853 C264.778,178.407 267.328,178.407 268.901,176.852 L281.714,164.181 C284.073,161.849 284.074,158.065 281.715,155.733 C279.355,153.4 275.531,153.4 273.172,155.733 L259.646,169.108 L259.696,169.157 C257.238,172.281 257.455,176.797 260.358,179.668 C263.262,182.539 267.828,182.754 270.987,180.323 L271.036,180.372 L285.986,165.589 L284.562,164.181" id="attachment-2"> </path>
              </g> </g> </g></svg>
              Attach
            </Button>
          </div>
          <div className="pr-2">
            <Button className="bg-slate-200 text-black">Add a Child Issue</Button>
          </div>
          <div>
            <Button className="bg-slate-200 text-black">
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M9.16488 17.6505C8.92513 17.8743 8.73958 18.0241 8.54996 18.1336C7.62175 18.6695 6.47816 18.6695 5.54996 18.1336C5.20791 17.9361 4.87912 17.6073 4.22153 16.9498C3.56394 16.2922 3.23514 15.9634 3.03767 15.6213C2.50177 14.6931 2.50177 13.5495 3.03767 12.6213C3.23514 12.2793 3.56394 11.9505 4.22153 11.2929L7.04996 8.46448C7.70755 7.80689 8.03634 7.47809 8.37838 7.28062C9.30659 6.74472 10.4502 6.74472 11.3784 7.28061C11.7204 7.47809 12.0492 7.80689 12.7068 8.46448C13.3644 9.12207 13.6932 9.45086 13.8907 9.7929C14.4266 10.7211 14.4266 11.8647 13.8907 12.7929C13.7812 12.9825 13.6314 13.1681 13.4075 13.4078M10.5919 10.5922C10.368 10.8319 10.2182 11.0175 10.1087 11.2071C9.57284 12.1353 9.57284 13.2789 10.1087 14.2071C10.3062 14.5492 10.635 14.878 11.2926 15.5355C11.9502 16.1931 12.279 16.5219 12.621 16.7194C13.5492 17.2553 14.6928 17.2553 15.621 16.7194C15.9631 16.5219 16.2919 16.1931 16.9495 15.5355L19.7779 12.7071C20.4355 12.0495 20.7643 11.7207 20.9617 11.3787C21.4976 10.4505 21.4976 9.30689 20.9617 8.37869C20.7643 8.03665 20.4355 7.70785 19.7779 7.05026C19.1203 6.39267 18.7915 6.06388 18.4495 5.8664C17.5212 5.3305 16.3777 5.3305 15.4495 5.8664C15.2598 5.97588 15.0743 6.12571 14.8345 6.34955" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
              </g></svg>
              Link Issue
            </Button>
          </div>
        </div>

        <div className="pb-9">
          <div className="font-semibold text-gray-700 pb-2">Description</div>
          {showEditor ? <Editor /> : <div className="text-gray-500 text-sm" onClick={handleDescriptionClick}>Add a description...</div>}
        </div>

        <div>
          <div className="font-semibold text-gray-700 pb-3">Activity</div>
          {showCommentEditor ? <Editor /> : <div className="text-gray-500 text-sm" onClick={handleCommentClick}>Add a comment...</div>}
        </div>

      </div>

      <div className="w-1/2">
        <div>
          <Button className="bg-slate-200 text-black">
            To Do
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"></path>
            </g></svg>
          </Button>
        </div>

        <div className="w-full mt-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-700">Details</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className=" text-gray-600">Assignee</TableCell>
                <TableCell className=" text-gray-600">Unassigned</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className=" text-gray-600">Labels</TableCell>
                <TableCell className=" text-gray-600">Unassigned</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className=" text-gray-600">Parent</TableCell>
                <TableCell className=" text-gray-600">Unassigned</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className=" text-gray-600">Reporter</TableCell>
                <TableCell className=" text-gray-600">Unassigned</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 pl-3">
          <div className=" text-gray-400 text-xs">Updated At</div>
          <div className="text-gray-400 text-xs">Created At</div>
        </div>
        
      </div>
    </div>
  )
}

export default IssuePage