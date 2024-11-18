// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";

// // export const RightSection = () => {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [searchResults, setSearchResults] = useState<any[]>([]);
// //   const [selectedUser, setSelectedUser] = useState<any>(null);
// //   const [messages, setMessages] = useState<any[]>([]);
// //   const [newMessage, setNewMessage] = useState("");

// //   // Fetch users based on search
// //   const handleSearch = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await axios.get(
// //         `http://localhost:3000/v1/users/search/username?name=${searchTerm}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       setSearchResults(response.data.users); // Assuming the response contains users list
// //     } catch (error) {
// //       console.error("Error fetching users:", error);
// //     }
// //   };

// //   // Select user and fetch messages
// //   const handleUserSelect = async (user: any) => {
// //     setSelectedUser(user);
// //     console.log("user ", user);
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await axios.get(
// //         `http://localhost:3000/v1/chat/${user._id}`, // Assuming API for chat messages
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       setMessages(response.data.messages);
// //     } catch (error) {
// //       console.error("Error fetching chat messages:", error);
// //     }
// //   };

// //   // Send a new message
// //   const sendMessage = async () => {
// //     if (newMessage.trim() === "") return;
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await axios.post(
// //         `http://localhost:3000/v1/chat/${selectedUser._id}`,
// //         { message: newMessage },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       setMessages([...messages, response.data.message]);
// //       setNewMessage("");
// //     } catch (error) {
// //       console.error("Error sending message:", error);
// //     }
// //   };

// //   return (
// //     <div className="h-screen bg-gray-100 p-4 border-l  border-gray-300">
// //       {/* Chat heading */}
// //       <h2 className="text-lg font-bold mb-4">Chats</h2>

// //       {/* Search input */}
// //       <div className="mb-4">
// //         <Input
// //           type="text"
// //           placeholder="Search by name..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           className="p-2 w-full border rounded-md"
// //         />
// //         <Button
// //           type="button"
// //           onClick={handleSearch}
// //           className="mt-2 w-full bg-blue-500 text-white"
// //         >
// //           Search
// //         </Button>
// //       </div>

// //       {/* Search results */}
// //       <div className="mb-4  border-2 border-blue-400 rounded-lg">
// //         {searchResults.length > 0 ? (
// //           <ul>
// //             {searchResults.map((user) => (
// //               <li
// //                 key={user._id}
// //                 onClick={() => handleUserSelect(user)}
// //                 className="p-4  flex items-center gap-2 cursor-pointer rounded-lg hover:bg-gray-200"
// //               >
// //                 <div className="flex items-center bg-black justify-center h-14 w-16 rounded-full">
// //                   {user?.avatar ? (
// //                     <img
// //                       className="object-cover rounded-full"
// //                       src={user?.avatar}
// //                       alt="User Avatar"
// //                     />
// //                   ) : (
// //                     <span className="text-2xl bg-black ">❔</span>
// //                   )}
// //                 </div>
// //                 <div className="">
// //                   <p className="font-bold text-lg"> {user.name}</p>
// //                   <p className="text-sm"> {user?.bio}</p>
// //                 </div>
// //               </li>
// //             ))}
// //           </ul>
// //         ) : (
// //           <p className="ml-2">No users found</p>
// //         )}
// //       </div>

// //       {/* Chat Box */}
// //       {selectedUser && (
// //         <div className="flex flex-col h-full">
// //           <div className="flex-1 overflow-y-auto border-t border-b p-2">
// //             {/* Messages */}
// //             {messages.length > 0 ? (
// //               <ul>
// //                 {messages.map((message, index) => (
// //                   <li
// //                     key={index}
// //                     className={`p-2 ${
// //                       message.sender === "me" ? "text-right" : ""
// //                     }`}
// //                   >
// //                     {message.text}
// //                   </li>
// //                 ))}
// //               </ul>
// //             ) : (
// //               <p>No messages yet</p>
// //             )}
// //           </div>

// //           {/* New message input */}
// //           <div className="mt-4 flex items-center">
// //             <Input
// //               type="text"
// //               placeholder="Type your message..."
// //               value={newMessage}
// //               onChange={(e) => setNewMessage(e.target.value)}
// //               className="p-2 flex-1"
// //             />
// //             <Button
// //               onClick={sendMessage}
// //               className="ml-2 bg-blue-500 text-white"
// //             >
// //               Send
// //             </Button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default RightSection;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

// export const RightSection = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState<any[]>([]);
//   const [selectedUser, setSelectedUser] = useState<any>(null);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

// const handleSearch = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await axios.get(
//       `http://localhost:3000/v1/users/search/username?name=${searchTerm}`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     setSearchResults(response.data.users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//   }
// };

//   const handleUserSelect = async (user: any) => {
//     setSelectedUser(user);
//     setIsDialogOpen(true);
//     console.log(user);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `http://localhost:3000/v1/chat/${user?._id}/otherUserId?otherUserId=${}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessages(response.data.messages);
//     } catch (error) {
//       console.error("Error fetching chat messages:", error);
//     }
//   };

//   const sendMessage = async () => {
//     if (newMessage.trim() === "") return;
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         `http://localhost:3000/v1/chat/${selectedUser._id}`,
//         { message: newMessage },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessages([...messages, response.data.message]);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="h-screen bg-gray-100 p-4 border-l border-gray-300">
//       <h2 className="text-lg font-bold mb-4">Chats</h2>

//       <div className="mb-4">
//         <Input
//           type="text"
//           placeholder="Search by name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="p-2 w-full border rounded-md"
//         />
//         <Button
//           type="button"
//           onClick={handleSearch}
//           className="mt-2 w-full bg-blue-500 text-white"
//         >
//           Search
//         </Button>
//       </div>

//       <div className="mb-4 border-2 border-blue-400 rounded-lg">
//         {searchResults.length > 0 ? (
//           <ul>
//             {searchResults.map((user) => (
//               <li
//                 key={user._id}
//                 onClick={() => handleUserSelect(user)}
//                 className="p-4 flex items-center gap-2 cursor-pointer rounded-lg hover:bg-gray-200"
//               >
// <span className="flex items-center bg-black justify-center h-12 w-12 rounded-full">
//   {user?.avatar ? (
//     <img
//       className="object-cover rounded-full"
//       src={user?.avatar}
//       alt="User Avatar"
//     />
//   ) : (
//     <span className="text-2xl bg-black">❔</span>
//   )}
// </span>
//                 <div>
//                   <p className="font-bold text-lg">{user.name}</p>
//                   <p className="text-sm opacity-75">{user?.bio}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="ml-2">No users found</p>
//         )}
//       </div>

//       {selectedUser && (
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogContent className="bg-white">
//             <div className="flex flex-col h-full p-4">
//               <div className="flex items-center mb-4">
//                 <span className="flex items-center bg-black justify-center h-12 w-12 rounded-full">
//                   {selectedUser?.avatar ? (
//                     <img
//                       className="object-cover rounded-full"
//                       src={selectedUser?.avatar}
//                       alt="User Avatar"
//                     />
//                   ) : (
//                     <span className="text-2xl bg-black">❔</span>
//                   )}
//                 </span>
//                 <div className="ml-2">
//                   <p className="font-bold text-lg">{selectedUser.name}</p>
//                   <p className="text-sm">{selectedUser?.bio}</p>
//                 </div>
//               </div>

//               <div className="flex-1 overflow-y-auto border-t border-b p-2">
//                 {messages.length > 0 ? (
//                   <ul>
//                     {messages.map((message, index) => (
//                       <li
//                         key={index}
//                         className={`p-2 ${
//                           message.sender === "me" ? "text-right" : ""
//                         }`}
//                       >
//                         {message.text}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-center">No messages yet</p>
//                 )}
//               </div>

//               <div className="mt-4 flex items-center">
//                 <Input
//                   type="text"
//                   placeholder="Type your message..."
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   className="p-2 flex-1"
//                 />
//                 <Button
//                   onClick={sendMessage}
//                   className="ml-2 bg-blue-500 text-white"
//                 >
//                   Send
//                 </Button>
//               </div>

//               <Button
//                 onClick={() => setIsDialogOpen(false)}
//                 className="mt-4 bg-red-500 text-white"
//               >
//                 Close
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       )}
//     </div>
//   );
// };

// export default RightSection;

// import { useState, useEffect, use } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { IoSearch } from "react-icons/io5";
// import { ChatBox } from "@/components/ChatBox"; // A new component for chat box

// interface Message {
//   text: string;
//   senderId: string;
//   recipientId: string;
// }

// interface User {
//   _id: string;
//   name: string;
//   bio: string;
//   avatar: string;
// }

// const RightSection = () => {
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [searchResults, setSearchResults] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState<string>("");

//   // Search for users
//   const handleSearch = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `http://localhost:3000/v1/users/search/username?name=${searchQuery}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setSearchResults(response.data.users);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };
//   // Fetch messages when a user is selected
//   const fetchMessages = async (userId: string) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/v1/chat/messages?userId=${userId}`
//       );
//       setMessages(response.data);
//     } catch (error) {
//       console.error("Failed to fetch messages:", error);
//     }
//   };

//   // Handle sending a message
//   const sendMessage = async () => {
//     if (!newMessage || !selectedUser) return;

//     try {
//       const response = await axios.post("http://localhost:3000/v1/chat/", {
//         message: newMessage,
//         recipientId: selectedUser._id,
//       });
//       setMessages([...messages, response.data]); // Add the new message
//       setNewMessage(""); // Clear the input field
//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }
//   };

//   useEffect(() => {
//     if (selectedUser) {
//       fetchMessages(selectedUser._id);
//     }
//   }, [selectedUser]);

//   return (
//     <div className="p-4 bg-gray-100 w-full h-full">
//       <h1 className="text-xl font-bold mb-4">Chats</h1>

//       {/* Search Bar */}
//       <div className="flex items-center border-2 rounded-md mb-4">
//         <Input
//           type="text"
//           placeholder="Search users..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="p-2 bg-gray-300 focus:outline-dashed border-none w-[340px] rounded-none"
//         />
//         <Button onClick={handleSearch} className=" rounded-none border-l-2">
//           <IoSearch />
//         </Button>
//       </div>

//       {/* Search Results */}
//       {searchResults.length > 0 && (
//         <div className="h-400px overflow-y-auto">
//           <div className="text-lg font-semibold mb-2">Search Results:</div>
//           <div className="space-y-2 border-2 border-blue-400 hover:bg-gray-200 rounded-lg my-2">
//             {searchResults.map((user) => (
//               <li
//                 key={user._id}
//                 className="flex gap-2 items-center  p-2 border-b"
//                 onClick={() => setSelectedUser(user)}
//               >
//                 <span className="flex items-center bg-black justify-center h-12 w-12 rounded-full">
//                   {user?.avatar ? (
//                     <img
//                       className="h-full w-full object-cover rounded-full"
//                       src={user?.avatar}
//                       alt="User Avatar"
//                     />
//                   ) : (
//                     <span className="text-2xl bg-black">❔</span>
//                   )}
//                 </span>
//                 <div>
//                   <h1 className="text-lg font-bold">{user.name}</h1>
//                   <p className="text-sm opacity-65">{user.bio}</p>
//                   <div className="text-blue-500 text-sm cursor-pointer">
//                     View Profile
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Chat Box */}
//       {selectedUser && (
//         <div className="mt-1 border-2 border-black">
//           <div className="flex items-center gap-2 p-4 border-b bg-gray-200">
//             <span className="flex  items-center bg-black justify-center h-10 w-10 rounded-full">
//               {selectedUser?.avatar ? (
//                 <img
//                   className="w-full h-full object-cover rounded-full"
//                   src={selectedUser?.avatar}
//                   alt="User Avatar"
//                 />
//               ) : (
//                 <span className="text-2xl bg-black">❔</span>
//               )}
//             </span>
//             <div className="">
//               <div className="text-lg font-semibold">{selectedUser.name}</div>
//               <div className="text-sm text-gray-500">{selectedUser.bio}</div>
//             </div>
//           </div>

//           <ChatBox
//             messages={messages}
//             newMessage={newMessage}
//             setNewMessage={setNewMessage}
//             sendMessage={sendMessage}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default RightSection;
// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { IoSearch } from "react-icons/io5";
// import { ChatBox } from "@/components/ChatBox";
// import { getUserIdFromToken } from "./FeedPosts";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// interface Message {
//   text: string;
//   senderId: string;
//   recipientId: string;
// }

// interface User {
//   _id: string;
//   name: string;
//   bio: string;
//   avatar: string;
// }

// const RightSection = () => {
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [searchResults, setSearchResults] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState<string>("");

//   // Search for users
// const handleSearch = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await axios.get(
//       `http://localhost:3000/v1/users/search/username?name=${searchQuery}`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     setSearchResults(response.data.users);

//     if (response.data.users.length > 0) {
//       // toast.success("Users found!");
//     } else {
//       // toast.info("No users found.");
//     }
//   } catch (error) {
//     console.log(error);
//     // toast.error("Error fetching users. Please try again.");
//   }
// };

//   // Fetch messages between the logged-in user and selected user
//   const fetchMessages = async (userId: string) => {
//     try {
//       const token = localStorage.getItem("token");
//       const loggedInUserId = getUserIdFromToken(); // Assuming the logged-in user's ID is stored

//       const response = await axios.get(
//         `http://localhost:3000/v1/chat/${loggedInUserId}/${"6731f623224e7c4c63ff35f7"}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setMessages(response.data.messages); // Ensure the API response contains a messages array
//     } catch (error) {
//       console.error("Failed to fetch messages:", error);
//     }
//   };

//   const sendMessage = async () => {
//     if (!newMessage || !selectedUser) {
//       // toast.error("Please enter a message and select a user!");
//       console.log("Please enter a message and select a user!");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const loggedInUserId = getUserIdFromToken();

//       const response = await axios.post(
//         `http://localhost:3000/v1/chat/messages/${selectedUser._id}/sendMessage`,
//         {
//           message: newMessage,
//           recipientId: selectedUser._id,
//           senderId: loggedInUserId, // Check if loggedInUserId is correctly retrieved
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log("Token:", token);
//       console.log("Selected User ID:", selectedUser._id);

//       setMessages([...messages, response.data.message]);
//       setNewMessage("");
//       // toast.success("Message sent successfully!");
//       console.log("response data", response.data.message);
//     } catch (error: any) {
//       console.error("Error sending message:", error.response || error.message);
//       // toast.error(error.response?.data?.message || "Failed to send message.");
//     }
//   };

//   // useEffect(() => {
//   //   if (selectedUser) {
//   //     fetchMessages(selectedUser._id);
//   //   }
//   // }, [selectedUser]);

//   return (
//     <div className="p-4 bg-gray-100 w-full h-full">
//       <h1 className="text-xl font-bold mb-4">Chats</h1>

//       {/* Search Bar */}
//       <div className="flex items-center border-2 rounded-md mb-4">
//         <Input
//           type="text"
//           placeholder="Search users..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="p-2 bg-gray-300 focus:outline-dashed border-none w-[340px] rounded-none"
//         />
//         <Button onClick={handleSearch} className="rounded-none border-l-2">
//           <IoSearch />
//         </Button>
//       </div>

//       {/* Search Results */}
//       {searchResults.length > 0 && (
//         <div className="h-400px overflow-y-auto">
//           <div className="text-lg font-semibold mb-2">Search Results:</div>
//           <div className="space-y-2 border-2 border-blue-400 hover:bg-gray-200 rounded-lg my-2">
//             {searchResults.map((user) => (
//               <li
//                 key={user._id}
//                 className="flex gap-2 items-center p-2 border-b"
//                 onClick={() => setSelectedUser(user)}
//               >
//                 <span className="flex items-center bg-black justify-center h-12 w-12 rounded-full">
//                   {user?.avatar ? (
//                     <img
//                       className="h-full w-full object-cover rounded-full"
//                       src={user?.avatar}
//                       alt="User Avatar"
//                     />
//                   ) : (
//                     <span className="text-2xl bg-black">❔</span>
//                   )}
//                 </span>
//                 <div>
//                   <h1 className="text-lg font-bold">{user.name}</h1>
//                   <p className="text-sm opacity-65">{user.bio}</p>
//                   <div className="text-blue-500 text-sm cursor-pointer">
//                     View Profile
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Chat Box */}
//       {selectedUser && (
//         <div className="mt-1 border rounded-lg border-black">
//           <ChatBox
//             messages={messages}
//             newMessage={newMessage}
//             setNewMessage={setNewMessage}
//             sendMessage={sendMessage}
//             selectedUser={selectedUser} // Pass selectedUser here
//           />
//         </div>
//       )}
//       {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar /> */}
//     </div>
//   );
// };

// export default RightSection;

// import { useState, useEffect } from "react";
// import { ZegoExpressEngine } from "zego-express-engine-webrtc";

// // Initialize ZegoCloud with your appID and serverURL
// const appID = 928450383; // Replace with your ZegoCloud appID
// const server = "9a5b3e8c983af8e2dc0285cbeac624c5"; // Replace with your ZegoCloud server URL
// let zegoEngine: any = null;

// const RightSection = () => {
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState("");
//   const [user, setUser] = useState({ userID: "userID", userName: "Username" });

//   // Initialize ZegoEngine on component mount
//   useEffect(() => {
//     zegoEngine = new ZegoExpressEngine(appID, server);
//     zegoEngine.loginRoom("roomID", user);

//     zegoEngine.on("IMRecvBroadcastMessage", (roomID: any, messageList: any) => {
//       const newMessages = messageList.map((msg: any) => ({
//         userName: msg.fromUser.userName,
//         content: msg.message,
//       }));
//       setMessages((prevMessages: any) => [...prevMessages, ...newMessages]);
//     });

//     return () => {
//       zegoEngine.logoutRoom("roomID");
//     };
//   }, []);

//   // Function to send message
//   const sendMessage = () => {
//     if (messageInput.trim()) {
//       zegoEngine.sendBroadcastMessage("roomID", messageInput).then(() => {
//         setMessages((prev) => [
//           ...prev,
//           { userName: user.userName, content: messageInput },
//         ]);
//         setMessageInput(""); // Clear input after sending
//       });
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-bold mb-4">Chat</h2>
//       <div className="chat-box border p-2 mb-4 h-[400px] overflow-y-auto">
//         {messages.map((msg, index) => (
//           <div key={index} className="message mb-2">
//             <strong>{msg.userName}</strong>: {msg.content}
//           </div>
//         ))}
//       </div>
//       <div className="flex">
//         <input
//           type="text"
//           className="p-2 border rounded w-full"
//           placeholder="Type your message..."
//           value={messageInput}
//           onChange={(e) => setMessageInput(e.target.value)}
//         />
//         <button
//           onClick={sendMessage}
//           className="ml-2 bg-blue-500 text-white p-2 rounded"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RightSection;

// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { IoSearch } from "react-icons/io5";
// import { ChatBox } from "@/components/ChatBox";
// import { getUserIdFromToken } from "./FeedPosts";

// interface Message {
//   text: string;
//   senderId: string;
//   recipientId: string;
// }

// interface User {
//   _id: string;
//   name: string;
//   bio: string;
//   avatar: string;
// }

// interface Chat {
//   _id: string;
//   participants: User[];
//   messages: Message[];
// }

// const RightSection = () => {
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [searchResults, setSearchResults] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState<string>("");
//   const [chats, setChats] = useState<Chat[]>([]); // State to hold the chats

//   const handleSearch = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `http://localhost:3000/v1/users/search/username?name=${searchQuery}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setSearchResults(response.data.users);

//       if (response.data.users.length > 0) {
//         // toast.success("Users found!");
//       } else {
//         // toast.info("No users found.");
//       }
//     } catch (error) {
//       console.log(error);
//       // toast.error("Error fetching users. Please try again.");
//     }
//   };
//   // Fetch chat list for the logged-in user
//   const fetchChats = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const loggedInUserId = getUserIdFromToken(); // Get logged-in user's ID

//       const response = await axios.get(
//         `http://localhost:3000/v1/chat/${loggedInUserId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setChats(response.data.chats); // Set chats state with fetched chats
//     } catch (error) {
//       console.error("Error fetching chats:", error);
//     }
//   };

//   // Fetch messages between the logged-in user and selected user
//   const fetchMessages = async (userId: string) => {
//     try {
//       const token = localStorage.getItem("token");
//       const loggedInUserId = getUserIdFromToken(); // Get logged-in user ID

//       const response = await axios.get(
//         `http://localhost:3000/v1/chat/${loggedInUserId}/${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setMessages(response.data.messages); // Set messages for the selected chat
//     } catch (error) {
//       console.error("Failed to fetch messages:", error);
//     }
//   };

//   // Send a new message
//   // const sendMessage = async () => {
//   //   if (!newMessage || !selectedUser) {
//   //     console.log("Please enter a message and select a user!");
//   //     return;
//   //   }

//   //   try {
//   //     const token = localStorage.getItem("token");
//   //     const loggedInUserId = getUserIdFromToken();

//   //     const response = await axios.post(
//   //       `http://localhost:3000/v1/chat/messages/${selectedUser._id}/sendMessage`,
//   //       {
//   //         message: newMessage,
//   //         recipientId: selectedUser._id,
//   //         senderId: loggedInUserId,
//   //       },
//   //       {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       }
//   //     );
//   //     // console.log(response.data);
//   //     // setMessages((prevMessages) => [...prevMessages, response.data.message]); // Append new message
//   //     console.log("Full response:", response.data);
//   //     if (response.data.messages.length > 0) {
//   //       const newMessage =
//   //         response.data.messages[response.data.messages.length - 1];
//   //       setMessages((prevMessages) => [...prevMessages, newMessage]);
//   //     }

//   //     setNewMessage(""); // Clear the input field
//   //     console.log("Messages", messages);
//   //   } catch (error: any) {
//   //     console.error("Error sending message:", error.response || error.message);
//   //   }
//   // };
//   const sendMessage = async () => {
//     if (!newMessage || !selectedUser) {
//       console.log("Please enter a message and select a user!");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const loggedInUserId = getUserIdFromToken();

//       const response = await axios.post(
//         `http://localhost:3000/v1/chat/messages/${loggedInUserId}/sendMessage`,
//         {
//           message: newMessage,
//           recipientId: selectedUser._id,
//           senderId: loggedInUserId,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       console.log("Full response:", response.data);

//       if (response.data.messages && response.data.messages.length > 0) {
//         const newMessage =
//           response.data.messages[response.data.messages.length - 1];
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//         setNewMessage(""); // Clear the input field
//       }

//       console.log("Messages", messages);
//     } catch (error: any) {
//       console.error("Error sending message:", error.response || error.message);
//     }
//   };

//   // Fetch chats when the component mounts
//   useEffect(() => {
//     fetchChats();
//   }, []);

//   // Fetch messages when the selected user changes
//   useEffect(() => {
//     if (selectedUser) {
//       fetchMessages(selectedUser._id);
//     }
//   }, [selectedUser]);

//   return (
//     <div className="p-4 bg-gray-100 w-full h-full">
//       <h1 className="text-xl font-bold mb-4">Chats</h1>

//       {/* Chat List (Already existing conversations) */}
//       <div className="mb-4">
//         {chats.length > 0 && (
//           <div className="space-y-2">
//             <div className="text-lg font-semibold mb-2">Chats:</div>
//             {chats.map((chat) => {
//               const otherUser = chat.participants.find(
//                 (user) => user._id !== getUserIdFromToken()
//               );
//               return (
//                 <div
//                   key={chat._id}
//                   className="flex gap-2 items-center p-2 border-b"
//                   onClick={() => setSelectedUser(otherUser!)}
//                 >
//                   <span className="flex items-center bg-black justify-center h-12 w-12 rounded-full">
//                     {otherUser?.avatar ? (
//                       <img
//                         className="h-full w-full object-cover rounded-full"
//                         src={otherUser?.avatar}
//                         alt="User Avatar"
//                       />
//                     ) : (
//                       <span className="text-2xl bg-black">❔</span>
//                     )}
//                   </span>
//                   <div>
//                     <h1 className="text-lg font-bold">{otherUser?.name}</h1>
//                     <p className="text-sm opacity-65">{otherUser?.bio}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Search Bar */}
//       <div className="flex items-center border-2 rounded-md mb-4">
//         <Input
//           type="text"
//           placeholder="Search users..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="p-2 bg-gray-300 focus:outline-dashed border-none w-[340px] rounded-none"
//         />
//         <Button onClick={handleSearch} className="rounded-none border-l-2">
//           <IoSearch />
//         </Button>
//       </div>

//       {/* Search Results */}
//       {searchResults.length > 0 && (
//         <div className="h-400px overflow-y-auto">
//           <div className="text-lg font-semibold mb-2">Search Results:</div>
//           <div className="space-y-2 border-2 border-blue-400 hover:bg-gray-200 rounded-lg my-2">
//             {searchResults.map((user) => (
//               <li
//                 key={user._id}
//                 className="flex gap-2 items-center p-2 border-b"
//                 onClick={() => setSelectedUser(user)}
//               >
//                 <span className="flex items-center bg-black justify-center h-12 w-12 rounded-full">
//                   {user?.avatar ? (
//                     <img
//                       className="h-full w-full object-cover rounded-full"
//                       src={user?.avatar}
//                       alt="User Avatar"
//                     />
//                   ) : (
//                     <span className="text-2xl bg-black">❔</span>
//                   )}
//                 </span>
//                 <div>
//                   <h1 className="text-lg font-bold">{user.name}</h1>
//                   <p className="text-sm opacity-65">{user.bio}</p>
//                   <div className="text-blue-500 text-sm cursor-pointer">
//                     View Profile
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Chat Box */}
//       {selectedUser && (
//         <div className="mt-1 border rounded-lg border-black">
//           <ChatBox
//             messages={messages}
//             newMessage={newMessage}
//             setNewMessage={setNewMessage}
//             sendMessage={sendMessage}
//             selectedUser={selectedUser}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default RightSection;
// import { useEffect, useState } from "react";
// import { ZegoExpressEngine } from "zego-express-engine-webrtc";

// const appID = 928450383; // Replace with your ZEGOCLOUD appID
// const serverSecret = "9a5b3e8c983af8e2dc0285cbeac624c5"; // Replace with your serverSecret

// const RightSection = () => {
//   const [chatMessages, setChatMessages] = useState<string[]>([]);
//   const [message, setMessage] = useState("");
//   let zegoEngine: any;

//   useEffect(() => {
//     // Ensure ZEGOCLOUD SDK is initialized on the client side
//     if (typeof window !== "undefined") {
//       document.title = "New Page Title";

//       // Initialize ZEGOCLOUD SDK
//       const initZegoCloud = async () => {
//         zegoEngine = new ZegoExpressEngine(appID, serverSecret);

//         // Log in to the ZEGOCLOUD room
//         zegoEngine.loginRoom("room1", { userID: "user1", userName: "User1" });

//         // Set up listener for receiving messages
//         zegoEngine.on(
//           "IMRecvBroadcastMessage",
//           (roomID: string, messages: any[]) => {
//             const newMessages = messages.map((msg) => msg.message);
//             setChatMessages((prev) => [...prev, ...newMessages]);
//           }
//         );
//       };

//       initZegoCloud();
//     }

//     // Cleanup function to logout when the component unmounts
//     return () => {
//       if (zegoEngine) {
//         zegoEngine.logoutRoom("room1");
//       }
//     };
//   }, []);

//   // Send a message
//   const sendMessage = () => {
//     if (zegoEngine) {
//       zegoEngine.sendBroadcastMessage("room1", message, (messageID: string) => {
//         console.log("Message sent with ID:", messageID);
//       });
//       setMessage("");
//     }
//   };

//   return (
//     <div className="chat-section p-4">
//       <h2 className="text-xl font-bold">Chat Room</h2>
//       <div className="chat-box overflow-y-auto h-[300px] border p-2 mb-4">
//         {chatMessages.map((msg, index) => (
//           <div key={index} className="chat-message">
//             {msg}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         className="border p-2 w-full"
//         placeholder="Type a message..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button
//         onClick={sendMessage}
//         className="bg-blue-500 text-white p-2 mt-2 w-full"
//       >
//         Send Message
//       </button>
//     </div>
//   );
// };

// export default RightSection;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { toast } from "react-toastify";
// import { ZIMKit } from "@zegocloud/zimkit-rn";

// const RightSection = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState<any[]>([]);
//   const [isSearchDialogOpen, setSearchDialogOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<any>(null);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     // Initialize ZegoUIKit only once when the component mounts
//     ZegoUIKit.init({
//       appID: 928450383, // replace with your ZEGOCLOUD app ID
//       serverSecret: "9a5b3e8c983af8e2dc0285cbeac624c5", // replace with your server secret
//     });
//   }, []);

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/v1/users/search?name=${searchTerm}`
//       );
//       setSearchResults(response.data);
//     } catch (error) {
//       toast.error("User search failed.");
//     }
//   };

//   const handleStartChat = async (user: any) => {
//     setSelectedUser(user);
//     setSearchDialogOpen(false);

//     try {
//       // Fetch previous chats from backend
//       const response = await axios.get(
//         `http://localhost:3000/v1/chats/${user._id}`
//       );
//       setMessages(response.data);

//       // Join room in ZegoUIKit using user's unique ID or a room ID
//       ZegoUIKit.joinRoom(user._id); // user._id can be used as roomId
//     } catch (error) {
//       toast.error("Failed to load chat.");
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!newMessage.trim()) return; // Avoid sending empty messages

//     try {
//       // Save message to backend
//       await axios.post(`http://localhost:3000/v1/chats/${selectedUser._id}`, {
//         message: newMessage,
//       });

//       // Send real-time message using ZegoUIKit
//       ZegoUIKit.sendMessage(newMessage);

//       // Update UI with the new message
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: "You", content: newMessage },
//       ]);
//       setNewMessage(""); // Reset the message input
//     } catch (error) {
//       toast.error("Failed to send message.");
//     }
//   };

//   useEffect(() => {
//     // Listen for incoming messages from ZegoUIKit
//     ZegoUIKit.onMessageReceived((message: any) => {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: "Other", content: message.text },
//       ]);
//     });

//     return () => {
//       // Clean up listeners when component unmounts
//       ZegoUIKit.offMessageReceived();
//     };
//   }, []);

//   return (
//     <div className="p-4">
//       <Button onClick={() => setSearchDialogOpen(true)}>Search User</Button>

//       <Dialog open={isSearchDialogOpen} onOpenChange={setSearchDialogOpen}>
//         <DialogTrigger asChild />
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Search User</DialogTitle>
//           </DialogHeader>
//           <Input
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Enter username"
//           />
//           <Button onClick={handleSearch}>Search</Button>
//           <div>
//             {searchResults.map((user) => (
//               <div
//                 key={user._id}
//                 onClick={() => handleStartChat(user)}
//                 className="cursor-pointer hover:bg-gray-200 p-2"
//               >
//                 {user.name}
//               </div>
//             ))}
//           </div>
//         </DialogContent>
//       </Dialog>

//       {selectedUser && (
//         <div className="mt-4">
//           <h2>Chat with {selectedUser.name}</h2>
//           <div className="chat-box border p-2 h-64 overflow-y-auto">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={msg.sender === "You" ? "text-right" : "text-left"}
//               >
//                 <strong>{msg.sender}: </strong>
//                 {msg.content}
//               </div>
//             ))}
//           </div>
//           <Input
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="mt-2"
//           />
//           <Button onClick={handleSendMessage} className="mt-2">
//             Send
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RightSection;

// ---------------------------------------------
// import { useState } from "react";
// import ChatList from "./ChatList";
// import ChatBox from "./ChatBox";

// const RightSection = () => {
//   const [selectedChatId, setSelectedChatId] = useState(null);

//   const handleChatSelect = (chatId: any) => {
//     setSelectedChatId(chatId);
//   };

//   return (
//     <div className="main-chat">
//       <div className="chat-sidebar">
//         <ChatList onSelectChat={handleChatSelect} />
//       </div>

//       <div className="chat-window">
//         {selectedChatId ? (
//           <ChatBox selectedChatId={selectedChatId} />
//         ) : (
//           <p>Please select a chat to start messaging.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RightSection;

// -----------------------------------
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { getUserIdFromToken } from "./FeedPosts";

// const RightSection = () => {
//   const [chats, setChats] = useState<any[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [selectedChat, setSelectedChat] = useState<string | null>(null);
//   const [newMessage, setNewMessage] = useState<string>("");

//   const fetchUserChats = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const userId = getUserIdFromToken();
//       const response = await axios.get(
//         `http://localhost:3000/v1/chats/user/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setChats(response.data);
//     } catch (error) {
//       toast.error("Failed to load chats.");
//     }
//   };

//   const fetchMessages = async (chatId: string) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `http://localhost:3000/v1/chats/${chatId}/messages`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setMessages(response.data);
//       setSelectedChat(chatId);
//     } catch (error) {
//       toast.error("Failed to load messages.");
//     }
//   };

//   const sendMessage = async () => {
//     if (!newMessage || !selectedChat) return;
//     try {
//       const token = localStorage.getItem("token");
//       const userId = getUserIdFromToken()
//       const response = await axios.post(
//         "http://localhost:3000/v1/chats/send",
//         {
//           chatId: selectedChat,
//           senderId: userId, // Use the logged-in user's ID
//           message: newMessage,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setMessages((prevMessages) => [...prevMessages, response.data]);
//       setNewMessage("");
//     } catch (error) {
//       toast.error("Failed to send message.");
//     }
//   };

//   useEffect(() => {
//     fetchUserChats();
//   }, []);

//   return (
//     <div className="right-section w-full p-4 bg-gray-100 h-screen">
//       <h2 className="text-xl font-bold mb-4">Chats</h2>

//       <div className="chat-list overflow-y-auto h-56 bg-white p-2 rounded-lg shadow-md mb-4">
//         {chats.map((chat) => (
//           <div
//             key={chat._id}
//             className={`chat-item p-2 rounded-md cursor-pointer hover:bg-blue-200 transition duration-200 mb-2
//               ${selectedChat === chat._id ? "bg-blue-300" : "bg-blue-100"}`}
//             onClick={() => fetchMessages(chat._id)}
//           >
//             {chat.users.join(", ")}
//           </div>
//         ))}
//       </div>

//       {selectedChat && (
//         <div className="chat-messages flex flex-col bg-white p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-bold mb-4">Messages</h3>
//           <div className="messages-list flex-1 overflow-y-auto mb-4">
//             {messages.map((msg) => (
//               <div key={msg._id} className="message-item mb-2">
//                 <strong className="text-blue-700">{msg.sender}</strong>:{" "}
//                 {msg.message}
//               </div>
//             ))}
//           </div>

//           <div className="message-input flex items-center space-x-2">
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RightSection;

// --------------------------------------------------

// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { IoSearch } from "react-icons/io5";
// import axios from "axios";
// import io from "socket.io-client";
// import { getUserIdFromToken } from "./FeedPosts";

// // Initialize socket connection (adjust your socket server URL accordingly)
// const socket = io("http://localhost:3000/v1/");

// const RightSection = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [chatDialogOpen, setChatDialogOpen] = useState(false);

//   // Function to search users
//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/v1/users/search/username?name=${searchQuery}`
//       );
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error("Error searching users:", error);
//     }
//   };

//   // Function to open a chat with the selected user
//   const handleUserSelect = async (userId: any) => {
//     try {
//       // Create or get chat with selected user
//       const response = await axios.post(
//         "http://localhost:3000/v1/chat/create",
//         {
//           userId1: "yourUserId", // Replace with current logged-in user ID
//           userId2: userId,
//         }
//       );

//       setSelectedChat(response.data);
//       setChatDialogOpen(false);

//       // Fetch existing messages for the chat
//       fetchMessages(response.data._id);
//     } catch (error) {
//       console.error("Error creating chat:", error);
//     }
//   };

//   // Fetch messages for a chat
//   const fetchMessages = async (chatId: any) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/v1/chat/${chatId}/messages`
//       );
//       setMessages(response.data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   // Handle sending a message
//   const handleSendMessage = async () => {
//     const userId = getUserIdFromToken();
//     try {
//       const response = await axios.post("http://localhost:3000/v1/chat/send", {
//         chatId: selectedChat?.id,
//         senderId: userId, // Replace with current logged-in user ID
//         message: newMessage,
//       });

//       setMessages((prev) => [...prev, response.data]);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   // Real-time messaging via Socket.io
//   useEffect(() => {
//     if (selectedChat) {
//       socket.emit("joinChat", selectedChat._id);

//       socket.on("newMessage", (message) => {
//         setMessages((prev) => [...prev, message]);
//       });
//     }

//     return () => {
//       if (selectedChat) {
//         socket.emit("leaveChat", selectedChat._id);
//       }
//     };
//   }, [selectedChat]);

//   return (
//     <div className="w-full">
//       <h2 className="text-xl font-bold mb-4">Chats</h2>

//       {/* Search Button */}
//       <Button onClick={() => setChatDialogOpen(true)} className="mb-4">
//         <IoSearch className="mr-2" /> Search User
//       </Button>

//       {/* Chat Messages */}
//       {selectedChat ? (
//         <div className="chat-box">
//           <div className="messages">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`message ${
//                   msg?.sender === "yourUserId" ? "sent" : "received"
//                 }`}
//               >
//                 {msg?.message}
//               </div>
//             ))}
//           </div>
//           <div className="new-message">
//             <Input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Type a message"
//             />
//             <Button onClick={handleSendMessage}>Send</Button>
//           </div>
//         </div>
//       ) : (
//         <p>Select a user to start chatting.</p>
//       )}

//       {/* Search Dialog */}
//       <Dialog open={chatDialogOpen} onOpenChange={setChatDialogOpen}>
//         <DialogTrigger asChild />
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Search User</DialogTitle>
//           </DialogHeader>
//           <Input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search for users"
//             className="mb-2"
//           />
//           <Button onClick={handleSearch}>Search</Button>

//           {/* Display search results */}
//           <div className="mt-4">
//             {searchResults.map((user) => (
//               <div key={user._id} className="search-result-item">
//                 <Button onClick={() => handleUserSelect(user._id)}>
//                   {user.name}
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default RightSection;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { getUserIdFromToken } from "./FeedPosts";

// interface User {
//   _id: string;
//   name: string;
//   avatar?: string;
// }

// interface Message {
//   sender: string;
//   message: string;
//   createdAt: Date;
// }

// const RightSection = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [chatMessages, setChatMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [chatId, setChatId] = useState<string | null>(null);

//   // Search for users
// const handleSearch = async () => {
//   try {
//     const response = await axios.get(
//       `http://localhost:3000/v1/users/search/username?name=${searchQuery}`
//     );
//     setSearchResults(response.data); // Assuming the backend returns user profiles
//   } catch (error) {
//     console.error("Error searching users", error);
//   }
// };

//   // Open chat with selected user
//   const handleUserSelect = async (user: User) => {
//     try {
//       setSelectedUser(user);
//       setDialogOpen(false);
//       console.log("Get user id from token:", getUserIdFromToken());
//       // Create or fetch chat between the current user and the selected user
//       const chatResponse = await axios.post(
//         "http://localhost:3000/v1/chat/create",
//         {
//           userId1: getUserIdFromToken(), // Assuming current userId is stored
//           userId2: user._id,
//         }
//       );

//       setChatId(chatResponse.data._id); // Set chatId
//       fetchMessages(chatResponse.data._id);
//     } catch (error) {
//       console.error("Error starting chat", error);
//     }
//   };

//   // Fetch chat messages
//   const fetchMessages = async (chatId: string) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/v1/chat/${chatId}/messages`
//       );
//       setChatMessages(response.data);
//     } catch (error) {
//       console.error("Error fetching messages", error);
//     }
//   };

//   // Send a new message
//   const handleSendMessage = async () => {
//     if (!newMessage || !chatId) return;

//     try {
//       const response = await axios.post("http://localhost:3000/v1/chat/send", {
//         chatId,
//         senderId: getUserIdFromToken(), // Assuming current userId is stored
//         message: newMessage,
//       });

//       // Append new message to chat
//       setChatMessages((prevMessages) => [...prevMessages, response.data]);
//       setNewMessage(""); // Clear input field
//     } catch (error) {
//       console.error("Error sending message", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       {/* Heading */}
//       <h2 className="text-xl font-semibold mb-4">Chats</h2>

//       {/* Search Button */}
//       <Button onClick={() => setDialogOpen(true)}>Search</Button>

//       {/* Dialog for searching users */}
//       <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//         <DialogTrigger asChild />
//         <DialogContent>
//           <DialogTitle>Search Users</DialogTitle>
//           <Input
//             type="text"
//             placeholder="Search by name"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <Button onClick={handleSearch}>Search</Button>

//           {/* Display search results */}
//           {searchResults.length > 0 && (
//             <div className="mt-4">
//               {searchResults.map((user) => (
//                 <div
//                   key={user._id}
//                   className="flex items-center p-2 cursor-pointer"
//                   onClick={() => handleUserSelect(user)}
//                 >
//                   <img
//                     src={user.avatar || "/default-avatar.png"}
//                     alt={user.name}
//                     className="w-8 h-8 rounded-full mr-2"
//                   />
//                   <span>{user.name}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Chat area with selected user */}
//       {selectedUser && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-4">
//             Chat with {selectedUser.name}
//           </h3>
//           <div className="h-64 border p-2 overflow-y-auto">
//             {/* Display messages */}
//             {chatMessages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`mb-2 ${
//                   msg.sender === localStorage.getItem("userId")
//                     ? "text-right"
//                     : ""
//                 }`}
//               >
//                 <span className="block text-sm">
//                   {msg.sender === localStorage.getItem("userId")
//                     ? "You"
//                     : selectedUser.name}
//                   :
//                 </span>
//                 <p>{msg.message}</p>
//               </div>
//             ))}
//           </div>

//           {/* Input to send new message */}
//           <div className="mt-4">
//             <Input
//               type="text"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <Button onClick={handleSendMessage}>Send</Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RightSection;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { io } from "socket.io-client"; // Import socket.io for real-time
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { getUserIdFromToken } from "./FeedPosts";

// const RightSection = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<any[]>([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [socket, setSocket] = useState<any>(null);

//   useEffect(() => {
//     // Initialize WebSocket connection on component mount
//     const newSocket = io("http://localhost:3000");
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   const handleSearch = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `http://localhost:3000/v1/users/search/username?name=${searchQuery}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error("Error searching for users:", error);
//     }
//   };

//   const handleSelectUser = async (user: any) => {
//     setSelectedUser(user);
//     console.log("GetUserIDfromTOKEN()", getUserIdFromToken());
//     try {
//       // Create or fetch the chat between the two users
//       const response = await axios.post(
//         "http://localhost:3000/v1/chats/create",
//         {
//           userId1: getUserIdFromToken(), // The current user's ID
//           userId2: user._id, // The selected user's ID
//         }
//       );
//       const chatId = response.data._id;

//       // Fetch messages for this chat
//       const messagesResponse = await axios.get(
//         `http://localhost:3000/v1/chats/${chatId}/messages`
//       );
//       setMessages(messagesResponse.data);

//       // Close search dialog
//     } catch (error) {
//       console.error("Error selecting user:", error);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (newMessage.trim() === "") return;

//     try {
//       const response = await axios.post("http://localhost:3000/v1/chats/send", {
//         chatId: selectedUser.chatId, // Chat ID of the current chat
//         senderId: getUserIdFromToken(), // Current user (sender)
//         message: newMessage,
//       });

//       // Send the message through WebSocket for real-time updates
//       socket.emit("sendMessage", response.data);

//       setMessages((prevMessages) => [...prevMessages, response.data]);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   // Listen for new messages in real-time
//   useEffect(() => {
//     if (socket) {
//       socket.on("receiveMessage", (message: any) => {
//         setMessages((prevMessages) => [...prevMessages, message]);
//       });
//     }
//   }, [socket]);

//   return (
//     <div className="right-section">
//       <h2>Chats</h2>

//       {/* Search Button to open dialog */}
//       <Dialog>
//         <DialogTrigger>
//           <Button>Search Users</Button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Search for Users</DialogTitle>
//           </DialogHeader>
//           <Input
//             placeholder="Enter username..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <Button onClick={handleSearch}>Search</Button>

//           {/* Display search results */}
//           {searchResults.length > 0 && (
//             <ul>
//               {searchResults.map((user) => (
//                 <li key={user._id} onClick={() => handleSelectUser(user)}>
//                   {user.name}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Chat Area */}
//       {selectedUser && (
//         <div className="chat-box">
//           <h3>Chat with {selectedUser.name}</h3>
//           <div className="messages">
//             {messages.map((message) => (
//               <div
//                 key={message._id}
//                 className={`message ${
//                   message.sender === localStorage.getItem("userId")
//                     ? "sent"
//                     : "received"
//                 }`}
//               >
//                 {message.message}
//               </div>
//             ))}
//           </div>

//           {/* Message Input */}
//           <div className="message-input">
//             <Input
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <Button onClick={handleSendMessage}>Send</Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RightSection;

// -----------------------------_____________________________________
// import { useState } from "react";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { IoSearch } from "react-icons/io5";

// const RightSection = () => {
//   const [isSearchDialogOpen, setSearchDialogOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearchPerformed, setIsSearchPerformed] = useState(false); // To track if a search was performed
//   const [selectedUser, setSelectedUser] = useState<any>(null); // To store the selected user for chat

//   const handleSearch = async () => {
//     setIsSearchPerformed(true);

//     if (searchTerm.length > 1) {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/v1/users/search/username?name=${searchTerm}`
//         );
//         console.log(response.data); // Add this line to see the response
//         setSearchResults(response.data.users);
//       } catch (error) {
//         console.error("Error searching users", error);
//       }
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const handleUserClick = (user: any) => {
//     setSelectedUser(user); // Set the clicked user
//     setSearchDialogOpen(false); // Close the dialog
//   };

//   return (
//     <div className="p-3">
//       {/* Heading */}
//       <h2 className="text-2xl font-bold mb-4">Chats</h2>

//       {/* Search Button */}
//       <Dialog open={isSearchDialogOpen} onOpenChange={setSearchDialogOpen}>
//         <DialogTrigger asChild>
//           <Button className="bg-blue-500 text-white flex items-center gap-2">
//             <IoSearch />
//             Search Users
//           </Button>
//         </DialogTrigger>

//         <DialogContent className="bg-white">
//           <DialogHeader>
//             <DialogTitle>Search for Users</DialogTitle>
//             <DialogDescription>
//               Type the name to search for users.
//             </DialogDescription>
//           </DialogHeader>

//           {/* Search Input */}
//           <Input
//             type="text"
//             placeholder="Enter name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="mt-2"
//           />

//           {/* Search Button */}
//           <Button
//             onClick={handleSearch}
//             className="mt-2 bg-blue-500 text-white"
//           >
//             Search
//           </Button>

//           {/* Search Results */}
//           <>
//             {searchResults.length > 0 ? (
//               <ul className="mt-4">
//                 {searchResults.map((user: any) => (
//                   <li
//                     key={user._id}
//                     onClick={() => handleUserClick(user)} // Handle user click
//                     className="flex items-center gap-4 p-2 border-b cursor-pointer"
//                   >
//                     <img
//                       src={user.avatar || "/default-avatar.png"}
//                       alt="Avatar"
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                     <div>
//                       <p className="font-semibold">{user.name}</p>
//                       <p className="text-sm text-gray-500">
//                         {user.bio || "No bio available"}
//                       </p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="mt-4">No users found.</p>
//             )}
//           </>
//         </DialogContent>
//       </Dialog>

//       {/* Chatbox for Selected User */}
//       {selectedUser && (
//         <div className="mt-3 p-1 bg-gray-100 rounded shadow-lg">
//           <h3 className="flex gap-1 items-center font-bold mb-2">
//             <img
//               className="w-12 h-12 rounded-full object-cover"
//               src={selectedUser.avatar}
//               alt=""
//             />
//             <div className="">
//               <p className="text-md">{selectedUser.name}</p>
//               <p className="text-sm opacity-65">{selectedUser.bio}</p>
//             </div>
//           </h3>
//           <div className="bg-white p-[5px] rounded-lg border">
//             {/* Example chatbox form */}
//             <div className="h-[415px] bg-gray-100 mb-2 rounded-md p-0 overflow-y-auto">
//               {/* Messages would appear here */}
//             </div>
//             <div className="flex gap-1 items-center justify-center">
//               <Input
//                 type="text"
//                 placeholder="Type your message..."
//                 className=""
//               />
//               <Button className="bg-blue-500 text-white">Send</Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RightSection;

// import { useState } from "react";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { IoSearch } from "react-icons/io5";
// import { getUserIdFromToken } from "./FeedPosts";

// const RightSection = () => {
//   const [isSearchDialogOpen, setSearchDialogOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedUser, setSelectedUser] = useState<any>(null);
//   const [message, setMessage] = useState(""); // For storing the typed message
//   const [chatId, setChatId] = useState<string | null>(null); // Chat ID for the selected user
//   const [chatMessages, setChatMessages] = useState<any[]>([]); // To store chat messages

//   const handleSearch = async () => {
//     if (searchTerm.length > 1) {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/v1/users/search/username?name=${searchTerm}`
//         );
//         console.log(response.data);
//         setSearchResults(response.data.users);
//       } catch (error) {
//         console.error("Error searching users", error);
//       }
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const handleUserClick = async (user: any) => {
//     setSelectedUser(user); // Set the clicked user as the selected user
//     setSearchDialogOpen(false); // Close the search dialog

//     try {
//       const senderId = getUserIdFromToken(); // Get the logged-in user ID
//       const userId2 = user._id; // Get the selected user's ID
//       console.log("SENDER ID ", senderId, "userid2", user._id);
//       // const ids = {};
//       const token = localStorage.getItem("token");
//       // Call the createChat API to create a chat between the logged-in user and the selected user
//       const response = await axios.post(
//         "http://localhost:3000/v1/chats/create",
//         {
//           userId1: senderId,
//           userId2: userId2,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("USER CLICK PROFLE RESPONSE", response);
//       const newChat = response.data;
//       setChatId(newChat._id); // Set the new chat ID
//       setChatMessages([]); // Optionally, reset messages if needed (or fetch from the server)
//     } catch (error: any) {
//       if (error.response) {
//         console.error("API Error response:", error.response.data);
//       } else {
//         console.error("Network or other error", error);
//       }
//     }
//   };

//   const sendMessage = async () => {
//     if (!message || !chatId) return;

//     try {
//       const token = localStorage.getItem("token");

//       const senderId = getUserIdFromToken(); // Use your logic to get the senderId
//       const response = await axios.post(
//         "http://localhost:3000/v1/chats/send",
//         {
//           chatId,
//           senderId,
//           message,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("send message Response", response);
//       // Update chat messages with the new message
//       setChatMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: senderId, message, timestamp: new Date() },
//       ]);

//       // Clear the message input after sending
//       setMessage("");
//     } catch (error) {
//       console.error("Error sending message", error);
//     }
//   };

//   return (
//     <div className="p-3">
//       <h2 className="text-2xl font-bold mb-4">Chats</h2>
//       {/* Search Button */}
//       <Dialog open={isSearchDialogOpen} onOpenChange={setSearchDialogOpen}>
//         <DialogTrigger asChild>
//           <Button className="bg-blue-500 text-white flex items-center gap-2">
//             <IoSearch />
//             Search Users
//           </Button>
//         </DialogTrigger>

//         <DialogContent className="bg-white">
//           <DialogHeader>
//             <DialogTitle>Search for Users</DialogTitle>
//             <DialogDescription>
//               Type the name to search for users.
//             </DialogDescription>
//           </DialogHeader>

//           <Input
//             type="text"
//             placeholder="Enter name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="mt-2"
//           />

//           <Button
//             onClick={handleSearch}
//             className="mt-2 bg-blue-500 text-white"
//           >
//             Search
//           </Button>

//           {searchResults.length > 0 ? (
//             <ul className="mt-4">
//               {searchResults.map((user: any) => (
//                 <li
//                   key={user._id}
//                   onClick={() => handleUserClick(user)}
//                   className="flex items-center gap-4 p-2 border-b cursor-pointer"
//                 >
//                   <img
//                     src={user.avatar || "/default-avatar.png"}
//                     alt="Avatar"
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <div>
//                     <p className="font-semibold">{user.name}</p>
//                     <p className="text-sm text-gray-500">
//                       {user.bio || "No bio available"}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="mt-4">No users found.</p>
//           )}
//         </DialogContent>
//       </Dialog>
//       <hr className="my-2 border-blue-200" />

//       {/* Chatbox for Selected User */}
//       {selectedUser && (
//         <div className="mt-3 p-1 bg-gray-100 rounded shadow-lg">
//           <h3 className="flex gap-1 items-center font-bold mb-2">
//             <img
//               className="w-12 h-12 rounded-full object-cover"
//               src={selectedUser.avatar}
//               alt=""
//             />
//             <div className="">
//               <p className="text-sm">{selectedUser.name}</p>
//               <p className="text-xs opacity-65">{selectedUser.bio}</p>
//             </div>
//           </h3>
//           <div className="bg-white p-[5px] rounded-lg border">
//             <div className="h-[430px] bg-gray-100 mb-2 rounded-md p-0 overflow-y-auto">
//               {chatMessages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`p-2 ${
//                     msg.sender === "your-logged-in-user-id" ? "text-right" : ""
//                   }`}
//                 >
//                   <div className="flex flex-col items-start justify-center">
//                     <p className="border-2 inline-block bg-gray-200 p-1 rounded-xl">
//                       {msg.message}
//                     </p>
//                     <small className="text-xs">
//                       {new Date(msg.timestamp).toLocaleTimeString()}
//                     </small>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="flex gap-1 items-center justify-center">
//               <Input
//                 type="text"
//                 placeholder="Type your message..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//               />
//               <Button onClick={sendMessage} className="bg-blue-500 text-white">
//                 Send
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RightSection;
// ________________________________________________________________________
// import { useState } from "react";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { IoSearch } from "react-icons/io5";
// import { getUserIdFromToken } from "./FeedPosts";

// const RightSection = () => {
//   const [isSearchDialogOpen, setSearchDialogOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedUser, setSelectedUser] = useState<any>(null);
//   const [message, setMessage] = useState(""); // For storing the typed message
//   const [chatId, setChatId] = useState<string | null>(null); // Chat ID for the selected user
//   const [chatMessages, setChatMessages] = useState<any[]>([]); // To store chat messages
//   const [existingChat, setExistingChat] = useState<any>(null); // To store existing chat if found

//   const handleSearch = async () => {
//     if (searchTerm.length > 1) {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/v1/users/search/username?name=${searchTerm}`
//         );
//         console.log(response.data);
//         setSearchResults(response.data.users);
//       } catch (error) {
//         console.error("Error searching users", error);
//       }
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const handleUserClick = async (user: any) => {
//     setSelectedUser(user); // Set the clicked user as the selected user
//     setSearchDialogOpen(false); // Close the search dialog

//     try {
//       const senderId = getUserIdFromToken(); // Get the logged-in user ID
//       const userId2 = user._id; // Get the selected user's ID

//       const token = localStorage.getItem("token");

//       // Check if an existing chat already exists between the users
//       const checkChatResponse = await axios.get(
//         `http://localhost:3000/v1/chats/check?userId1=${senderId}&userId2=${userId2}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (checkChatResponse.data.chatExists) {
//         setChatId(checkChatResponse.data.chat._id);
//         setExistingChat(checkChatResponse.data.chat); // Set the existing chat
//         setChatMessages(checkChatResponse.data.chat.messages); // Load the existing chat messages
//       } else {
//         // If no chat exists, create a new chat
//         const createChatResponse = await axios.post(
//           "http://localhost:3000/v1/chats/create",
//           {
//             userId1: senderId,
//             userId2: userId2,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const newChat = createChatResponse.data;
//         setChatId(newChat._id); // Set the new chat ID
//         setChatMessages([]); // Optionally, reset messages if needed (or fetch from the server)
//         setExistingChat(null); // No existing chat, so reset this state
//       }
//     } catch (error: any) {
//       if (error.response) {
//         console.error("API Error response:", error.response.data);
//       } else {
//         console.error("Network or other error", error);
//       }
//     }
//   };

//   const sendMessage = async () => {
//     if (!message || !chatId) return;

//     try {
//       const senderId = getUserIdFromToken(); // Use your logic to get the senderId
//       const response = await axios.post("http://localhost:3000/v1/chats/send", {
//         chatId,
//         senderId,
//         message,
//       });

//       console.log("send message Response", response);
//       // Update chat messages with the new message
//       setChatMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: senderId, message, timestamp: new Date() },
//       ]);

//       // Clear the message input after sending
//       setMessage("");
//     } catch (error) {
//       console.error("Error sending message", error);
//     }
//   };

//   return (
//     <div className="p-3">
//       <h2 className="text-2xl font-bold mb-4">Chats</h2>

//       {/* Display Existing Chat if Exists */}
//       {existingChat && (
//         <div className="mb-4 p-2 border-b">
//           <h3 className="flex gap-1 items-center font-bold mb-2">
//             <img
//               className="w-12 h-12 rounded-full object-cover"
//               src={existingChat.user2.avatar || "/default-avatar.png"}
//               alt="Avatar"
//             />
//             <div className="">
//               <p className="text-sm">{existingChat.user2.name}</p>
//               <p className="text-xs opacity-65">{existingChat.user2.bio}</p>
//             </div>
//           </h3>
//           <div className="bg-white p-[5px] rounded-lg border">
//             <div className="h-[430px] bg-gray-100 mb-2 rounded-md p-0 overflow-y-auto">
//               {existingChat.messages.map((msg: any, index: number) => (
//                 <div
//                   key={index}
//                   className={`p-2 ${
//                     msg.sender === "your-logged-in-user-id" ? "text-right" : ""
//                   }`}
//                 >
//                   <p>{msg.message}</p>
//                   <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Search Button */}
//       <Dialog open={isSearchDialogOpen} onOpenChange={setSearchDialogOpen}>
//         <DialogTrigger asChild>
//           <Button className="bg-blue-500 text-white flex items-center gap-2">
//             <IoSearch />
//             Search Users
//           </Button>
//         </DialogTrigger>

//         <DialogContent className="bg-white">
//           <DialogHeader>
//             <DialogTitle>Search for Users</DialogTitle>
//             <DialogDescription>
//               Type the name to search for users.
//             </DialogDescription>
//           </DialogHeader>

//           <Input
//             type="text"
//             placeholder="Enter name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="mt-2"
//           />

//           <Button
//             onClick={handleSearch}
//             className="mt-2 bg-blue-500 text-white"
//           >
//             Search
//           </Button>

//           {searchResults.length > 0 ? (
//             <ul className="mt-4">
//               {searchResults.map((user: any) => (
//                 <li
//                   key={user._id}
//                   onClick={() => handleUserClick(user)}
//                   className="flex items-center gap-4 p-2 border-b cursor-pointer"
//                 >
//                   <img
//                     src={user.avatar || "/default-avatar.png"}
//                     alt="Avatar"
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <div>
//                     <p className="font-semibold">{user.name}</p>
//                     <p className="text-sm text-gray-500">
//                       {user.bio || "No bio available"}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="mt-4">No users found.</p>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Chatbox for Selected User */}
//       {selectedUser && !existingChat && (
//         <div className="mt-3 p-1 bg-gray-100 rounded shadow-lg">
//           <h3 className="flex gap-1 items-center font-bold mb-2">
//             <img
//               className="w-12 h-12 rounded-full object-cover"
//               src={selectedUser.avatar || "/default-avatar.png"}
//               alt=""
//             />
//             <div className="">
//               <p className="text-sm">{selectedUser.name}</p>
//               <p className="text-xs opacity-65">{selectedUser.bio}</p>
//             </div>
//           </h3>
//           <div className="bg-white p-[5px] rounded-lg border">
//             <div className="h-[430px] bg-gray-100 mb-2 rounded-md p-0 overflow-y-auto">
//               {chatMessages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`p-2 ${
//                     msg.sender === "your-logged-in-user-id" ? "text-right" : ""
//                   }`}
//                 >
//                   <p>{msg.message}</p>
//                   <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="mt-3">
//             <Input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Type a message..."
//               className="mb-3"
//             />
//             <Button onClick={sendMessage} className="bg-blue-500 text-white">
//               Send
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RightSection;

// ___________________________________________________
// ______________________________________________________
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { IoSearch } from "react-icons/io5";
// import { getUserIdFromToken } from "./FeedPosts";
// import io from "socket.io-client";

// const RightSection = () => {
//   const [isSearchDialogOpen, setSearchDialogOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedUser, setSelectedUser] = useState<any>(null);
//   const [message, setMessage] = useState(""); // For storing the typed message
//   const [chatId, setChatId] = useState<string | null>(null); // Chat ID for the selected user
//   const [chatMessages, setChatMessages] = useState<any[]>([]); // To store chat messages
//   const [existingChat, setExistingChat] = useState<any>(null); // To store existing chat if found

//   let socket = io("http://localhost:3000");

//   // Set up socket connection in useEffect and listen for messages
//   useEffect(() => {
//     // Establish connection only on component mount
//     const socket = io({
//       transports: ["websocket"],
//       reconnectionAttempts: 5, // Try 5 times before failing
//       reconnectionDelay: 1000, // Wait 1 second before attempting to reconnect
//     });
    
//     // Listen for new messages from the server
//     socket.on("receiveMessage", (newMessage) => {
//       setChatMessages((prevMessages) => [...prevMessages, newMessage]);
//     });

//     // Cleanup the socket connection on unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handleSearch = async () => {
//     if (searchTerm.length > 1) {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/v1/users/search/username?name=${searchTerm}`
//         );
//         setSearchResults(response.data.users);
//       } catch (error) {
//         console.error("Error searching users", error);
//       }
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const handleUserClick = async (user: any) => {
//     setSelectedUser(user); // Set the clicked user as the selected user
//     setSearchDialogOpen(false); // Close the search dialog

//     try {
//       const senderId = getUserIdFromToken(); // Get the logged-in user ID
//       const userId2 = user._id; // Get the selected user's ID

//       const token = localStorage.getItem("token");

//       // Check if an existing chat already exists between the users
//       const checkChatResponse = await axios.get(
//         `http://localhost:3000/v1/chats/check?userId1=${senderId}&userId2=${userId2}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (checkChatResponse.data.chatExists) {
//         setChatId(checkChatResponse.data.chat._id);
//         setExistingChat(checkChatResponse.data.chat); // Set the existing chat
//         setChatMessages(checkChatResponse.data.chat.messages); // Load the existing chat messages
//       } else {
//         // If no chat exists, create a new chat
//         const createChatResponse = await axios.post(
//           "http://localhost:3000/v1/chats/create",
//           {
//             userId1: senderId,
//             userId2: userId2,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const newChat = createChatResponse.data;
//         setChatId(newChat._id); // Set the new chat ID
//         setChatMessages([]); // Optionally, reset messages if needed (or fetch from the server)
//         setExistingChat(null); // No existing chat, so reset this state
//       }
//     } catch (error: any) {
//       console.error("Error in user click", error);
//     }
//   };

//   const sendMessage = async () => {
//     if (!message || !chatId) return;

//     try {
//       const senderId = getUserIdFromToken(); // Use your logic to get the senderId
//       const response = await axios.post("http://localhost:3000/v1/chats/send", {
//         chatId,
//         senderId,
//         message,
//       });

//       // Emit the message through the socket for real-time updates
//       socket.emit("sendMessage", {
//         chatId,
//         senderId,
//         message,
//         timestamp: new Date(),
//       });

//       // Update chat messages with the new message
//       setChatMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: senderId, message, timestamp: new Date() },
//       ]);

//       // Clear the message input after sending
//       setMessage("");
//     } catch (error) {
//       console.error("Error sending message", error);
//     }
//   };

//   return (
//     <div className="p-3">
//       <h2 className="text-2xl font-bold mb-4">Chats</h2>

//       {/* Display Existing Chat if Exists */}
//       {existingChat && (
//         <div className="mb-4 p-2 border-b">
//           <h3 className="flex gap-1 items-center font-bold mb-2">
//             <img
//               className="w-12 h-12 rounded-full object-cover"
//               src={existingChat.user2.avatar || "/default-avatar.png"}
//               alt="Avatar"
//             />
//             <div className="">
//               <p className="text-sm">{existingChat.user2.name}</p>
//               <p className="text-xs opacity-65">{existingChat.user2.bio}</p>
//             </div>
//           </h3>
//           <div className="bg-white p-[5px] rounded-lg border">
//             <div className="h-[430px] bg-gray-100 mb-2 rounded-md p-0 overflow-y-auto">
//               {existingChat.messages.map((msg: any, index: number) => (
//                 <div
//                   key={index}
//                   className={`p-2 ${
//                     msg.sender === "your-logged-in-user-id" ? "text-right" : ""
//                   }`}
//                 >
//                   <p>{msg.message}</p>
//                   <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Search Button */}
//       <Dialog open={isSearchDialogOpen} onOpenChange={setSearchDialogOpen}>
//         <DialogTrigger asChild>
//           <Button className="bg-blue-500 text-white flex items-center gap-2">
//             <IoSearch />
//             Search Users
//           </Button>
//         </DialogTrigger>

//         <DialogContent className="bg-white">
//           <DialogHeader>
//             <DialogTitle>Search for Users</DialogTitle>
//             <DialogDescription>
//               Type the name to search for users.
//             </DialogDescription>
//           </DialogHeader>

//           <Input
//             type="text"
//             placeholder="Enter name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="mt-2"
//           />

//           <Button
//             onClick={handleSearch}
//             className="mt-2 bg-blue-500 text-white"
//           >
//             Search
//           </Button>

//           {searchResults.length > 0 ? (
//             <ul className="mt-4">
//               {searchResults.map((user: any) => (
//                 <li
//                   key={user._id}
//                   onClick={() => handleUserClick(user)}
//                   className="flex items-center gap-4 p-2 border-b cursor-pointer"
//                 >
//                   <img
//                     src={user.avatar || "/default-avatar.png"}
//                     alt="Avatar"
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <div>
//                     <p className="font-semibold">{user.name}</p>
//                     <p className="text-sm text-gray-500">
//                       {user.bio || "No bio available"}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="mt-4">No users found.</p>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Chatbox for Selected User */}
//       {selectedUser && !existingChat && (
//         <div className="mt-3 p-1 bg-gray-100 rounded shadow-lg">
//           <h3 className="flex gap-1 items-center font-bold mb-2">
//             <img
//               className="w-12 h-12 rounded-full object-cover"
//               src={selectedUser.avatar || "/default-avatar.png"}
//               alt="Avatar"
//             />
//             <div>
//               <p className="text-sm">{selectedUser.name}</p>
//               <p className="text-xs opacity-65">{selectedUser.bio}</p>
//             </div>
//           </h3>
//           <div className="bg-white p-[5px] rounded-lg border">
//             <div className="h-[430px] bg-gray-100 mb-2 rounded-md p-0 overflow-y-auto">
//               {chatMessages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`p-2 ${
//                     msg.sender === "your-logged-in-user-id" ? "text-right" : ""
//                   }`}
//                 >
//                   <p>{msg.message}</p>
//                   <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="flex items-center">
//             <Input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               className="flex-grow"
//             />
//             <Button onClick={sendMessage} className="ml-2">
//               Send
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RightSection;
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
  const [searchResult, setSearchResult] = useState<User[]>([]); // Correctly typed as an array of User objects
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]); // Correctly typed as an array of User objects

  // Mock authenticated user (replace with real user auth logic)
  const currentUserId = "current-user-id"; // You can replace this with real user data from your auth context or state

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/users/search/username?name=${searchTerm}`);
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

  const handleUserClick = async (user: User) => {
    try {
      const userId = getUserIdFromToken()
      // Make a POST request to create the chat with the selected user
      const response = await axios.post("http://localhost:3000/v1/chats/create-chat", {
        users: [user._id, userId ], // Include the selected user in the chat
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}` // Assuming you store auth token in localStorage
        }
      });

      if (response.status === 201) {
        toast.success(`Chat started with ${user.name}`);
        setSelectedUsers((prevUsers) => [...prevUsers, user]); // Append the new user to the selectedUsers array
        setSearchDialogOpen(false); // Close the search dialog
      }
    } catch (error:any) {
      toast.error(`Failed to start the chat. Please try again. ${error.message}`);
    } 
  };

  return (
    <div className="p-4">
      {/* Chats Heading */}
      <h2 className="text-xl font-bold mb-4">Chats</h2>

      {/* Search Button */}
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
          <div className="grid gap-4">
            {searchResult && searchResult.length > 0 ? (
              searchResult.map((user: User) => (
                <div
                  key={user._id}
                  className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer"
                  onClick={() => handleUserClick(user)} // Click handler to select user and trigger chat creation
                >
                  {/* Profile Image */}
                  <div className="w-12 h-12 mr-4">
                    <img
                      src={user.avatar || "/default-avatar.png"}
                      alt="User Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  {/* User Info */}
                  <div>
                    <h1 className="text-lg font-semibold">{user.name}</h1>
                    <p className="text-gray-600 text-xs"> {user.bio || "Not available"}</p>
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

