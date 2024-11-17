import axios from "axios";

export const fetchActiveGroups = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/v1/groups/active");
    return data;
  } catch (error) {
    throw new Error("Error fetching active groups");
  }
};
