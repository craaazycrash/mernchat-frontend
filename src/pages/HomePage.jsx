import React, { useContext, useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";

const BG_BUBBLES = [
  { text: "hey! 👋", x: "6%", y: "8%", delay: "0s", dur: "9s" },
  { text: "on my way", x: "78%", y: "5%", delay: "1.4s", dur: "11s" },
  { text: "😂😂", x: "91%", y: "22%", delay: "2.8s", dur: "8s" },
  { text: "letsss go!", x: "3%", y: "38%", delay: "0.7s", dur: "13s" },
  { text: "✅ done", x: "85%", y: "48%", delay: "3.5s", dur: "10s" },
  { text: "omg yes!!", x: "10%", y: "62%", delay: "1.9s", dur: "12s" },
  { text: "🔥🔥🔥", x: "72%", y: "70%", delay: "0.3s", dur: "9s" },
  { text: "brb", x: "4%", y: "82%", delay: "2.2s", dur: "14s" },
  { text: "gg!", x: "88%", y: "88%", delay: "4s", dur: "10s" },
  { text: "what's up?", x: "50%", y: "93%", delay: "1.1s", dur: "11s" },
  { text: "💬", x: "60%", y: "15%", delay: "3.1s", dur: "8s" },
  { text: "seen ✓✓", x: "25%", y: "75%", delay: "0.5s", dur: "13s" },
];

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.6 + 0.4,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(63,191,91,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(63,191,91,${0.06 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className="w-full h-screen sm:px-[8%] lg:px-[12%] sm:py-[4%]"
      style={{
        background: "#060e08",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        body, html { background: #060e08 !important; margin: 0; }

        @keyframes blob1 {
          0%,100% { transform: translate(0,0) scale(1); border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%; }
          33%     { transform: translate(40px,-30px) scale(1.08); border-radius: 40% 60% 30% 70% / 60% 40% 70% 30%; }
          66%     { transform: translate(-20px,40px) scale(0.95); border-radius: 70% 30% 50% 50% / 40% 70% 30% 60%; }
        }
        @keyframes blob2 {
          0%,100% { transform: translate(0,0) scale(1); border-radius: 40% 60% 50% 50% / 60% 40% 60% 40%; }
          33%     { transform: translate(-30px,20px) scale(1.05); border-radius: 60% 40% 40% 60% / 50% 60% 40% 50%; }
          66%     { transform: translate(20px,-40px) scale(1.1); border-radius: 50% 50% 60% 40% / 40% 60% 50% 50%; }
        }
        @keyframes blob3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(25px,25px) scale(1.12); }
        }
        @keyframes bubbleFloat {
          0%   { transform: translateY(0px) rotate(var(--brot)); opacity: 0.18; }
          50%  { transform: translateY(-18px) rotate(var(--brot)); opacity: 0.38; }
          100% { transform: translateY(0px) rotate(var(--brot)); opacity: 0.18; }
        }
        @keyframes shineSweep {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(350%) skewX(-15deg); }
        }
        @keyframes borderGlow {
          0%,100% { box-shadow: 0 0 0 1px rgba(63,191,91,0.12), 0 40px 100px rgba(0,0,0,0.75), 0 0 60px rgba(63,191,91,0.04); }
          50%     { box-shadow: 0 0 0 1px rgba(63,191,91,0.25), 0 40px 100px rgba(0,0,0,0.75), 0 0 90px rgba(63,191,91,0.10); }
        }
        @keyframes statusPulse {
          0%,100% { opacity: 0.5; box-shadow: 0 0 4px rgba(63,191,91,0.5); }
          50%     { opacity: 1;   box-shadow: 0 0 10px rgba(63,191,91,0.9); }
        }

        .hp-grid {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(63,191,91,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(63,191,91,0.028) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, transparent 100%);
        }
        .hp-scan::after {
          content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background: repeating-linear-gradient(0deg, rgba(0,0,0,0.022) 0px, rgba(0,0,0,0.022) 1px, transparent 1px, transparent 3px);
        }
        .hp-card { animation: borderGlow 5s ease-in-out infinite; }

        .hp-corner { position: absolute; width: 28px; height: 28px; pointer-events: none; z-index: 20; }
        .hp-corner::before, .hp-corner::after { content: ''; position: absolute; background: rgba(63,191,91,0.6); }
        .hp-corner-tl { top: -1px; left: -1px; }
        .hp-corner-tl::before { top:0; left:0; width:14px; height:1.5px; }
        .hp-corner-tl::after  { top:0; left:0; width:1.5px; height:14px; }
        .hp-corner-tr { top: -1px; right: -1px; }
        .hp-corner-tr::before { top:0; right:0; width:14px; height:1.5px; }
        .hp-corner-tr::after  { top:0; right:0; width:1.5px; height:14px; }
        .hp-corner-bl { bottom: -1px; left: -1px; }
        .hp-corner-bl::before { bottom:0; left:0; width:14px; height:1.5px; }
        .hp-corner-bl::after  { bottom:0; left:0; width:1.5px; height:14px; }
        .hp-corner-br { bottom: -1px; right: -1px; }
        .hp-corner-br::before { bottom:0; right:0; width:14px; height:1.5px; }
        .hp-corner-br::after  { bottom:0; right:0; width:1.5px; height:14px; }

        .hp-status-dot { animation: statusPulse 2.5s ease-in-out infinite; }
        .hp-status-dot-2 { animation: statusPulse 2.5s ease-in-out 1.25s infinite; }
      `}</style>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Grid */}
      <div className="hp-grid" />

      {/* Morphing blobs */}
      <div
        style={{
          position: "fixed",
          top: -220,
          left: -220,
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle at 40% 40%, rgba(63,191,91,0.16) 0%, rgba(29,143,60,0.07) 50%, transparent 70%)",
          animation: "blob1 15s ease-in-out infinite",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: -180,
          right: -180,
          width: 520,
          height: 520,
          background:
            "radial-gradient(circle at 60% 60%, rgba(40,168,71,0.13) 0%, rgba(10,80,30,0.06) 50%, transparent 70%)",
          animation: "blob2 19s ease-in-out infinite",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "35%",
          left: "42%",
          width: 260,
          height: 260,
          background:
            "radial-gradient(circle, rgba(63,191,91,0.05) 0%, transparent 65%)",
          animation: "blob3 11s ease-in-out infinite",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Floating bg bubbles */}
      {BG_BUBBLES.map((b, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            left: b.x,
            top: b.y,
            zIndex: 1,
            pointerEvents: "none",
            "--brot": `${(i % 2 === 0 ? 1 : -1) * ((i % 5) + 2)}deg`,
            animation: `bubbleFloat ${b.dur} ease-in-out ${b.delay} infinite`,
            fontSize: 11,
            padding: "4px 10px",
            borderRadius: "12px 12px 12px 3px",
            background: "rgba(63,191,91,0.06)",
            border: "1px solid rgba(63,191,91,0.14)",
            color: "rgba(63,191,91,0.5)",
            fontFamily: "'DM Sans',sans-serif",
            whiteSpace: "nowrap",
            backdropFilter: "blur(4px)",
          }}
        >
          {b.text}
        </div>
      ))}

      {/* Main card */}
      <div
        className={`hp-card hp-scan relative z-10 rounded-2xl overflow-hidden h-full grid grid-cols-1
          ${
            selectedUser
              ? showRightSidebar
                ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]"
                : "md:grid-cols-[1fr_2fr]"
              : "md:grid-cols-2"
          }`}
        style={{
          background: "rgba(6,12,8,0.9)",
          border: "1px solid rgba(63,191,91,0.13)",
          backdropFilter: "blur(40px)",
        }}
      >
        {/* Corner accents */}
        <div className="hp-corner hp-corner-tl" />
        <div className="hp-corner hp-corner-tr" />
        <div className="hp-corner hp-corner-bl" />
        <div className="hp-corner hp-corner-br" />

        {/* One-time shine sweep */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 15,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "38%",
              background:
                "linear-gradient(90deg, transparent, rgba(63,191,91,0.04), transparent)",
              animation: "shineSweep 3.5s ease-in-out 0.6s 1 forwards",
            }}
          />
        </div>

        {/* Top edge glow line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "8%",
            right: "8%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(63,191,91,0.55), transparent)",
            zIndex: 16,
            pointerEvents: "none",
          }}
        />

        {/* Bottom edge glow line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "20%",
            right: "20%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(63,191,91,0.2), transparent)",
            zIndex: 16,
            pointerEvents: "none",
          }}
        />

        <Sidebar />
        <ChatContainer setShowRightSidebar={setShowRightSidebar} />
        <RightSidebar showRightSidebar={showRightSidebar} />
      </div>
    </div>
  );
};

export default HomePage;
