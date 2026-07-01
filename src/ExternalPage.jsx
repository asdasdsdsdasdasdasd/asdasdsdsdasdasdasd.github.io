import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ExternalPage({ src, title, subtitle, links = [] }) {
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") navigate(-1);
      if (e.key === "Enter" && links[0]) window.open(links[0].href, "_blank", "noopener,noreferrer");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, links]);

  return (
    <div id="menu-screen">
      <video src={src} autoPlay loop muted playsInline />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');
        .ext-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4vw;
          background: linear-gradient(180deg, rgba(0,8,40,0.55), rgba(0,8,40,0.82));
        }
        .ext-panel {
          width: min(720px, 92vw);
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 20px) 100%, 0 100%);
          box-shadow: 14px 14px 0 rgba(214, 50, 50, 0.85);
          padding: 28px 32px 32px;
        }
        .ext-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(48px, 8vw, 84px);
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 8px;
        }
        .ext-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #8ef5ff;
          margin-bottom: 24px;
        }
        .ext-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .ext-link {
          display: block;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 1.5px;
          color: #041238;
          background: #8ef5ff;
          padding: 14px 18px;
          text-decoration: none;
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .ext-link:hover {
          transform: translateX(6px);
          background: #fff;
        }
        .ext-hint {
          margin-top: 20px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 1px;
          color: rgba(142, 245, 255, 0.75);
        }
      `}</style>
      <div className="ext-overlay">
        <div className="ext-panel">
          <h1 className="ext-title">{title}</h1>
          {subtitle && <div className="ext-subtitle">{subtitle}</div>}
          <div className="ext-links">
            {links.map((link) => (
              <a
                key={link.href}
                className="ext-link"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="ext-hint">Enter to open first link · ← back</div>
        </div>
      </div>
    </div>
  );
}
