import axios from "axios";
import { IPost } from "@/types/postTypes"; // Import your types accordingly
import { jwtDecode } from "jwt-decode";

export const fetchPosts = async (): Promise<IPost[]> => {
  try {
    const response = await axios.get<IPost[]>("http://localhost:3000/v1/posts"); // Adjust the API route if necessary
    console.log(response.data.posts);
    return response.data.posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};

// Delete Post API call
export const deletePost = async (postId: string) => {
  return axios.delete(`http://localhost:3000/v1/posts/${postId}`);
};

// Update Post API call
export const updatePost = async (postId: string, updatedPost: IPost) => {
  return axios.put(`http://localhost:3000/v1/posts/${postId}`, updatedPost);
};

interface TokenPayload {
  _id: string;
  // Other properties from your token
}

export const likePostRequest = async (postId: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  // Decode the token and ensure it contains the userId
  const decoded: TokenPayload = jwtDecode(token);
  const userId = decoded?._id;

  if (!userId) {
    console.error("Decoded token does not contain userId:", decoded);
    throw new Error("Invalid token: userId missing");
  }
  console.log("Token frontend:", token, "UserID:", userId);

  const response = await axios.post(
    `http://localhost:3000/v1/posts/${postId}/like`,
    { userId }, // Ensure userId from decoded token is sent
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; // The updated post with the new like/dislike status
};

export const commentOnPostRequest = async (
  postId: string,
  commentData: {
    userId: string;
    comment: string;
    type?: string; // Optional, defaults to 'text'
    opinion?: string; // Optional, defaults to 'neutral'
  },
  token: string // Pass the token as an argument to the function
) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/v1/posts/${postId}/comment`,
      {
        comment: commentData.comment,
        type: commentData.type || "text", // Default to 'text' if type not provided
        opinion: commentData.opinion || "neutral", // Default to 'neutral' if opinion not provided
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );

    return response.data; // Return the updated post data after the comment is added
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error; // Handle the error by throwing it so it can be caught elsewhere
  }
};

// Reply to comment API request
export const replyToCommentRequest = async (
  postId: string,
  commentId: string,
  replyData: {
    userId: string;
    comment: string;
    type?: string;
    opinion?: string;
  },
  token: string
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/v1/posts/${postId}/comment/${commentId}/reply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass the token for authentication
        },
        body: JSON.stringify(replyData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to reply to comment");
    }

    return await response.json(); // Assuming the updated post is returned
  } catch (error) {
    console.error("Error in replyToCommentRequest:", error);
    throw error;
  }
};

export const editCommentRequest = (
  postId: string,
  commentId: string,
  commentData: any,
  token: string
) => {
  return fetch(
    `http://localhost:3000/v1/posts/${postId}/comment/${commentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add token for authentication
      },
      body: JSON.stringify(commentData),
    }
  ).then((res) => res.json());
};

export const deleteCommentRequest = (
  postId: string,
  commentId: string,
  token: string
) => {
  return fetch(
    `http://localhost:3000/v1/posts/${postId}/comment/${commentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Add token for authentication
      },
    }
  ).then((res) => res.json());
};
