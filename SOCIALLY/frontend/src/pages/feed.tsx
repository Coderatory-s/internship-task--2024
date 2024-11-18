import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "next/router";
import ProtectedRoute from "@/components/ProtectedRoute";
import PostForm from "@/components/PostForm";
import Link from "next/link";
import FeedPosts from "@/components/FeedPosts";
import { IoSearch } from "react-icons/io5";
import { ProfileForm } from "@/components/ProfileForm";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RightSection from "@/components/RightSection";
const Feed = () => {
  const [isPostDialogOpen, setPostDialogOpen] = useState(false);
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [isProfileDialogOpen, setProfileDialogOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const clearToken = useAuthStore((state) => state.clearToken);
  const router = useRouter();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<User[]>([]);
  type User = {
    _id: string;
    name: string;
    bio?: string;
    avatar?: string;
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("No token found. Please log in.");
          return;
        }

        const response = await axios.get("http://localhost:3000/v1/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        toast.error("Failed to fetch user data.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/v1/users/auth/logout");
      clearToken();
      localStorage.removeItem("token");
      router.push("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Logout failed, please try again."
      );
    }
  };
  const handleProfileUpdate = async (updatedData: any) => {
    try {
      const formData = new FormData();
      formData.append("name", updatedData.name);
      formData.append("bio", updatedData.bio);
      if (updatedData.avatar) {
        formData.append("avatar", updatedData.avatar);
      }

      const response = await axios.put(
        "http://localhost:3000/v1/users/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the user state with the new profile data
      setUser({
        ...user,
        name: updatedData.name,
        bio: updatedData.bio,
        avatar: response.data.avatar || user.avatar, // assuming avatar URL comes back from the server
      });

      toast.success("Profile updated successfully!");
      setProfileDialogOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Profile update failed.");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/v1/users/search/username?name=${searchTerm}`
      );
      if (response.data.users) {
        setSearchResult(response.data.users); // Assuming the API returns an array of user objects
      } else {
        setSearchResult([]);
      }
    } catch (error) {
      setSearchResult([]);
      toast.error("Search failed. Please try again.");
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please log in.");
        return;
      }

      await axios.delete("http://localhost:3000/v1/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear token and redirect to login page
      clearToken();
      localStorage.removeItem("token");
      router.push("/login");
      toast.success("Profile deleted successfully!");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to delete profile."
      );
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen flex-col">
        {/* Navbar */}
        <div className="flex sticky top-0 justify-between items-center bg-blue-600 shadow-md p-4 text-white">
          {/* Left: SOCIALLY Logo */}
          <div>
            <Link href="/" className="text-xl font-bold">
              Socially.
            </Link>
          </div>

          {/* Middle: Search Bar */}
          <div className="flex items-center border-2 rounded-md">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 text-white focus:outline-dashed border-none w-[340px] rounded-none "
            />
            <Button
              onClick={() => handleSearch}
              className="text-white rounded-none border-l-2"
            >
              <IoSearch />
            </Button>
          </div>

          {/* Right: User Avatar & Dropdown */}
          <div className="">
            <button
              className="w-10 h-10 rounded-full bg-black flex items-center justify-center"
              onClick={toggleDropdown}
            >
              {user?.avatar ? (
                <img
                  src={user?.avatar}
                  alt="User Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white text-xl">❔</span>
              )}
            </button>

            {/* Dropdown menu inside Dialog */}

            <Dialog open={isDropdownOpen} onOpenChange={setDropdownOpen}>
              <DialogTrigger asChild />
              <DialogContent className="absolute right-0 mt-2 w-9 bg-white text-black rounded-md shadow-md z-[9999]">
                <DialogHeader>
                  <DialogTitle className="text-black">
                    Account Settings
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  <Button
                    onClick={() => {
                      setProfileDialogOpen(true);
                      toggleDropdown();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Update Profile
                  </Button>
                  <Button
                    onClick={() => {
                      setDeleteDialogOpen(true);
                      toggleDropdown();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Delete Profile
                  </Button>
                  <Button
                    onClick={() => {
                      toggleDropdown();
                      setLogoutDialogOpen(true);
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex h-full">
          <div className="w-1/4 bg-gray-200 border-r-4 border-blue-200 fixed top-[72px] bottom-0 left-0 h-full">
            <nav>
              <ul className="flex flex-col">
                <Link
                  className="hover:bg-blue-200 p-3 border-y-[1px]  border-gray-400"
                  href="/feed"
                >
                  Home
                </Link>
                <Link
                  className="hover:bg-blue-200 p-3 border-b-[1px]  border-gray-400"
                  href="/friends"
                >
                  Friends
                </Link>
              </ul>
            </nav>
          </div>
          <div className="flex-1 ml-[25%] mr-[25%] p-5 overflow-y-auto">
            <div className="flex mt-4 max-w-[600px] mx-auto  p-2 rounded-md shadow-lg border border-blue-400 shadow-slate-200 flex-col gap-2 items-center justify-between mb-4">
              <div className="w-36 h-36 flex items-center justify-center bg-black  rounded-full shadow-md border-2 ">
                {user?.avatar ? (
                  <img
                    src={user?.avatar}
                    alt="User Avatar"
                    className="w-full h-full rounded-full object-contain"
                  />
                ) : (
                  <span className="text-white text-6xl">❔</span>
                )}
              </div>
              <div className="text-xl">
                <span className="text-blue-600 font-bold">{user?.name}</span>
              </div>
              <div className="text-center">
                <strong>Bio: </strong>
                {user?.bio}
              </div>

              <Dialog
                open={isProfileDialogOpen}
                onOpenChange={setProfileDialogOpen}
              >
                <DialogTrigger asChild></DialogTrigger>
                <DialogContent className="bg-white ">
                  <DialogHeader>
                    <DialogTitle className="text-black underline">
                      Update Profile
                    </DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="flex items-center">
                    <ProfileForm
                      user={user}
                      onUpdate={handleProfileUpdate}
                      setProfileDialogOpen={setProfileDialogOpen}
                    />
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 items-start max-w-[600px] mx-auto break-words">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Input
                  className="text-gray-400 cursor-auto my-1 focus:outline-none outline-0 border-[1px]"
                  value={"Whats on your mind?"}
                  readOnly
                />

                <Button
                  onClick={() => setPostDialogOpen(true)}
                  className=" bg-blue-500 text-white "
                >
                  Create Post
                </Button>
              </div>

              <Dialog open={isPostDialogOpen} onOpenChange={setPostDialogOpen}>
                <DialogTrigger asChild></DialogTrigger>
                <DialogContent className="max-w-[1000px] border-2 bg-white  ">
                  <DialogTitle></DialogTitle>
                  <DialogHeader></DialogHeader>
                  <DialogFooter className="w-full  rounded-lg">
                    <PostForm closeDialog={() => setPostDialogOpen(false)} />
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="w-full">
                <FeedPosts users={user} />
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div className="w-1/4   border-l-4  border-blue-200  fixed top-[72px] bottom-0 right-0 h-full">
            <RightSection />
          </div>
        </div>
        {/* {} */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogTrigger asChild />
          <DialogContent className="bg-red-500 text-white">
            <DialogHeader>
              <DialogTitle className="underline">
                Confirm Profile Deletion
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-lg">
              Are you sure you want to delete your profile? This action is
              irreversible.
            </DialogDescription>
            <DialogFooter>
              <Button
                className="bg-red-700 text-white"
                onClick={handleDeleteProfile}
              >
                Confirm
              </Button>
              <Button
                variant="outline"
                className="bg-gray-200 text-black"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Logout Confirmation Dialog */}
        <Dialog open={isLogoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
          <DialogTrigger asChild />
          <DialogContent className="bg-blue-500">
            <DialogHeader>
              <DialogTitle className="text-white underline">
                Confirm Logout
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-white text-lg">
              Are you sure you want to log out?
            </DialogDescription>
            <DialogFooter>
              <Button className="bg-red-500 text-white" onClick={handleLogout}>
                Logout
              </Button>
              <Button
                variant="outline"
                className="text-white"
                onClick={() => setLogoutDialogOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </ProtectedRoute>
  );
};

export default Feed;
