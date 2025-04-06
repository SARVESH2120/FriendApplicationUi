import { useEffect, useState } from "react";
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

  const fetchChatMessages = async () => {
    const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
      withCredentials: true,
    });
    const chatMessages = chat?.data?.messages.map((msg) => ({
      firstName: msg.senderId?.firstName,
      lastName: msg.senderId?.lastName,
      text: msg.text,
    }));
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((prev) => [...prev, { firstName, lastName, text }]);
    });

    return () => socket.disconnect();
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto m-5 h-[70vh] flex flex-col bg-gradient-to-r from-gray-900 to-black text-white rounded-lg border border-white/10 shadow-lg">
      {/* Header */}
      <header className="p-5 bg-gradient-to-r from-gray-900 to-black text-white font-bold text-center text-2xl border-b border-white/10">
        Chat
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-5 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat ${user.firstName === msg.firstName ? 'chat-end' : 'chat-start'}`}
          >
            <div className="chat-header text-sm text-white/80">
              <span className="text-amber-400">
                {msg.firstName} {msg.lastName}
              </span>
              <time className="text-xs text-white/50 ml-2">2h ago</time>
            </div>
            <div
              className={`chat-bubble ${
                user.firstName === msg.firstName
                  ? 'bg-amber-500 text-black'
                  : 'bg-gray-800 text-white'
              }`}
            >
              {msg.text}
            </div>
            <div className="chat-footer text-xs text-white/50">Seen</div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-5 border-t border-white/10 bg-gray-900 flex items-center gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          className="input input-bordered input-info w-full bg-gray-800 text-white placeholder-white/50"
        />
        <button onClick={sendMessage} className="btn btn-warning">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;