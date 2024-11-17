import axios from "axios";

export const fetchCommunities = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/v1/communities");
    return data;
  } catch (error) {
    throw new Error("Error fetching communities");
  }
};
