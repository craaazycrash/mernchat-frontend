import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const RightSidebar = ({ showRightSidebar }) => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  if (!showRightSidebar || !selectedUser) return null;

  const isOnline = onlineUsers?.some((u) =>
    typeof u === "object"
      ? u.userId === selectedUser._id
      : u === selectedUser._id.toString(),
  );

  return (
    <div
      className="w-full h-full relative overflow-y-auto flex flex-col max-md:hidden"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "rgba(8,18,10,0.75)",
        borderLeft: "1px solid rgba(63,191,91,0.1)",
        backdropFilter: "blur(24px)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .rs-scroll::-webkit-scrollbar { width: 3px; }
        .rs-scroll::-webkit-scrollbar-track { background: transparent; }
        .rs-scroll::-webkit-scrollbar-thumb { background: rgba(63,191,91,0.15); border-radius: 4px; }
        @keyframes rs-fadeIn {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .rs-root { animation: rs-fadeIn 0.25s ease both; }
        .media-thumb { transition: transform 0.15s ease, border-color 0.15s ease; }
        .media-thumb:hover { transform: scale(1.04); border-color: rgba(63,191,91,0.45) !important; }
      `}</style>

      <div className="rs-root rs-scroll flex flex-col flex-1 overflow-y-auto">
        {/* Profile section */}
        <div className="flex flex-col items-center pt-10 pb-6 px-5">
          {/* Avatar */}
          <div className="relative mb-4">
            <div
              className="w-20 h-20 rounded-full overflow-hidden"
              style={{
                border: "2px solid rgba(63,191,91,0.35)",
                boxShadow: "0 0 20px rgba(63,191,91,0.15)",
              }}
            >
              <img
                src={selectedUser?.profilePic || assets.avatar_icon}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            {isOnline && (
              <span
                className="absolute bottom-1 right-1 w-3 h-3 rounded-full"
                style={{
                  background: "#3FBF5B",
                  border: "2px solid #07100a",
                  boxShadow: "0 0 7px rgba(63,191,91,0.7)",
                }}
              />
            )}
          </div>

          {/* Name */}
          <h2
            className="text-lg font-extrabold tracking-tight text-center"
            style={{ fontFamily: "'Syne', sans-serif", color: "#d0f0d8" }}
          >
            {selectedUser.fullName}
          </h2>

          {/* Status pill */}
          <span
            className="mt-1.5 text-xs px-3 py-1 rounded-full font-medium"
            style={{
              background: isOnline
                ? "rgba(63,191,91,0.12)"
                : "rgba(255,255,255,0.04)",
              border: `1px solid ${isOnline ? "rgba(63,191,91,0.25)" : "rgba(255,255,255,0.08)"}`,
              color: isOnline ? "#3FBF5B" : "rgba(90,150,100,0.45)",
            }}
          >
            {isOnline ? "Online" : "Offline"}
          </span>

          {/* Bio */}
          {selectedUser.bio && (
            <p
              className="text-xs text-center mt-3 leading-relaxed max-w-[200px]"
              style={{ color: "rgba(90,170,110,0.5)" }}
            >
              {selectedUser.bio}
            </p>
          )}
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(63,191,91,0.1)",
            margin: "0 16px",
          }}
        />

        {/* Media section */}
        <div className="px-5 py-5 flex-1">
          <div className="flex items-center gap-2 mb-3">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{
                color: "rgba(63,191,91,0.5)",
                fontFamily: "'Syne', sans-serif",
              }}
            >
              Media
            </p>
            {msgImages.length > 0 && (
              <span
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(63,191,91,0.1)",
                  border: "1px solid rgba(63,191,91,0.2)",
                  color: "rgba(63,191,91,0.65)",
                }}
              >
                {msgImages.length}
              </span>
            )}
          </div>

          {msgImages.length === 0 ? (
            <div
              className="rounded-[14px] py-8 text-center"
              style={{
                background: "rgba(63,191,91,0.03)",
                border: "1px dashed rgba(63,191,91,0.12)",
              }}
            >
              <p className="text-xs" style={{ color: "rgba(90,150,100,0.3)" }}>
                No media shared yet
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5 max-h-[220px] overflow-y-auto">
              {msgImages.map((url, index) => (
                <div
                  key={index}
                  onClick={() => window.open(url)}
                  className="media-thumb cursor-pointer rounded-[12px] overflow-hidden aspect-square"
                  style={{ border: "1px solid rgba(63,191,91,0.15)" }}
                >
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Logout */}
        <div className="px-5 pb-6">
          <button
            onClick={() => logout()}
            className="w-full py-3 rounded-[14px] text-sm font-semibold transition-all"
            style={{
              fontFamily: "'Syne', sans-serif",
              background:
                "linear-gradient(135deg, rgba(63,191,91,0.15), rgba(29,143,60,0.1))",
              border: "1px solid rgba(63,191,91,0.25)",
              color: "#3FBF5B",
              letterSpacing: "0.04em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(63,191,91,0.25), rgba(29,143,60,0.18))";
              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(63,191,91,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(63,191,91,0.15), rgba(29,143,60,0.1))";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
