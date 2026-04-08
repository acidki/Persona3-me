import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import bgVideo from "./assets/main3.mp4"; // Reusing the blue aesthetic video

const CHARS = [char1, char2, char3];

const ITEMS = [
  {
    id: "deskbot",
    label: "ARDUINO DESKBOT",
    subtitle: "Hardware / Embedded",
    status: "BUILDING",
    details: [
      "Inspired by Eilik robot project.",
      "Uses Arduino and TFT Display for emotions.",
      "Integrated sensors for environment reaction.",
      "Custom 3D-printable housing design."
    ],
    stats: { complexity: "A", impact: "S", progress: "75%" }
  },
  {
    id: "nasa",
    label: "NASA SPACE APPS",
    subtitle: "Competition / 2024",
    status: "COMPLETE",
    details: [
      "Participated in Global Hackathon 2024.",
      "Solved space-related data challenges.",
      "Collaborated on satellite data visualization.",
      "Ranked at regional participation level."
    ],
    stats: { complexity: "S", impact: "A", progress: "100%" }
  },
  {
    id: "godot",
    label: "2D ENDLESS RUNNER",
    subtitle: "Game Dev / Godot",
    status: "DEPLOYED",
    details: [
      "Developed using Godot Engine & GDScript.",
      "Infinite level generation mechanics.",
      "Custom pixel art and scoring system.",
      "Optimized for desktop and web play."
    ],
    stats: { complexity: "B", impact: "B", progress: "100%" }
  }
];

export default function SideProjects() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive(i => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "Escape" || e.key === "Backspace" || e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate]);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Montserrat:wght@400;700&display=swap');

        .proj-root {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          padding: 5vh 5vw;
          gap: 40px;
        }

        .proj-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 15px;
          justify-content: center;
        }

        .proj-card {
          position: relative;
          background: #111;
          height: 100px;
          clip-path: polygon(0 0, 95% 0, 100% 100%, 5% 100%);
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
          border-left: 0px solid #c4001a;
          opacity: 0.6;
          transform: translateX(-20px);
        }

        .proj-card.active {
          background: #fff;
          opacity: 1;
          transform: translateX(10px);
          border-left: 10px solid #c4001a;
        }

        .proj-card-inner {
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 40px;
          justify-content: space-between;
        }

        .proj-name {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          color: #fff;
        }
        .proj-card.active .proj-name { color: #111; }

        .proj-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          background: #c4001a;
          color: #fff;
          padding: 2px 12px;
          transform: skewX(-10deg);
        }

        .proj-detail-panel {
          flex: 1.2;
          background: rgba(5, 12, 43, 0.95);
          border: 1px solid rgba(133, 244, 255, 0.2);
          padding: 40px;
          position: relative;
          clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%);
          animation: panel-slide 0.5s ease-out;
        }

        @keyframes panel-slide {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .detail-title {
          font-family: 'Anton', sans-serif;
          font-size: 60px;
          color: #a5f6ff;
          margin-bottom: 5px;
          text-transform: uppercase;
        }

        .detail-sub {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          color: #fff;
          opacity: 0.7;
          margin-bottom: 30px;
        }

        .detail-bullet {
          font-family: 'Montserrat', sans-serif;
          color: #fff;
          font-size: 18px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .detail-bullet::before {
          content: "";
          width: 8px;
          height: 8px;
          background: #c4001a;
          display: inline-block;
        }

        .stat-grid {
          margin-top: 40px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 20px;
        }

        .stat-box {
          text-align: center;
        }

        .stat-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          color: #c4001a;
        }

        .stat-val {
          font-family: 'Anton', sans-serif;
          font-size: 40px;
          color: #fff;
        }

        .back-hint {
          position: absolute;
          bottom: 20px;
          right: 30px;
          color: rgba(255,255,255,0.3);
          font-family: 'Bebas Neue', sans-serif;
        }
      `}</style>

      <div className="proj-root">
        <div className="proj-list">
          {ITEMS.map((item, i) => (
            <div 
              key={item.id}
              className={`proj-card ${active === i ? 'active' : ''}`}
              onMouseEnter={() => setActive(i)}
            >
              <div className="proj-card-inner">
                <span className="proj-name">{item.label}</span>
                <span className="proj-status">{item.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="proj-detail-panel" key={active}>
          <div className="detail-title">{ITEMS[active].label}</div>
          <div className="detail-sub">{ITEMS[active].subtitle}</div>
          
          <div className="detail-content">
            {ITEMS[active].details.map((d, i) => (
              <div key={i} className="detail-bullet">{d}</div>
            ))}
          </div>

          <div className="stat-grid">
            <div className="stat-box">
              <div className="stat-label">RANK</div>
              <div className="stat-val">{ITEMS[active].stats.complexity}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">IMPACT</div>
              <div className="stat-val">{ITEMS[active].stats.impact}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">LOAD</div>
              <div className="stat-val">{ITEMS[active].stats.progress}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="back-hint">
        [ESC] RETURN TO MAIN SYSTEM
      </div>
    </div>
  );
}
