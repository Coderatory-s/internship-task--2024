
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { getUserIdFromToken } from "./FeedPosts";

// Define the type of the user object
type User = {
  _id: string;
  name: string;
  bio?: string;
  avatar?: string;
};

const RightSection = () => {
  const [isSearchDialogOpen, setSearchDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // Mock authenticated user (replace with real user auth logic)
  const currentUserId = "current-user-id"; // You can replace this with real user data from your auth context or state

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/users/search/username?name=${searchTerm}`);
      if (response.data.users) {
        setSearchResult(response.data.users);
      } else {
        setSearchResult([]);
      }
    } catch (error) {
      setSearchResult([]);
      toast.error("Search failed. Please try again.");
    }
  };

  const handleUserClick = async (user: User) => {
    try {
      const userId = getUserIdFromToken();
      const response = await axios.post("http://localhost:3000/v1/chats/create-chat", {
        users: [user._id, userId],
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.status === 201) {
        toast.success(`Chat started with ${user.name}`);
        setSelectedUsers((prevUsers) => [...prevUsers, user]);
        setSearchDialogOpen(false); // Close the dialog
      }
    } catch (error: any) {
      toast.error(`Failed to start the chat. Please try again. ${error.message}`);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Chats</h2>

      <Button onClick={() => setSearchDialogOpen(true)} className="mb-4">
        Search User
      </Button>

      {/* Search Dialog */}
      <Dialog open={isSearchDialogOpen} onOpenChange={setSearchDialogOpen}>
        <DialogTrigger asChild />
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Search for a User</DialogTitle>
          </DialogHeader>

          {/* Search Input */}
          <Input
            type="text"
            placeholder="Enter user name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />

          {/* Search Button */}
          <Button onClick={handleSearch} className="mb-4 bg-blue-400">
            Search
          </Button>

          {/* Search Result - Profile Card Display */}
          <div className="grid gap-4 max-h-screen">
            {searchResult.length > 0 ? (
              searchResult.map((user: User) => (
                <div
                  key={user._id}
                  className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer"
                  onClick={() => handleUserClick(user)} // Select user and start chat
                >
                  <div className="w-12 h-12 mr-4">
                    <img
                      src={user.avatar || "/default-avatar.png"}
                      alt="User Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold">{user.name}</h1>
                    <p className="text-gray-600 text-xs">{user.bio || "Not available"}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Display Selected Users' Chats */}
      {selectedUsers.length > 0 && selectedUsers.map((user, index) => (
        <div key={user._id} className="p-4 min-h-[530px] bg-gray-100 rounded-lg mt-4">
          <h3 className="text-lg font-semibold mb-2">Chat with {user.name}</h3>
          <p className="text-gray-600 text-xs mb-4">{user.bio}</p>

          {/* Chat Input */}
          <div className="flex gap-2 items-end justify-end border-2 h-full">
            <Input
              type="text"
              placeholder={`Send a message to ${user.name}`}
              className=""
            />
            <Button className="bg-blue-400">Send</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RightSection;
