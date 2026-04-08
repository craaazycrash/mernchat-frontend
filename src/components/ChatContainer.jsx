import React, { useContext, useEffect, useRef, useState } from "react";
import assets from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ChatContainer = ({ setShowRightSidebar }) => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  const scrollEnd = useRef();
  const [input, setInput] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) getMessages(selectedUser._id);
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="h-full overflow-scroll relative"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .chat-scrollbar::-webkit-scrollbar { width: 4px; }
        .chat-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .chat-scrollbar::-webkit-scrollbar-thumb { background: rgba(63,191,91,0.2); border-radius: 4px; }
        .chat-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(63,191,91,0.4); }
        @keyframes msgSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .msg-appear { animation: msgSlideIn 0.22s ease both; }
        .send-btn-hover:hover { transform: scale(1.08); }
        .send-btn-hover { transition: transform 0.15s ease; }
      `}</style>

      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{
          background: "rgba(8,18,10,0.85)",
          borderBottom: "1px solid rgba(63,191,91,0.15)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="relative">
          <img
            src={selectedUser.profilePic || assets.avatar_icon}
            alt=""
            className="w-9 h-9 rounded-full object-cover"
            style={{ border: "1.5px solid rgba(63,191,91,0.35)" }}
          />
          {onlineUsers?.includes(selectedUser._id.toString()) && (
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full"
              style={{
                background: "#3FBF5B",
                border: "2px solid #07100a",
                boxShadow: "0 0 6px rgba(63,191,91,0.7)",
              }}
            />
          )}
        </div>

        <div className="flex-1">
          <p
            className="text-sm font-semibold leading-tight"
            style={{ fontFamily: "'Syne', sans-serif", color: "#d0f0d8" }}
          >
            {selectedUser.fullName}
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ color: "rgba(63,191,91,0.5)" }}
          >
            {onlineUsers?.includes(selectedUser._id.toString())
              ? "Online"
              : "Offline"}
          </p>
        </div>

        <button
          onClick={() => setSelectedUser(null)}
          className="md:hidden p-1.5 rounded-full transition-all"
          style={{
            background: "rgba(63,191,91,0.08)",
            border: "1px solid rgba(63,191,91,0.15)",
          }}
        >
          <img src={assets.arrow_icon} alt="" className="w-4" />
        </button>

        <button
          onClick={() => setShowRightSidebar((prev) => !prev)}
          className="max-md:hidden p-1.5 rounded-full transition-all"
          style={{
            background: "rgba(63,191,91,0.08)",
            border: "1px solid rgba(63,191,91,0.15)",
          }}
        >
          <img src={assets.help_icon} alt="" className="w-4" />
        </button>
      </div>

      {/* Chat area */}
      <div
        className="chat-scrollbar flex flex-col overflow-y-scroll p-4 pb-6 gap-2"
        style={{ height: "calc(100% - 124px)", background: "transparent" }}
      >
        {messages.map((msg, index) => {
          const isMine = msg.senderId === authUser._id;
          return (
            <div
              key={index}
              className={`msg-appear flex items-end gap-2 ${isMine ? "flex-row-reverse justify-start" : "flex-row justify-start"}`}
            >
              {/* Avatar + time */}
              <div className="flex flex-col items-center gap-1 mb-6 flex-shrink-0">
                <img
                  src={
                    isMine
                      ? authUser?.profilePic || assets.avatar_icon
                      : selectedUser?.profilePic || assets.avatar_icon
                  }
                  alt=""
                  className="w-6 h-6 rounded-full object-cover"
                  style={{ border: "1px solid rgba(63,191,91,0.25)" }}
                />
                <p
                  className="text-[10px] whitespace-nowrap"
                  style={{ color: "rgba(90,170,110,0.4)" }}
                >
                  {formatMessageTime(msg.createdAt)}
                </p>
              </div>

              {/* Message bubble */}
              {msg.image ? (
                <img
                  src={msg.image}
                  alt=""
                  className="max-w-[220px] rounded-2xl mb-6 object-cover"
                  style={{ border: "1px solid rgba(63,191,91,0.2)" }}
                />
              ) : (
                <div
                  className="px-4 py-2.5 max-w-[220px] md:max-w-xs text-sm font-light break-words mb-6 leading-relaxed"
                  style={{
                    background: isMine
                      ? "linear-gradient(135deg, rgba(63,191,91,0.22), rgba(40,168,71,0.15))"
                      : "rgba(255,255,255,0.05)",
                    border: isMine
                      ? "1px solid rgba(63,191,91,0.28)"
                      : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: isMine
                      ? "18px 18px 18px 4px"
                      : "18px 18px 4px 18px",
                    color: isMine ? "#d0f0d8" : "#b8d4c0",
                  }}
                >
                  {msg.text}
                </div>
              )}
            </div>
          );
        })}
        <div ref={scrollEnd} />
      </div>

      {/* Input bar */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center gap-3 px-4 py-3"
        style={{
          background: "rgba(8,18,10,0.9)",
          borderTop: "1px solid rgba(63,191,91,0.12)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div
          className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full"
          style={{
            background: "rgba(63,191,91,0.05)",
            border: "1px solid rgba(63,191,91,0.18)",
          }}
        >
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage(e)}
            type="text"
            placeholder="Send a message…"
            className="flex-1 bg-transparent border-none outline-none text-sm"
            style={{
              color: "#c8f0d2",
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            hidden
          />
          <label
            htmlFor="image"
            className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
          >
            <img src={assets.gallery_icon} alt="" className="w-7" />
          </label>
        </div>

        <button
          onClick={handleSendMessage}
          className="send-btn-hover w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #3FBF5B, #1d8f3c)",
            boxShadow: "0 4px 16px rgba(63,191,91,0.3)",
            border: "none",
          }}
        >
          <img src={assets.send_button} alt="" className="w-5" />
        </button>
      </div>
    </div>
  ) : (
    <div
      className="flex flex-col items-center justify-center gap-3 max-md:hidden h-full"
      style={{ background: "rgba(8,18,10,0.5)" }}
    >
      <img src={assets.logo_big} className="max-w-40 opacity-60" alt="" />
      <p
        className="text-lg font-bold tracking-tight mt-2"
        style={{ fontFamily: "'Syne', sans-serif", color: "#d0f0d8" }}
      >
        Chat anytime, anywhere
      </p>
      <p className="text-sm" style={{ color: "rgba(90,170,110,0.45)" }}>
        Select a conversation to begin
      </p>
    </div>
  );
};

export default ChatContainer;
