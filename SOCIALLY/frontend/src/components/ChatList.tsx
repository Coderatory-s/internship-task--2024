import { useState, useEffect } from "react";
import axios from "axios";

const ChatList = (props: any) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Fetch the list of chats for the current user
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/v1/chat", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chats", error);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="chat-list">
      {chats.map((chat: any) => (
        <div
          key={chat._id}
          className="chat-item"
          onClick={() => props.onSelectChat(chat._id)}
        >
          <h4>{chat.participantName}</h4>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
