import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import {
  likePostRequest,
  commentOnPostRequest,
  // fetchUserById,
  replyToCommentRequest,
  deleteCommentRequest,
  editCommentRequest,
} from "@/api/feedApi"; // API call to like the post
import { IPost } from "@/types/postTypes"; // Import your IPost type
import { BiLike } from "react-icons/bi";
import { getUserIdFromToken } from "./FeedPosts";
import { FaComment } from "react-icons/fa";
import { PiShareFatFill } from "react-icons/pi";
import { Button } from "@/components/ui/button";

export const PostActions = ({ post }: { post: IPost }) => {
  const queryClient = useQueryClient();
  const userId = getUserIdFromToken();
  const [liked, setLiked] = useState<boolean>(false);
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [commentType, setCommentType] = useState<string>("text");
  const [opinion, setOpinion] = useState<string>("neutral");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [viewComments, setViewComments] = useState<boolean>(false);
  const [viewLikes, setViewLikes] = useState<boolean>(false);
  // State to handle edit mode
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});

  // const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const fetchUserById = async (userId: string, token: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token here
          },
        }
      );
      return response.data; // Return the actual data
    } catch (error: any) {
      console.log(error.message);
    }
  };
  // Mutations for edit and delete
  const editCommentMutation = useMutation({
    mutationFn: ({
      postId,
      commentId,
      commentData,
    }: {
      postId: string;
      commentId: string;
      commentData: string;
    }) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token is required");

      return editCommentRequest(
        postId,
        commentId,
        { comment: commentData, userId },
        token
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setIsSubmitting(false);
      setIsEditing({}); // Reset edit mode
    },
    onError: (error) => {
      toast.error(`Error occured: ${error.message}`);
      setIsSubmitting(false);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: ({
      postId,
      commentId,
    }: {
      postId: string;
      commentId: string;
    }) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token is required");

      return deleteCommentRequest(postId, commentId, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const handleEditSubmit = (postId: string, commentId: string) => {
    setIsSubmitting(true);
    editCommentMutation.mutate({ postId, commentId, commentData: comment });
  };

  const handleDelete = (postId: string, commentId: string) => {
    deleteCommentMutation.mutate({ postId, commentId });
  };

  const toggleEditMode = (commentId: string) => {
    setIsEditing((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  useEffect(() => {
    if (userId) {
      const isLiked = post?.likedBy.includes(userId);
      setLiked(isLiked);
    }
  }, [post?.likedBy, userId]);

  const likeMutation = useMutation({
    mutationFn: (postId: string) => likePostRequest(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const commentMutation = useMutation({
    mutationFn: (commentData: {
      postId: string;
      userId: string;
      comment: string;
    }) => {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token is required");
      }

      return commentOnPostRequest(
        commentData.postId,
        { userId: commentData.userId, comment: commentData.comment },
        token
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setComment("");
      setIsSubmitting(false);
    },
    onError: () => {
      setIsSubmitting(false);
    },
  });

  const handleCommentSubmit = () => {
    setIsSubmitting(true);
    commentMutation.mutate({
      postId: post._id,
      userId: userId || "",
      comment,
    });
  };

  const handleLike = () => {
    likeMutation.mutate(post._id, {
      onSuccess: () => {
        setLiked((prev) => !prev);
      },
    });
  };
  const [commentedByUsers, setCommentedByUsers] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const fetchCommentedByUsers = async () => {
      const userIds = post.comments.map((comment) => comment.userId);
      const users: { [key: string]: string } = {};

      // Get token from local storage or state
      const token = localStorage.getItem("token"); // Assuming you stored it in localStorage

      if (!token) {
        console.error("Authorization token is missing");
        return;
      }

     
      for (const userId of userIds) {
        try {
          const userData = await fetchUserById(userId, token); // Pass both userId and token
          users[userId] = userData?.name;
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
      setCommentedByUsers(users); // Set the fetched user names
    };

    fetchCommentedByUsers();
  }, [post.comments]);
  // In the PostActions component
  const [likedByUsers, setLikedByUsers] = useState<{ [key: string]: string }>(
    {}
  );
  // Fetch user details when displaying likes
  useEffect(() => {
    const fetchLikedByUsers = async () => {
      const userIds = post.likedBy;
      const users: { [key: string]: string } = {};

      // Get token from local storage or state
      const token = localStorage.getItem("token"); // Assuming you stored it in localStorage

      if (!token) {
        console.error("Authorization token is missing");
        return;
      }

      for (const userId of userIds) {
        try {
          const userData = await fetchUserById(userId, token); // Pass both userId and token
          console.log("userData",userData, "users",users)
          users[userId] = userData?.name; // Store user name by their ID
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
      setLikedByUsers(users); // Set the fetched user names
    };

    fetchLikedByUsers();
  }, [post.likedBy]);
  // In the PostActions component
  const [showReplyBox, setShowReplyBox] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [reply, setReply] = useState("");

  const toggleReplyBox = (commentId: string) => {
    setShowReplyBox((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReplySubmit = (commentId: string, reply: string) => {
    if (!reply.trim()) return;

    replyMutation.mutate({
      postId: post._id,
      commentId,
      userId: userId || "",
      comment: reply,
      type: "text", // Default type
      opinion: "neutral", // Default opinion
    });
  };

  // Mutation for replying to comments
  const replyMutation = useMutation({
    mutationFn: (replyData: {
      postId: string;
      commentId: string;
      userId: string;
      comment: string;
      type: string;
      opinion: string;
    }) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token is required");

      return replyToCommentRequest(
        replyData.postId,
        replyData.commentId,
        {
          userId: replyData.userId,
          comment: replyData.comment,
          type: replyData.type,
          opinion: replyData.opinion,
        },
        token
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <div className="mt-2 flex flex-col gap-2 border-t-[1px] py-3">
      <div className="flex items-center justify-between">
        <div className="">
          <Button onClick={handleLike} className="text-black border">
            <BiLike className={`${liked ? "text-blue-500" : "text-black"}`} />
            {` (${post.likes})`}
          </Button>
          <p
            onClick={() => setViewLikes(!viewLikes)}
            className="cursor-pointer select-none text-blue-400 underline"
          >
            View Likes
          </p>
        </div>
        <div className="flex flex-col justify-center">
          <Button
            className=""
            onClick={() => setShowCommentBox((prev) => !prev)}
          >
            <FaComment size={30} /> {`(${post.comments.length})`}
          </Button>
          <p
            className="cursor-pointer select-none text-blue-400 underline"
            onClick={() => setViewComments(!viewComments)}
          >
            View Comments
          </p>
        </div>
        <Button className="">
          <PiShareFatFill size={30} />
        </Button>
      </div>
      {showCommentBox && (
        <div className="mt-2">
          <Textarea
            className="w-full p-2 border rounded-lg"
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          {/* Using Select component instead of Dropdown */}
          <div className="flex gap-4 mt-2">
            <Select value={commentType} onValueChange={setCommentType}>
              <SelectTrigger className="font-bold">
                Select Comment Type
              </SelectTrigger>
              <SelectContent className="bg-blue-300">
                <SelectItem className="" value="text">
                  Text
                </SelectItem>
                <SelectItem className="" value="image">
                  Image
                </SelectItem>
                <SelectItem className="" value="video">
                  Video
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={opinion} onValueChange={setOpinion}>
              <SelectTrigger className="font-bold">
                Select Opinion
              </SelectTrigger>
              <SelectContent className="bg-blue-300">
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleCommentSubmit}
            className="w-full mt-2 bg-blue-600 text-white"
            disabled={isSubmitting || !comment.trim()}
          >
            {isSubmitting ? "Submitting..." : "Submit Comment"}
          </Button>
        </div>
      )}
      {/* // Rendering "Liked By" with user names */}
      {viewLikes && (
        <div className="mt-4 bg-gray-100 px-2 rounded-md">
          <h1 className="font-bold underline">Liked By:</h1>
          {post.likedBy?.length === 0 && (
            <p className="text-center my-2 opacity-70">No Likes Found.</p>
          )}
          {post.likedBy?.map((userId, index) => (
            <div key={index} className="border-b-2 my-2 py-2">
              <p className="font-light ">
                {likedByUsers[userId] || "Unknown User"}
              </p>
            </div>
          ))}
        </div>
      )}
      {/* Displaying all comments */}
      {/* // Rendering "Commented By" with user names */}
      {viewComments && (
        <div className="mt-4 bg-gray-100 px-2 rounded-md">
          <h1 className="font-bold underline">Commented By:</h1>
          {post.comments.length === 0 && (
            <p className="text-center my-2 opacity-70">No comments</p>
          )}
          {post.comments.map((comment, index) => (
            <div key={index} className="border-b-2 my-2 py-2">
              <p className="font-semibold">
                {commentedByUsers[comment.userId] || "Unknown User"}
              </p>
              <p className="text-sm text-gray-600">{comment.comment}</p>
              {/* Edit Btn */}
              {isEditing[comment._id] ? (
                <div className="flex items-center space-x-2">
                  <Textarea
                    // value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    onClick={() => handleEditSubmit(post._id, comment._id)}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <>
                  <Button onClick={() => toggleEditMode(comment._id)}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(post._id, comment._id)}>
                    Delete
                  </Button>
                </>
              )}
              {/* Reply button */}
              <p
                onClick={() => toggleReplyBox(comment._id)}
                className="text-blue-400 text-end cursor-pointer"
              >
                Reply
              </p>

              {/* Reply form */}
              {showReplyBox[comment._id] && (
                <div className="mt-2">
                  <textarea
                    className="w-full p-2 border rounded-lg"
                    placeholder="Write your reply..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                  <Button
                    onClick={() => handleReplySubmit(comment._id, reply)}
                    className="w-full mt-2 bg-blue-600 text-white"
                  >
                    Submit Reply
                  </Button>
                </div>
              )}

              {/* Display replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-10">
                  {comment.replies.map((reply, replyIndex) => (
                    <div key={replyIndex} className="border-b my-1 py-1">
                      <p className="font-semibold">
                        {commentedByUsers[reply?.userId] || "Unknown User"}
                      </p>
                      <p className="text-sm">{reply?.comment}</p>
                      <p
                        onClick={() => toggleReplyBox(comment._id)}
                        className="text-blue-400 text-end cursor-pointer"
                      >
                        Reply
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
