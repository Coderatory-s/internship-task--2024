// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// interface ChatBoxProps {
//   messages: any[];
//   newMessage: string;
//   setNewMessage: (message: string) => void;
//   sendMessage: () => void;
//   selectedUser: any;
// }

// export const ChatBox = ({
//   messages,
//   newMessage,
//   setNewMessage,
//   sendMessage,
//   selectedUser,
// }: ChatBoxProps) => {
//   return (
//     <div className="space-y-1 p-2 h-[402px]  bg-white rounded-lg shadow-md">
//       <div className="flex items-center gap-2 p-4 border-b rounded-lg bg-gray-200">
//         <span className="flex items-center bg-black justify-center h-10 w-10 rounded-full">
//           {selectedUser?.avatar ? (
//             <img
//               className="w-full h-full object-cover rounded-full"
//               src={selectedUser?.avatar}
//               alt="User Avatar"
//             />
//           ) : (
//             <span className="text-2xl bg-black">❔</span>
//           )}
//         </span>
//         <div className="">
//           <div className="text-sm font-semibold">{selectedUser?.name}</div>
//           <div className="text-sm text-gray-500">{selectedUser?.bio}</div>
//         </div>
//       </div>
//       <div className="border rounded-lg overflow-auto p-3 space-y-3 h-[230px]">
//         {messages?.map((message, index) => (
//           <div
//             key={index}
//             className={`text-sm ${
//               message?.sender === "me" ? "text-right" : "text-left"
//             }`}
//           >
//             <div
//               className={`inline-block p-2 rounded-lg ${
//                 message?.sender === "me"
//                   ? "bg-blue-500 text-black"
//                   : "bg-gray-200"
//               }`}
//             >
//               {message?.text || "No message text"}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* New Message Input */}
//       <div className=" flex mt-10 items-center justify-center space-x-2">
//         <Input
//           className="flex-1"
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <Button onClick={sendMessage} className="bg-blue-500 text-white">
//           Send
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;

import { useState, useEffect } from "react";
import axios from "axios";

// Define the type for messages
interface Message {
  message: string;
  sender: string;
}

const ChatBox = (props: any) => {
  // Set the type of messages to an array of Message objects
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch the chat messages when a chat is selected
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/v1/chats/${props.selectedChatId}/messages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };

    if (props.selectedChatId) {
      fetchMessages();
    }
  }, [props.selectedChatId]);

  const handleSendMessage = async () => {
    if (!newMessage) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/v1/chats/send",
        {
          recipientId: props.selectedChatId,
          message: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages([...messages, { message: newMessage, sender: "You" }]);
      setNewMessage(""); // Clear input field
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "You" ? "sent" : "received"}`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
