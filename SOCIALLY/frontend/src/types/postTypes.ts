// import { IUser } from "./userTypes";
// export interface IReaction {
//   userId: string;
//   reactionType: string;
// }

// export interface IReply {
//   userId: string;
//   comment: string;
//   type: "text" | "voice" | "image";
//   opinion: "against" | "favor" | "neutral" | "opinion";
//   reactions?: IReaction[];
// }

// export interface IComment {
//   userId: string;
//   comment: string;
//   type: "text" | "voice" | "image";
//   opinion: "against" | "favor" | "neutral" | "opinion";
//   replies?: IReply[];
//   reactions?: IReaction[];
// }

// export interface IPoll {
//   question: string;
//   options: string[];
//   votes: number[];
//   voters: {
//     userId: string;
//     votedOptionIndex: number;
//   }[];
// }

// export interface IContent {
//   text?: string;
//   images?: string[];
//   videos?: string[];
//   documents?: string[];
//   voice?: string;
//   poll?: IPoll;
// }

// // export interface IPost {
// //   _id: string;
// //   title: string;
// //   content: IContent;
// //   likes: number;
// //   comments: IComment[];
// //   likedBy: string[];
// // }

// // export interface IPost {
// //   _id: string;
// //   title: string;
// //   content: IContent;
// //   user: IUser; // Define user as an object
// //   likes: number;
// //   comments: Array<{ user: string; text: string }>;
// // }
// Define the structure for content (based on the backend post schema)
export interface IContent {
  text?: string; // Optional text content
  images?: string[]; // Optional array of image URLs
  videos?: string[]; // Optional array of video URLs
  documents?: string[]; // Optional array of document URLs
  voice?: string; // Optional voice content URL
  poll?: {
    question: string; // Poll question
    options: string[]; // Poll options
    votes: number[]; // Vote counts for each option
    voters?: Array<{
      userId: string;
      votedOptionIndex: number; // Option that user voted for
    }>; // Optional array of voters
  };
}

// Define the structure for a comment
export interface IComment {
  _id: string;
  userId: string; // User ID of the commenter
  comment: string; // Comment content
  type: "text" | "voice" | "image"; // Comment type (text, voice, image)
  opinion: "against" | "favor" | "neutral" | "opinion"; // Opinion type
  replies?: IComment[]; // Optional replies to the comment
  reactions?: Array<{ userId: string; reactionType: string }>; // Optional reactions to the comment
  createdAt: string; // Timestamps
  updatedAt: string;
}

// Define the user structure
export interface IUser {
  _id: string;
  name: string; // User's name
  avatar?: string; // Optional avatar for the user
}

// Define the structure for the post
export interface IPost {
  _id: string;
  title: string; // Post title
  content: IContent; // Post content
  user: IUser; // The user who created the post
  likes: number; // Number of likes
  comments: IComment[]; // Array of comments
  likedBy: string[]; // Array of user IDs who liked the post
  createdAt: string; // Timestamps
  updatedAt: string;
}
