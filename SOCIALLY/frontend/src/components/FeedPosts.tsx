// ---------------------------------------------------------------------
import { useQuery } from "@tanstack/react-query";
import { CustomFileSlider } from "./CustomFileSlider";
import { fetchPosts } from "@/api/feedApi"; // API call to like the post
import { IPost } from "@/types/postTypes"; // Import your IPost type
import { PostActions } from "./PostActions";
import { jwtDecode } from "jwt-decode"; // For decoding JWT token

const FeedPosts = (props: any) => {
  const { data: posts, isLoading } = useQuery<IPost[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading...</p>;

  if (!posts || posts.length === 0) return <p>No posts available.</p>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} className="mb-4 p-4 border rounded-lg">
          {/* User Details - Avatar and Name */}
          <div className="flex gap-2 items-center mb-4 pb-3 border-b">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              {props.users?.avatar ? (
                <img
                  src={props.users?.avatar}
                  alt="User Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-2xl  ">❔</span>
              )}
            </div>
            <div className="">
              <span className="font-semibold">
                {props.users?.name || "Unknown User"}
              </span>
              <p className="opacity-65">Location (XYZ)</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold">{post.title}</h2>

          {/* Render Text Content */}
          {post.content.text && <p>{post.content.text}</p>}

          {/* Custom Slider with Dot Navigation */}
          <CustomFileSlider postContent={post.content} />

          {/* Post Actions */}
          <PostActions post={post} />
        </div>
      ))}
    </div>
  );
};

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token"); // Or wherever you store the token
  if (token) {
    const decodedToken: any = jwtDecode(token); // Decode the JWT token
    return decodedToken?._id; // Assuming '_id' is part of the token
  }
  return null;
};

export default FeedPosts;
