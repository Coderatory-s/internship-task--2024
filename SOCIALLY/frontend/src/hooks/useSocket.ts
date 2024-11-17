import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection when component mounts
    const newSocket = io("http://localhost:3000", {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    // Clean up socket connection on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Function to send message
  const sendMessage = (chatId: string, message: string) => {
    if (socket) {
      socket.emit("send-message", chatId, message);
    }
  };

  // Listen for incoming messages and update the component state
  const listenForMessages = (callback: (data: any) => void) => {
    if (socket) {
      socket.on("receive-message", callback);
    }

    return () => {
      if (socket) {
        socket.off("receive-message", callback);
      }
    };
  };

  return { socket, sendMessage, listenForMessages };
};

export default useSocket;
