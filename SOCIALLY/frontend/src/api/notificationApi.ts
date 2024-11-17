import axios from "axios";

export const fetchNotifications = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/v1/notifications");
    return data;
  } catch (error) {
    throw new Error("Error fetching notifications");
  }
};
