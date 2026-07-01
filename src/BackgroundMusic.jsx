import { useCallback, useEffect, useRef, useState } from "react";

const BGM_SRC = `${import.meta.env.BASE_URL}music/menu-bgm.mp3`;
const STORAGE_KEY = "p3-bgm-muted";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(() => localStorage.getItem(STORAGE_KEY) === "1");
  const [needsUnlock, setNeedsUnlock] = useState(true);

  const syncPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || muted) return;
    try {
      await audio.play();
      setPlaying(true);
      setNeedsUnlock(false);
    } catch {
      setPlaying(false);
      setNeedsUnlock(true);
    }
  }, [muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
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

  useEffect(() => {
    const unlock = () => {
      if (!muted) syncPlay();
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
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
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: flex-start;
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
        .p3-bgm-unlock {
          font-size: 11px;
          letter-spacing: 1.5px;
          color: rgba(255,255,255,0.45);
          max-width: 220px;
          line-height: 1.35;
        }
      `}</style>
      <div className="p3-bgm-panel">
        <button
          type="button"
          className="p3-bgm-btn"
          onClick={() => {
            setMuted((m) => {
              const next = !m;
              localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
              return next;
            });
          }}
          aria-label={muted ? "Unmute music" : "Mute music"}
        >
          {muted ? "♪ MUSIC OFF" : playing ? "♪ MUSIC ON" : "♪ MUSIC …"}
        </button>
        {needsUnlock && !muted && (
          <div className="p3-bgm-unlock">Click or press a key to start music · M to toggle</div>
        )}
      </div>
    </>
  );
}
