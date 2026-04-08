import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedData = { fullName: name, bio };

    if (selectedImg) {
      const reader = new FileReader();

      reader.readAsDataURL(selectedImg);

      reader.onload = async () => {
        updatedData.profilePic = reader.result;

        const success = await updateProfile(updatedData);

        if (success) {
          navigate(-1);
        }
      };
    } else {
      const success = await updateProfile(updatedData);

      if (success) {
        navigate(-1);
      }
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes pp-fadeUp {
          from { opacity:0; transform:translateY(24px) scale(0.98); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes pp-avatarPulse {
          0%,100% { box-shadow: 0 0 0 0px rgba(63,191,91,0.2), 0 0 20px rgba(63,191,91,0.1); }
          50%      { box-shadow: 0 0 0 8px rgba(63,191,91,0.06), 0 0 32px rgba(63,191,91,0.25); }
        }
        @keyframes pp-scan {
          from { left:-100%; }
          to   { left:200%; }
        }
        @keyframes pp-blobA {
          0%,100% { transform:translate(0,0) scale(1); }
          50%      { transform:translate(30px,-20px) scale(1.08); }
        }
        @keyframes pp-blobB {
          0%,100% { transform:translate(0,0) scale(1); }
          50%      { transform:translate(-20px,30px) scale(1.05); }
        }

        .pp-root {
          min-height: 100vh;
          background: #07100a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 24px;
        }
        .pp-root::after {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background: repeating-linear-gradient(
            0deg, rgba(0,0,0,0.035) 0px, rgba(0,0,0,0.035) 1px,
            transparent 1px, transparent 4px
          );
        }

        .pp-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .pp-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 860px;
          background: rgba(8,18,10,0.85);
          border: 1px solid rgba(63,191,91,0.18);
          border-radius: 28px;
          overflow: hidden;
          backdrop-filter: blur(36px);
          box-shadow:
            inset 0 0 0 1px rgba(63,191,91,0.05),
            0 40px 80px rgba(0,0,0,0.6),
            0 0 80px rgba(63,191,91,0.04);
          animation: pp-fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
          display: flex;
          flex-direction: row;
        }

        @media (max-width: 640px) {
          .pp-card { flex-direction: column-reverse; }
        }

        /* corner accents */
        .pp-card::before {
          content: '';
          position: absolute;
          top: 10px; left: 10px;
          width: 22px; height: 22px;
          border-top: 1.5px solid rgba(63,191,91,0.5);
          border-left: 1.5px solid rgba(63,191,91,0.5);
          border-radius: 2px 0 0 0;
          pointer-events: none;
        }
        .pp-card::after {
          content: '';
          position: absolute;
          bottom: 10px; right: 10px;
          width: 22px; height: 22px;
          border-bottom: 1.5px solid rgba(63,191,91,0.5);
          border-right: 1.5px solid rgba(63,191,91,0.5);
          border-radius: 0 0 3px 0;
          pointer-events: none;
        }

        .pp-form-side {
          flex: 1;
          padding: 44px 40px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        @media (max-width: 640px) {
          .pp-form-side { padding: 28px 24px; }
        }

        .pp-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(63,191,91,0.45);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          padding: 0;
          margin-bottom: 28px;
          transition: color 0.15s;
        }
        .pp-back-btn:hover { color: #3FBF5B; }

        .pp-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 22px;
          color: #d0f0d8;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .pp-subtitle {
          font-size: 13px;
          color: rgba(90,170,110,0.45);
          margin-bottom: 28px;
        }

        .pp-avatar-label {
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          margin-bottom: 20px;
          width: fit-content;
        }
        .pp-avatar-img {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(63,191,91,0.25);
          animation: pp-avatarPulse 4s ease-in-out infinite;
          transition: border-color 0.2s;
        }
        .pp-avatar-label:hover .pp-avatar-img {
          border-color: rgba(63,191,91,0.6);
        }
        .pp-avatar-text {
          font-size: 13px;
          color: rgba(63,191,91,0.5);
          font-weight: 500;
          transition: color 0.15s;
        }
        .pp-avatar-label:hover .pp-avatar-text { color: #3FBF5B; }

        .pp-field-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(63,191,91,0.35);
          margin-bottom: 6px;
        }

        .pp-input {
          width: 100%;
          background: rgba(63,191,91,0.04);
          border: 1px solid rgba(63,191,91,0.16);
          border-radius: 14px;
          padding: 12px 16px;
          color: #c8f0d2;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          caret-color: #3FBF5B;
          margin-bottom: 14px;
        }
        .pp-input::placeholder { color: rgba(80,160,100,0.3); }
        .pp-input:focus {
          border-color: rgba(63,191,91,0.5);
          background: rgba(63,191,91,0.07);
          box-shadow: 0 0 0 3px rgba(63,191,91,0.09);
        }

        .pp-textarea {
          width: 100%;
          background: rgba(63,191,91,0.04);
          border: 1px solid rgba(63,191,91,0.16);
          border-radius: 14px;
          padding: 12px 16px;
          color: #c8f0d2;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          resize: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          caret-color: #3FBF5B;
          margin-bottom: 24px;
        }
        .pp-textarea::placeholder { color: rgba(80,160,100,0.3); }
        .pp-textarea:focus {
          border-color: rgba(63,191,91,0.5);
          background: rgba(63,191,91,0.07);
          box-shadow: 0 0 0 3px rgba(63,191,91,0.09);
        }

        .pp-save-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: linear-gradient(135deg, #3FBF5B 0%, #28a847 55%, #1d8f3c 100%);
          color: #e6fff0;
          position: relative;
          overflow: hidden;
          transition: transform 0.15s, box-shadow 0.15s;
          box-shadow: 0 4px 22px rgba(63,191,91,0.28);
        }
        .pp-save-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          animation: pp-scan 2.4s ease-in-out infinite;
        }
        .pp-save-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(63,191,91,0.38); }
        .pp-save-btn:active { transform: translateY(0); }

        .pp-avatar-side {
          width: 220px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 28px;
          border-left: 1px solid rgba(63,191,91,0.08);
          gap: 16px;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .pp-avatar-side {
            width: 100%;
            padding: 32px 28px 20px;
            border-left: none;
            border-bottom: 1px solid rgba(63,191,91,0.08);
          }
        }

        .pp-avatar-side::before {
          content: '';
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(63,191,91,0.08) 0%, transparent 70%);
          pointer-events: none;
          animation: pp-blobA 8s ease-in-out infinite;
        }

        .pp-large-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(63,191,91,0.3);
          box-shadow: 0 0 30px rgba(63,191,91,0.15);
          position: relative;
          z-index: 1;
          animation: pp-avatarPulse 4s ease-in-out infinite;
        }

        .pp-user-name-side {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 14px;
          color: #d0f0d8;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .pp-user-bio-side {
          font-size: 12px;
          color: rgba(90,170,110,0.4);
          text-align: center;
          line-height: 1.6;
          position: relative;
          z-index: 1;
        }
      `}</style>

      <div className="pp-root">
        {/* Blobs */}
        <div
          className="pp-blob"
          style={{
            width: "500px",
            height: "500px",
            top: "-160px",
            left: "-140px",
            background: "rgba(63,191,91,0.07)",
            animation: "pp-blobA 12s ease-in-out infinite",
          }}
        />
        <div
          className="pp-blob"
          style={{
            width: "400px",
            height: "400px",
            bottom: "-120px",
            right: "-100px",
            background: "rgba(63,191,91,0.05)",
            animation: "pp-blobB 16s ease-in-out infinite",
          }}
        />

        <div className="pp-card">
          {/* Form side */}
          <div className="pp-form-side">
            <button className="pp-back-btn" onClick={() => navigate("/")}>
              ← Back to chats
            </button>
            <div className="pp-title">Your Profile</div>
            <div className="pp-subtitle">Update your name, bio and avatar</div>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {/* Avatar upload */}
              <label htmlFor="pp-avatar" className="pp-avatar-label">
                <input
                  type="file"
                  id="pp-avatar"
                  accept=".png,.jpg,.jpeg"
                  hidden
                  onChange={(e) => setSelectedImg(e.target.files[0])}
                />
                <img
                  src={
                    selectedImg
                      ? URL.createObjectURL(selectedImg)
                      : authUser?.profilePic || assets.avatar_icon
                  }
                  alt=""
                  className="pp-avatar-img"
                />
                <span className="pp-avatar-text">
                  {selectedImg ? "Image selected ✓" : "Upload profile photo"}
                </span>
              </label>

              <div className="pp-field-label">Full Name</div>
              <input
                className="pp-input"
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="pp-field-label">Bio</div>
              <textarea
                className="pp-textarea"
                rows={4}
                required
                placeholder="Write something about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />

              <button className="pp-save-btn" type="submit">
                Save changes ✦
              </button>
            </form>
          </div>

          {/* Avatar preview side */}
          <div className="pp-avatar-side">
            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : authUser?.profilePic || assets.logo_icon
              }
              alt=""
              className="pp-large-avatar"
            />
            <div className="pp-user-name-side">{name || "Your Name"}</div>
            {bio && <div className="pp-user-bio-side">{bio}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
