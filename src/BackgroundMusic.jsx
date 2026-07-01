import { useCallback, useEffect, useRef, useState } from "react";

const BGM_SRC = `${import.meta.env.BASE_URL}music/menu-bgm.webm`;
const STORAGE_KEY = "p3-bgm-muted";
const DEFAULT_VOLUME = 0.14;

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(() => localStorage.getItem(STORAGE_KEY) === "1");

  const syncPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || muted) return;
    audio.volume = DEFAULT_VOLUME;
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, [muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = DEFAULT_VOLUME;
    audio.muted = muted;
    if (!muted) syncPlay();
    else {
      audio.pause();
      setPlaying(false);
    }
  }, [muted, syncPlay]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === "m") {
        setMuted((m) => {
          const next = !m;
          localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
          return next;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Browsers block unmuted autoplay — start on first click/key anywhere on the page.
  useEffect(() => {
    const start = () => {
      if (!muted) syncPlay();
    };
    document.addEventListener("pointerdown", start, { once: true, capture: true });
    document.addEventListener("keydown", start, { once: true, capture: true });
    return () => {
      document.removeEventListener("pointerdown", start, { capture: true });
      document.removeEventListener("keydown", start, { capture: true });
    };
  }, [muted, syncPlay]);

  return (
    <>
      <audio ref={audioRef} src={BGM_SRC} loop preload="auto" />
      <style>{`
        .p3-bgm-panel {
          position: fixed;
          bottom: 24px;
          left: 28px;
          z-index: 1000;
          font-family: 'Anton', sans-serif;
          pointer-events: all;
        }
        .p3-bgm-btn {
          border: 1px solid rgba(255,255,255,0.35);
          background: rgba(8, 16, 68, 0.82);
          color: #8ef5ff;
          letter-spacing: 2px;
          font-size: 13px;
          padding: 8px 14px;
          cursor: pointer;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .p3-bgm-btn:hover { background: rgba(12, 26, 94, 0.95); color: #fff; }
      `}</style>
      <div className="p3-bgm-panel">
        <button
          type="button"
          className="p3-bgm-btn"
          onClick={() => {
            setMuted((m) => {
              const next = !m;
              localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
              if (!next) syncPlay();
              return next;
            });
          }}
          aria-label={muted ? "Unmute music" : "Mute music"}
        >
          {muted ? "♪ MUSIC OFF" : playing ? "♪ MUSIC ON" : "♪ MUSIC …"}
        </button>
      </div>
    </>
  );
}
