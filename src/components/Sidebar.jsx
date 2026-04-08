import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase()),
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  useEffect(() => {
    const handleClickOutside = () => setShowMenu(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      className={`h-full flex flex-col overflow-hidden ${selectedUser ? "max-md:hidden" : ""}`}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "rgba(8,18,10,0.75)",
        borderRight: "1px solid rgba(63,191,91,0.1)",
        backdropFilter: "blur(24px)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .sidebar-scroll::-webkit-scrollbar { width: 3px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: rgba(63,191,91,0.15); border-radius: 4px; }
        .user-row { transition: background 0.15s ease; }
        .user-row:hover { background: rgba(63,191,91,0.06) !important; }
      `}</style>

      {/* Top bar */}
      <div
        className="px-5 pt-5 pb-4"
        style={{ borderBottom: "1px solid rgba(63,191,91,0.08)" }}
      >
        <div className="flex items-center justify-between mb-5">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src={assets.logo_icon}
              alt="logo"
              className="w-12 h-12 object-contain"
            />
            <span
              className="text-base font-extrabold tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif", color: "#d0f0d8" }}
            >
              Chatly
            </span>
          </div>

          {/* Menu */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu((prev) => !prev);
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
              style={{
                background: "rgba(63,191,91,0.07)",
                border: "1px solid rgba(63,191,91,0.15)",
              }}
            >
              <img src={assets.menu_icon} alt="Menu" className="w-4" />
            </button>

            {showMenu && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full right-0 mt-2 z-20 w-36 py-2 px-1 rounded-[14px]"
                style={{
                  background: "rgba(8,20,12,0.95)",
                  border: "1px solid rgba(63,191,91,0.2)",
                  backdropFilter: "blur(24px)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                }}
              >
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left px-3 py-2 rounded-[10px] text-sm transition-all"
                  style={{ color: "#c8f0d2", background: "transparent" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(63,191,91,0.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  Edit Profile
                </button>
                <div
                  style={{
                    height: "1px",
                    background: "rgba(63,191,91,0.1)",
                    margin: "4px 8px",
                  }}
                />
                <button
                  onClick={() => logout()}
                  className="w-full text-left px-3 py-2 rounded-[10px] text-sm transition-all"
                  style={{
                    color: "rgba(90,170,110,0.6)",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(63,191,91,0.08)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <div
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full"
          style={{
            background: "rgba(63,191,91,0.05)",
            border: "1px solid rgba(63,191,91,0.15)",
          }}
        >
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-4 opacity-50"
          />
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="bg-transparent border-none outline-none text-xs flex-1"
            placeholder="Search users…"
            style={{ color: "#c8f0d2" }}
          />
        </div>
      </div>

      {/* User list */}
      <div className="sidebar-scroll flex-1 overflow-y-auto py-2">
        {filteredUsers.length === 0 && (
          <p
            className="text-center text-xs py-8"
            style={{ color: "rgba(90,170,110,0.35)" }}
          >
            No users found
          </p>
        )}
        {filteredUsers.map((user, index) => {
          const isOnline = onlineUsers?.includes(user._id.toString());
          const isSelected = selectedUser?._id === user._id;
          const unseen = unseenMessages[user._id];

          return (
            <div
              key={index}
              onClick={() => {
                setSelectedUser(user);
                setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
              }}
              className="user-row relative flex items-center gap-3 mx-2 px-3 py-3 rounded-[14px] cursor-pointer"
              style={{
                background: isSelected ? "rgba(63,191,91,0.1)" : "transparent",
                border: isSelected
                  ? "1px solid rgba(63,191,91,0.2)"
                  : "1px solid transparent",
              }}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={user?.profilePic || assets.avatar_icon}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                  style={{ border: "1.5px solid rgba(63,191,91,0.2)" }}
                />
                {isOnline && (
                  <span
                    className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full"
                    style={{
                      background: "#3FBF5B",
                      border: "2px solid #07100a",
                      boxShadow: "0 0 5px rgba(63,191,91,0.6)",
                    }}
                  />
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col leading-snug flex-1 min-w-0">
                <p
                  className="text-sm font-medium truncate"
                  style={{ color: isSelected ? "#d0f0d8" : "#a0c8ac" }}
                >
                  {user.fullName}
                </p>
                <span
                  className="text-xs"
                  style={{
                    color: isOnline
                      ? "rgba(63,191,91,0.65)"
                      : "rgba(90,150,100,0.35)",
                  }}
                >
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>

              {/* Unseen badge */}
              {unseen > 0 && (
                <span
                  className="text-xs font-semibold min-w-[20px] h-5 flex items-center justify-center rounded-full px-1.5"
                  style={{
                    background: "rgba(63,191,91,0.25)",
                    color: "#3FBF5B",
                    border: "1px solid rgba(63,191,91,0.3)",
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  {unseen}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
