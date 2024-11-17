import axios from "axios";

export const fetchPosts = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/v1/posts");
    return data;
  } catch (error) {
    throw new Error("Error fetching posts");
  }
};
