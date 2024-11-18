import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const Friends: React.FC = () => {
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState("");
  const [pendingRequests, setPendingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState<string[]>([]);
  const [error, setError] = useState(null);
  const [friendCount, setFriendCount] = useState<number>(0);
  const [showFriends,setShowFriends] = useState<boolean>(false)
  const getUserIdFromToken = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken: any = jwtDecode(token);
        return decodedToken?._id;
      }
    }
    return null;
  };

  const userId = getUserIdFromToken();

  useEffect(() => {
    fetchFriendsList();
    fetchPendingRequests();
  }, []);

  const sendFriendRequest = async (receiverId: string) => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken();

    try {
      const response = await axios.post(
        "http://localhost:3000/v1/friends/request",
        {
          senderId: userId,
          receiverId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const receiverName = response.data.receiverName || receiverId;
      setMessage(`Friend request sent to ${receiverName}`);

      fetchFriendsList();
      fetchPendingRequests();
      setSentRequests((prev) => [...prev, receiverId]);
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  const cancelFriendRequest = async (
    receiverId: string,
    receiverName: string
  ) => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken();

    try {
      const response = await axios.post(
        "http://localhost:3000/v1/friends/cancel-request",
        {
          senderId: userId,
          receiverId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(`Friend request canceled for user ${receiverName}`);
      fetchFriendsList();
      fetchPendingRequests();
      setSentRequests((prev) => prev.filter((id) => id !== receiverId));
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  const fetchFriendsList = async () => {
    let userId = getUserIdFromToken(); // Ensure this returns the correct user ID from the token
    try {
      const response = await axios.get(
        `http://localhost:3000/v1/friends/list/${userId}`, // Correct URL with userId
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the token in header
          },
        }
      );
      console.log("Friend List", response);

      // Update state with the friends data
      setFriendCount(response.data.length);
      setFriends(response.data);
    } catch (error) {
      // Log error and optionally display a message to the user
      console.error("Error fetching friends list:", error);
      // Optionally show an alert or message to the user
    }
  };

  const fetchPendingRequests = async () => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken();
    try {
      const response = await axios.get(
        "http://localhost:3000/v1/friends/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("PENDING REQUEST", response);
      setPendingRequests(response.data);
    } catch (error) {
      console.error("Error fetching pending requests:", error);
    }
  };

  const searchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/v1/users/search/username?name=${searchQuery}`
      );
      if (response.data.users) {
        setSearchResults(response.data.users);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      setSearchResults([]);
      console.error("Error searching users:", error);
    }
  };


  const acceptFriendRequest = async (requestId: string) => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken();
    try {
      const response = await axios.post(
        "http://localhost:3000/v1/friends/accept",
        {
          requestId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //   const { friendCount } = response.data;
      console.log("ACCEPT FRIEND REQUEST", response);
      setFriendCount(friendCount); // Update the friend count
      setMessage(`Friend request accepted from user ${requestId}`);

      setMessage(
        `Friend request accepted! You now have ${friendCount} friends.`
      );
      fetchFriendsList();
      fetchPendingRequests();
    } catch (error: any) {
      setError(error.response.data);
    }
  };

 

  const rejectFriendRequest = async (requestId: string) => {
    const token = localStorage.getItem("token");

    const userId = getUserIdFromToken();
    try {
      const response = await axios.post(
        "http://localhost:3000/v1/friends/reject",
        {
          requestId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(`Friend request rejected.`);
      fetchPendingRequests();
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  return (
    <div className="container mx-auto p-4">
    <h2 className="text-xl font-bold mb-4">Friends Management</h2>

    {/* Search and Add Friend */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold">Search for Friends</h3>
      <div className="flex gap-2 items-center justify-center">
        <Input
          type="text"
          placeholder="Search by name"
          className="border p-2 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          onClick={searchUsers}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </Button>
      </div>
      {searchResults.length > 0 && (
        <motion.ul
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {searchResults.map((user: any) => (
            <motion.li
              key={user._id}
              className="flex border-2 p-2 rounded-md justify-between items-center mb-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex gap-2">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  {user?.avatar ? (
                    <img className="w-full h-full rounded-full object-cover" src={user.avatar} alt="" />
                  ) : (
                    <span className="text-2xl">❔</span>
                  )}
                </div>
                <div className="">
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-sm font-normal">{user.bio || "Bio"}</p>
                </div>
              </div>

              <Button
                onClick={() => {
                  if (sentRequests.includes(user._id)) {
                    cancelFriendRequest(user._id, user.name);
                  } else {
                    sendFriendRequest(user._id);
                  }
                }}
                className={`${
                  sentRequests.includes(user._id) ? "bg-red-500" : "bg-green-500"
                } text-white px-2 py-1 rounded`}
              >
                {sentRequests.includes(user._id) ? "Cancel Request" : "Add Friend"}
              </Button>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>

    {/* Pending Friend Requests */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold">Pending Friend Requests</h3>
      {pendingRequests.length > 0 ? (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {pendingRequests.map((request: any) => (
            <motion.li
              key={request.request._id}
              className="flex flex-col bg-blue-200 rounded-lg p-3 border-2 justify-between gap-3 mb-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h1 className="font-bold text-lg border-b-2 py-2 border-black">
                You have a new Friend Request from:
              </h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    {request.sender?.avatar ? (
                      <img className="w-full h-full rounded-full object-cover" src={request.sender.avatar} alt="" />
                    ) : (
                      <span className="text-2xl">❔</span>
                    )}
                  </div>
                  <div className="">
                    <p className="text-md font-semibold">{request.sender.name}</p>
                    <p className="text-sm">{request.sender.bio || "Bio"}</p>
                  </div>
                </div>
                {/* Displaying sender's name */}
                <div>
                  <button
                    onClick={() => {
                      acceptFriendRequest(request.request._id);
                    }}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => rejectFriendRequest(request.request._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <p>No pending friend requests.</p>
      )}
    </div>

    {/* Friends List */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold underline my-1">Your Friends</h3>
      <div className="">
        <p className="text-lg font-semibold inline">
          Friends: <span className="font-bold text-blue-600">{friendCount}</span>
        </p>
        <Button
          className="hover:text-blue-400"
          onClick={() => setShowFriends(!showFriends)}
          variant={"link"}
        >
          {showFriends ? "HIDE Friends" : "VIEW Friends"}
        </Button>
      </div>
      {friends.length > 0 ? (
        <motion.ul
          className="my-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {showFriends &&
            friends.map((friend: any, index) => (
              <motion.li
                key={friend._id}
                className="flex gap-2 hover:bg-blue-300 cursor-pointer border-2 rounded-md my-3 p-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  {friend?.avatar ? (
                    <img className="w-full h-full rounded-full object-cover" src={friend.avatar} alt="" />
                  ) : (
                    <span className="text-2xl">❔</span>
                  )}
                </div>
                <div className="">
                  <p className="text-lg font-semibold">{friend.name}</p>
                  <p className="text-sm font-normal">{friend.bio || "Bio"}</p>
                </div>
              </motion.li>
            ))}
        </motion.ul>
      ) : (
        <p>No friends yet.</p>
      )}
    </div>

    {/* Messages and Errors */}
    <div className="flex">
      {message && (
        <p className="bg-green-300 p-1 rounded-md text-black inline-block">
          {typeof message === "string" ? message : JSON.stringify(message)}
        </p>
      )}

      {error && <p className="text-red-600 inline-block">{JSON.stringify(error)}</p>}
    </div>
  </div>
);

}
export default Friends;
