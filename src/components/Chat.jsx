import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        photoUrl: senderId?.photoUrl,
        text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, photoUrl, text }) => {
      setMessages((messages) => [...messages, { firstName, photoUrl, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      photoUrl: user.photoUrl,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-900 border border-gray-700 rounded-lg m-5 h-[80vh] flex flex-col shadow-lg">
      <div className="bg-gray-800 text-white p-4 text-xl font-semibold rounded-t-lg">
        Chat
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-700">
        {messages.map((msg, index) => {
          const isMine = user.firstName === msg.firstName;
          return (
            <div
              key={index}
              className={`flex items-end ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >
              {!isMine && msg.photoUrl && (
                <img
                  src={msg.photoUrl}
                  alt="avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl text-white transition-all duration-200 ${
                  isMine
                    ? "bg-green-600 rounded-br-none"
                    : "bg-gray-700 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
              {isMine && msg.photoUrl && (
                <img
                  src={msg.photoUrl}
                  alt="avatar"
                  className="w-8 h-8 rounded-full ml-2"
                />
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-700 flex items-center gap-2 bg-gray-800 rounded-b-lg">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newMessage.trim()) {
              sendMessage();
            }
          }}
          className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none"
          placeholder="Type a message"
        />

        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
