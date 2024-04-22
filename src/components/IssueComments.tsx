import { Dispatch, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { IssueType } from "@/pages/ProjectBoard";
import { User } from "@/context/AuthProvider";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

type Comment = {
  userId: User;
  text: string;
  _id: string;
};

export default function IssueComments({
  showCommentEditor,
  setShowCommentEditor,
  currIssue,
}: {
  showCommentEditor: boolean;
  setShowCommentEditor: Dispatch<React.SetStateAction<boolean>>;
  currIssue: IssueType;
}) {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState<Comment[]>([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getAllComments = async () => {
      try {
        const { data } = await axiosPrivate.get(
          `/comments/get-all/${currIssue._id}`
        );

        setAllComments(data.comments);
      } catch (error) {
        console.error(error);
      }
    };

    getAllComments();
  }, [axiosPrivate, currIssue._id]);

  const addComment = async () => {
    try {
      const { data } = await axiosPrivate.post(`/comments/${currIssue._id}`, {
        text: comment,
      });

      setAllComments([data.comment, ...allComments]);
    } catch (error) {
      console.error(error);
    } finally {
      setShowCommentEditor(false);
      setComment("");
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await axiosPrivate.delete(`/comments/${commentId}`);
      setAllComments(
        allComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mr-4">
      <div className="font-semibold text-sm mb-2">Activity</div>
      {showCommentEditor ? (
        <div>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <div className="flex gap-2 mt-2">
            <Button onClick={addComment}>Save</Button>
            <Button
              variant="secondary"
              onClick={() => setShowCommentEditor(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="text-gray-500 text-sm border-[1px] py-2 px-4 cursor-text border-slate-500 rounded-sm"
          onClick={() => setShowCommentEditor(true)}
        >
          Add a comment...
        </div>
      )}
      <div className="mt-6 flex flex-col gap-6 overflow-auto max-h-36 h-content">
        {allComments.map((comment) => (
          <div className="text-sm flex gap-4" key={comment._id}>
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={comment.userId.avatar}
                className="rounded-full"
              />
            </Avatar>
            <div className="flex justify-between items-center gap-1 flex-1">
              <div>
                <div className="font-semibold">{comment.userId.firstname}</div>
                <div>{comment.text}</div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => deleteComment(comment._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
