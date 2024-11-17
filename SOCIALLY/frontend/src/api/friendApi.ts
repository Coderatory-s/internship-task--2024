import axios from "axios";

// Fetch friend requests
export const fetchFriendRequests = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/v1/friends/requests"
    );
    return data;
  } catch (error) {
    throw new Error("Error fetching friend requests");
  }
};

// Accept friend request
export const acceptRequest = async (requestId: string) => {
  try {
    const { data } = await axios.post(
      `http://localhost:3000/v1/friends/accept/${requestId}`
    );
    return data;
  } catch (error) {
    throw new Error("Error accepting friend request");
  }
};
