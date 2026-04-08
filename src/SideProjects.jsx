import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "./assets/main3.mp4";

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
    stats: { rank: "A", impact: "S", progress: "75%" }
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
    stats: { rank: "S", impact: "A", progress: "100%" }
  }
];

export default function SideProjects() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive(i => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "Escape" || e.key === "Backspace" || e.key === "ArrowLeft") navigate("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate]);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      <div className="proj-root" style={{ position: 'absolute', inset: 0, display: 'flex', padding: '50px', zIndex: 10 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '15px' }}>
          {ITEMS.map((item, i) => (
            <div 
              key={item.id} 
              onMouseEnter={() => setActive(i)}
              style={{ 
                background: active === i ? '#fff' : 'rgba(0,0,0,0.7)', 
                color: active === i ? '#000' : '#fff',
                padding: '15px 30px',
                clipPath: 'polygon(0 0, 95% 0, 100% 100%, 5% 100%)',
                cursor: 'pointer',
                fontFamily: 'Anton, sans-serif',
                fontSize: '28px',
                transition: 'all 0.2s ease',
                transform: active === i ? 'translateX(10px)' : 'translateX(0)'
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div style={{ flex: 1.5, background: 'rgba(5, 15, 50, 0.9)', padding: '40px', color: '#fff', borderLeft: '8px solid #c4001a', height: 'fit-content', marginTop: 'auto', marginBottom: 'auto' }}>
          <h1 style={{ fontFamily: 'Anton', fontSize: '50px', color: '#a5f6ff', margin: 0 }}>{ITEMS[active].label}</h1>
          <h2 style={{ fontFamily: 'Bebas Neue', color: '#ff5e88', fontSize: '24px', letterSpacing: '2px' }}>{ITEMS[active].subtitle}</h2>
          <div style={{ marginTop: '20px' }}>
            {ITEMS[active].details.map((d, i) => (
              <p key={i} style={{ fontFamily: 'Montserrat', fontSize: '18px', marginBottom: '10px' }}>
                <span style={{ color: '#c4001a', fontWeight: 'bold' }}>//</span> {d}
              </p>
            ))}
          </div>
          <div style={{ marginTop: '30px', display: 'flex', gap: '40px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '20px' }}>
            <div><div style={{ fontSize: '12px', color: '#c4001a' }}>RANK</div><div style={{ fontSize: '30px', fontFamily: 'Anton' }}>{ITEMS[active].stats.rank}</div></div>
            <div><div style={{ fontSize: '12px', color: '#c4001a' }}>IMPACT</div><div style={{ fontSize: '30px', fontFamily: 'Anton' }}>{ITEMS[active].stats.impact}</div></div>
            <div><div style={{ fontSize: '12px', color: '#c4001a' }}>STATUS</div><div style={{ fontSize: '30px', fontFamily: 'Anton' }}>{ITEMS[active].stats.progress}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
