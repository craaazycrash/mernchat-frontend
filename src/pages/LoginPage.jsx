import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

/* ── Floating Chat Bubbles ── */
const BUBBLES = [
  { text: "hey!", x: "8%", y: "12%", delay: "0s", size: "sm", rot: "-6deg" },
  {
    text: "what's up?",
    x: "72%",
    y: "7%",
    delay: "1.2s",
    size: "md",
    rot: "4deg",
  },
  { text: "😂", x: "88%", y: "28%", delay: "2s", size: "xs", rot: "-3deg" },
  {
    text: "on my way!",
    x: "5%",
    y: "42%",
    delay: "0.6s",
    size: "md",
    rot: "7deg",
  },
  { text: "👋", x: "80%", y: "55%", delay: "3s", size: "xs", rot: "-5deg" },
  {
    text: "let's goo",
    x: "12%",
    y: "70%",
    delay: "1.8s",
    size: "sm",
    rot: "5deg",
  },
  { text: "🔥🔥", x: "70%", y: "78%", delay: "0.3s", size: "xs", rot: "-8deg" },
  { text: "gg", x: "88%", y: "88%", delay: "2.5s", size: "sm", rot: "3deg" },
  { text: "brb", x: "3%", y: "88%", delay: "1s", size: "xs", rot: "-4deg" },
  {
    text: "omg yes!!",
    x: "55%",
    y: "92%",
    delay: "1.5s",
    size: "md",
    rot: "6deg",
  },
];

const sizeClass = {
  xs: "text-[11px] px-[9px] py-[5px]",
  sm: "text-[12px] px-[12px] py-[6px]",
  md: "text-[13px] px-[14px] py-[7px]",
};

const ChatBubble = ({ text, x, y, delay, size, rot }) => (
  <div
    className={`absolute rounded-[20px_20px_20px_4px] font-medium whitespace-nowrap pointer-events-none select-none z-0 backdrop-blur-md border border-[rgba(63,191,91,0.25)] bg-[rgba(63,191,91,0.1)] text-[rgba(63,191,91,0.65)] font-['DM_Sans',sans-serif] ${sizeClass[size]}`}
    style={{
      left: x,
      top: y,
      transform: `rotate(${rot})`,
      animation: `bubbleDrift 7s ease-in-out ${delay} infinite alternate`,
    }}
  >
    {text}
  </div>
);

/* ── Morphing Blob ── */
const Blob = ({ pathId, style }) => (
  <svg
    viewBox="0 0 500 500"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute pointer-events-none"
    style={style}
  >
    <defs>
      <radialGradient id={`gr_${pathId}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#3FBF5B" stopOpacity="0.32" />
        <stop offset="100%" stopColor="#1a7a34" stopOpacity="0" />
      </radialGradient>
    </defs>
    <path fill={`url(#gr_${pathId})`}>
      <animate
        attributeName="d"
        dur={pathId === "a" ? "12s" : "16s"}
        repeatCount="indefinite"
        values={
          pathId === "a"
            ? "M421,310Q380,370,313,398Q246,426,182,399Q118,372,78,313Q38,254,63,185Q88,116,148,75Q208,34,275,47Q342,60,395,108Q448,156,462,228Q476,300,421,310Z;M430,295Q368,340,305,378Q242,416,175,393Q108,370,68,307Q28,244,45,172Q62,100,128,60Q194,20,265,32Q336,44,393,88Q450,132,461,216Q472,300,430,295Z;M421,310Q380,370,313,398Q246,426,182,399Q118,372,78,313Q38,254,63,185Q88,116,148,75Q208,34,275,47Q342,60,395,108Q448,156,462,228Q476,300,421,310Z"
            : "M380,290Q340,360,270,390Q200,420,140,385Q80,350,55,285Q30,220,55,155Q80,90,150,60Q220,30,290,50Q360,70,395,130Q430,190,430,240Q430,290,380,290Z;M400,305Q355,375,280,400Q205,425,145,388Q85,351,58,282Q31,213,60,148Q89,83,158,55Q227,27,298,48Q369,69,405,134Q441,199,440,252Q439,305,400,305Z;M380,290Q340,360,270,390Q200,420,140,385Q80,350,55,285Q30,220,55,155Q80,90,150,60Q220,30,290,50Q360,70,395,130Q430,190,430,240Q430,290,380,290Z"
        }
      />
    </path>
  </svg>
);

/* ═══════════════════════════════
   LoginPage Component
═══════════════════════════════ */
const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { login } = useContext(AuthContext);
  const isSignUp = currState === "Sign up";

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (isSignUp && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
    login(isSignUp ? "signup" : "login", { fullName, email, password, bio });
  };

  /* Shared input class */
  const inputCls = [
    "w-full rounded-[14px] px-4 py-[13px]",
    "bg-[rgba(63,191,91,0.04)] border border-[rgba(63,191,91,0.16)]",
    "text-[#c8f0d2] text-sm font-['DM_Sans',sans-serif] outline-none",
    "placeholder:text-[rgba(80,160,100,0.35)] caret-[#3FBF5B]",
    "transition-all duration-200",
    "focus:border-[rgba(63,191,91,0.55)] focus:bg-[rgba(63,191,91,0.07)] focus:shadow-[0_0_0_3px_rgba(63,191,91,0.1)]",
  ].join(" ");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes bubbleDrift {
          from { transform: translateY(0px);   opacity: 0.55; }
          to   { transform: translateY(-16px); opacity: 1;    }
        }
        @keyframes lp-fadeUp {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes lp-logoGlow {
          0%,100% { box-shadow: 0 0 0 0px  rgba(63,191,91,0.20), 0 0 20px rgba(63,191,91,0.15); }
          50%      { box-shadow: 0 0 0 8px  rgba(63,191,91,0.07), 0 0 36px rgba(63,191,91,0.30); }
        }
        @keyframes lp-shimmer {
          from { left: -100%; }
          to   { left:  200%; }
        }

        .lp-scan::after {
          content: '';
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background: repeating-linear-gradient(
            0deg, rgba(0,0,0,0.035) 0px, rgba(0,0,0,0.035) 1px,
            transparent 1px, transparent 4px
          );
        }
        .lp-card   { animation: lp-fadeUp  0.65s cubic-bezier(0.22,1,0.36,1) both; }
        .lp-logo   { animation: lp-logoGlow 3s  ease-in-out infinite; }
        .lp-btn::after {
          content: '';
          position: absolute; top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          animation: lp-shimmer 2.4s ease-in-out infinite;
        }
      `}</style>

      {/* Root */}
      <div className="lp-scan min-h-screen bg-[#07100a] flex items-center justify-center font-['DM_Sans',sans-serif] relative overflow-hidden p-6">
        {/* Blobs */}
        <Blob
          pathId="a"
          style={{
            width: "600px",
            height: "600px",
            top: "-200px",
            left: "-180px",
            opacity: 0.75,
          }}
        />
        <Blob
          pathId="b"
          style={{
            width: "480px",
            height: "480px",
            bottom: "-140px",
            right: "-140px",
            opacity: 0.55,
          }}
        />

        {/* Floating bubbles */}
        {BUBBLES.map((b, i) => (
          <ChatBubble key={i} {...b} />
        ))}

        {/* ── CARD ── */}
        <div
          className={`
          lp-card relative z-10 w-full max-w-[412px] rounded-[28px] px-9 pt-10 pb-9
          bg-[rgba(8,18,10,0.84)] border border-[rgba(63,191,91,0.2)]
          backdrop-blur-[36px]
          shadow-[inset_0_0_0_1px_rgba(63,191,91,0.05),0_40px_80px_rgba(0,0,0,0.65),0_0_80px_rgba(63,191,91,0.04)]
        `}
        >
          {/* Header */}
          <div className="flex items-center gap-[14px] mb-7">
            <div
              className={`
              lp-logo w-[62px] h-[62px] flex-shrink-0 rounded-[18px] flex items-center justify-center overflow-hidden
              bg-[rgba(63,191,91,0.09)] border border-[rgba(63,191,91,0.3)] border-[1.5px]
            `}
            >
              <img
                src={assets.logo_icon}
                alt="logo"
                className="w-[72px] h-[72px] object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div>
              <h1 className="font-['Syne',sans-serif] font-extrabold text-[20px] text-[#d0f0d8] tracking-[-0.02em] m-0 leading-tight">
                {isSignUp
                  ? isDataSubmitted
                    ? "Almost there 🎉"
                    : "Chatly"
                  : "Welcome back"}
              </h1>
              <p className="text-[rgba(90,170,110,0.5)] text-[12px] mt-[3px] mb-0">
                {isSignUp
                  ? isDataSubmitted
                    ? "One last thing"
                    : "Connect Instantly, Talk Without Limits."
                  : "Good to see you again"}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="flex flex-col gap-[11px]">
            {isSignUp && !isDataSubmitted && (
              <input
                className={inputCls}
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            )}

            {!isDataSubmitted && (
              <>
                <input
                  className={inputCls}
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <div className="relative">
                  <input
                    className={`${inputCls} pr-11`}
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-[13px] top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[rgba(90,170,110,0.5)] text-[15px] leading-none p-0"
                  >
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>
              </>
            )}

            {isSignUp && isDataSubmitted && (
              <textarea
                className={`${inputCls} resize-none`}
                rows={4}
                placeholder="Short bio — what are you about? 🙌"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
              />
            )}

            {!isDataSubmitted && (
              <label className="flex items-start gap-[9px] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                  className="mt-[2px] cursor-pointer accent-[#3FBF5B]"
                />
                <span className="text-[rgba(90,165,105,0.5)] text-[12px] leading-relaxed">
                  I agree to the{" "}
                  <span className="text-[#3FBF5B] cursor-pointer font-semibold hover:text-[#72e08a] transition-colors duration-150">
                    Terms of Use
                  </span>{" "}
                  &amp;{" "}
                  <span className="text-[#3FBF5B] cursor-pointer font-semibold hover:text-[#72e08a] transition-colors duration-150">
                    Privacy Policy
                  </span>
                </span>
              </label>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className={`
                lp-btn relative overflow-hidden w-full mt-1 py-[14px] rounded-[14px] border-none cursor-pointer
                font-['Syne',sans-serif] font-extrabold text-[14px] tracking-[0.06em] uppercase
                text-[#e6fff0]
                bg-gradient-to-br from-[#3FBF5B] via-[#28a847] to-[#1d8f3c]
                shadow-[0_4px_22px_rgba(63,191,91,0.28)]
                transition-all duration-150
                hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(63,191,91,0.38)]
                active:translate-y-0
              `}
            >
              {isSignUp
                ? isDataSubmitted
                  ? "Create my account ✦"
                  : "Continue →"
                : "Sign in →"}
            </button>
          </form>

          {/* Divider */}
          {!isDataSubmitted && (
            <div className="flex items-center gap-[10px] my-[18px] text-[rgba(63,191,91,0.25)] text-[11px]">
              <div className="flex-1 h-px bg-[rgba(63,191,91,0.08)]" />
              OR
              <div className="flex-1 h-px bg-[rgba(63,191,91,0.08)]" />
            </div>
          )}

          {/* Back button (step 2) */}
          {isDataSubmitted && (
            <button
              type="button"
              onClick={() => setIsDataSubmitted(false)}
              className="flex items-center gap-[6px] bg-transparent border-none cursor-pointer text-[rgba(63,191,91,0.45)] text-[13px] font-['DM_Sans',sans-serif] p-0 mt-[14px] hover:text-[#3FBF5B] transition-colors duration-150"
            >
              ← Go back
            </button>
          )}

          {/* Toggle sign-up / login */}
          <p className="text-center mt-5 text-[rgba(80,140,95,0.4)] text-[13px]">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <span
              className="text-[#3FBF5B] cursor-pointer font-semibold hover:text-[#72e08a] transition-colors duration-150"
              onClick={() => {
                setCurrState(isSignUp ? "Login" : "Sign up");
                setIsDataSubmitted(false);
              }}
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
