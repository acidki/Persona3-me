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
      {/* FIXED zIndex LINE BELOW */}
      <div className="proj-root" style={{ position: 'absolute', inset: 0, display: 'flex', padding: '50px', zIndex: 10 }}>
        {/* List side */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
          {ITEMS.map((item, i) => (
            <div 
              key={item.id} 
              onMouseEnter={() => setActive(i)}
              style={{ 
                background: active === i ? '#fff' : '#111', 
                color: active === i ? '#000' : '#fff',
                padding: '20px',
                clipPath: 'polygon(0 0, 95% 0, 100% 100%, 5% 100%)',
                cursor: 'pointer',
                fontFamily: 'Anton, sans-serif',
                fontSize: '30px',
                transition: 'all 0.2s ease'
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
        {/* Detail side */}
        <div style={{ flex: 1.5, background: 'rgba(0,0,50,0.8)', padding: '40px', color: '#fff', borderLeft: '5px solid #c4001a' }}>
          <h1 style={{ fontFamily: 'Anton', fontSize: '50px', color: '#a5f6ff', textTransform: 'uppercase' }}>{ITEMS[active].label}</h1>
          <h2 style={{ fontFamily: 'Bebas Neue', color: '#ccc', fontSize: '24px' }}>{ITEMS[active].subtitle}</h2>
          <ul style={{ marginTop: '30px', listStyle: 'none', padding: 0 }}>
            {ITEMS[active].details.map((d, i) => (
              <li key={i} style={{ marginBottom: '15px', fontSize: '20px', fontFamily: 'Montserrat, sans-serif' }}>
                <span style={{ color: '#c4001a', marginRight: '10px' }}>▶</span> {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
