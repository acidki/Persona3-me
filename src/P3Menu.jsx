import { useState, useEffect } from "react";

const ITEMS = [
  { id: "about",    label: "ABOUT ME",      fontSize: 100, offsetX: 0,  offsetY: 0  },
  { id: "resume",   label: "RESUME",        fontSize: 85,  offsetX: 30, offsetY: -5 },
  { id: "github",   label: "GITHUB LINK",   fontSize: 70,  offsetX: 15, offsetY: -5 },
  { id: "socials",  label: "SOCIALS",       fontSize: 60,  offsetX: 40, offsetY: -3 },
  { id: "projects", label: "SIDE PROJECTS", fontSize: 50,  offsetX: 20, offsetY: -2 },
];

export default function P3Menu({ onNavigate }) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive(i => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "Enter") {
        if (onNavigate) onNavigate(ITEMS[active].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onNavigate]);

  return (
    <nav className="p3-menu">
      {ITEMS.map((item, i) => (
        <div
          key={item.id}
          className={`p3-row ${active === i ? "active" : ""} ${mounted ? "mounted" : ""}`}
          style={{ 
            marginLeft: item.offsetX, 
            marginTop: item.offsetY,
            cursor: 'pointer'
          }}
          onMouseEnter={() => setActive(i)}
          onClick={() => {
            if (onNavigate) onNavigate(item.id);
          }}
        >
          <div className="p3-highlight" />
          <span className="p3-label" style={{ fontSize: item.fontSize }}>
            {item.label}
          </span>
        </div>
      ))}
    </nav>
  );
}
