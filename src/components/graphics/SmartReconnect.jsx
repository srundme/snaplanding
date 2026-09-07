import { useEffect, useRef, useState, useCallback } from "react";
import { Phone, PhoneOff } from "lucide-react";
import { useInView, useReducedMotion } from "framer-motion";
import { markAudioUnlocked } from "../../lib/audioUnlock";

/*
  In-call phone — mid-cut, then auto-redial.
  Clips in /public/audio/redial/
*/

const PHASES = [
  {
    id: "live",
    label: "mobile",
    tone: "live",
    startSeconds: 134,
    cut: true,
    clips: [
      {
        who: "agent",
        text: "Priya, your policy IL-28491 renews on 15th March. I can send the payment link on WhatsApp",
        audio: "/audio/redial/en-live-01-agent.mp3?v=2",
      },
      {
        who: "caller",
        text: "Yes, send it… wait, my signal is going—",
        audio: "/audio/redial/en-live-02-caller.mp3?v=2",
      },
    ],
  },
  {
    id: "drop",
    label: "call ended",
    tone: "drop",
    lines: [],
    system: "Call disconnected",
    hold: 650,
  },
  {
    id: "dial",
    label: "calling…",
    tone: "dial",
    startSeconds: 0,
    lines: [],
    system: "Calling +91 98401 22841",
    hold: 950,
  },
  {
    id: "back",
    label: "mobile",
    tone: "live",
    startSeconds: 0,
    clips: [
      {
        who: "agent",
        text: "Sorry Priya, the call dropped — looks like a network issue on your side. I’m continuing from where we left. Shall I send the IL-28491 payment link on WhatsApp?",
        audio: "/audio/redial/en-back-01-agent.mp3?v=2",
      },
      {
        who: "caller",
        text: "Can you speak in Malayalam, ma’am?",
        audio: "/audio/redial/en-back-02-caller.mp3?v=2",
      },
      {
        who: "agent",
        text: "ശരി Priya, network issue ആയതുകൊണ്ടാണ് call cut ആയത്. ഞാൻ അവിടെ നിന്ന് തന്നെ continue ചെയ്യാം. IL-28491-ന്റെ payment link WhatsApp-il അയച്ചു തരട്ടെ?",
        audio: "/audio/redial/en-back-03-agent-ml.mp3?v=2",
      },
      {
        who: "caller",
        text: "ആ, അയച്ചോ. ആദ്യം മുതൽ ഒന്നും വീണ്ടും ചോദിക്കല്ല.",
        audio: "/audio/redial/en-back-04-caller-ml.mp3?v=2",
      },
    ],
  },
];

const CLIP_FALLBACK_MS = 2200;

function clipReadingTime(text = "") {
  return Math.max(CLIP_FALLBACK_MS, text.trim().split(/\s+/).length * 320);
}

function formatCallClock(total) {
  const safe = Math.max(0, Math.floor(total));
  const m = String(Math.floor(safe / 60)).padStart(2, "0");
  const s = String(safe % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function phaseLines(phase) {
  if (phase.clips) return phase.clips;
  return phase.lines || [];
}

export default function SmartReconnect() {
  const rootRef = useRef(null);
  const audioRef = useRef(null);
  const holdRef = useRef(null);
  const phaseRef = useRef(0);
  const clipRef = useRef(0);
  const reduce = useReducedMotion();
  const inView = useInView(rootRef, { amount: 0.4 });

  const [phase, setPhase] = useState(0);
  const [clipIdx, setClipIdx] = useState(0);
  const [elapsed, setElapsed] = useState(PHASES[0].startSeconds);
  const current = PHASES[phase];
  const lines = phaseLines(current);
  const activeClip = current.clips?.[clipIdx];
  const activeClipRef = useRef(activeClip);

  useEffect(() => {
    phaseRef.current = phase;
    clipRef.current = clipIdx;
    activeClipRef.current = activeClip;
  }, [phase, clipIdx, activeClip]);

  const clearHold = () => {
    if (holdRef.current) {
      clearTimeout(holdRef.current);
      holdRef.current = null;
    }
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
  };

  const advance = useCallback(() => {
    const p = phaseRef.current;
    const c = clipRef.current;
    const step = PHASES[p];

    if (step.clips && c < step.clips.length - 1) {
      setClipIdx(c + 1);
      return;
    }

    setClipIdx(0);
    setPhase((i) => (i + 1) % PHASES.length);
  }, []);

  const scheduleAdvance = useCallback((ms) => {
    clearHold();
    holdRef.current = setTimeout(advance, ms);
  }, [advance]);

  const playClip = useCallback(async (src) => {
    const audio = audioRef.current;
    if (!audio || !src) return false;

    if (audio.dataset.src !== src) {
      audio.src = src;
      audio.dataset.src = src;
      audio.load();
    } else {
      audio.currentTime = 0;
    }

    audio.volume = 1;
    try {
      await audio.play();
      return true;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    if (reduce) return undefined;

    if (!inView) {
      pauseAudio();
      clearHold();
      return undefined;
    }

    const audio = audioRef.current;
    clearHold();

    if (current.hold) {
      pauseAudio();
      scheduleAdvance(current.hold);
      return () => clearHold();
    }

    const src = activeClip?.audio;
    if (!src) {
      scheduleAdvance(CLIP_FALLBACK_MS);
      return () => clearHold();
    }

    const onEnded = () => {
      clearHold();
      advance();
    };

    audio?.addEventListener("ended", onEnded);

    // Sound is on by default. If the browser blocks autoplay, the captions keep
    // pacing silently until a gesture unlocks playback.
    void playClip(src).then((ok) => {
      if (ok) markAudioUnlocked();
      else scheduleAdvance(clipReadingTime(activeClip?.text));
    });

    return () => {
      audio?.removeEventListener("ended", onEnded);
      clearHold();
    };
  }, [phase, clipIdx, inView, reduce, current.hold, activeClip?.audio, activeClip?.text, advance, playClip, scheduleAdvance]);

  // While the demo is on screen, the first gesture anywhere turns the voice on.
  useEffect(() => {
    if (reduce || !inView) return undefined;

    const onGesture = () => {
      markAudioUnlocked();
      const src = activeClipRef.current?.audio;
      const audio = audioRef.current;
      if (!src || !audio) return;
      if (!audio.paused && audio.dataset.src === src) return;
      void playClip(src).then((ok) => {
        if (ok) clearHold();
      });
    };

    const events = ["pointerdown", "touchstart", "keydown"];
    events.forEach((e) =>
      window.addEventListener(e, onGesture, { capture: true, passive: true }),
    );
    return () =>
      events.forEach((e) =>
        window.removeEventListener(e, onGesture, { capture: true }),
      );
  }, [inView, reduce, playClip]);

  // Warm the first clip once the section approaches, so audio starts promptly.
  useEffect(() => {
    if (!inView || reduce) return;
    const audio = audioRef.current;
    if (audio) audio.preload = "auto";
  }, [inView, reduce]);

  useEffect(() => {
    if (typeof current.startSeconds !== "number") return;
    const start = current.startSeconds;
    queueMicrotask(() => setElapsed(start));
  }, [phase, current.startSeconds]);

  useEffect(() => {
    if (reduce || !inView || current.tone !== "live") return undefined;
    const id = window.setInterval(() => {
      setElapsed((n) => n + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase, inView, reduce, current.tone]);

  useEffect(() => () => clearHold(), []);

  return (
    <div ref={rootRef} className="relative overflow-hidden bg-surface-0">
      <audio ref={audioRef} preload="none" playsInline />

      <div className="relative mx-auto flex max-w-[21.5rem] justify-center">
        <div
          className="phone-redial"
          aria-label="Phone call with auto-redial after disconnect"
        >
          <div className="phone-redial-status">
            <span>Jio</span>
            <span className="phone-redial-clock">7:41 PM</span>
            <span>5G</span>
          </div>

          <div className="phone-redial-head">
            <p className="phone-redial-label">{current.label}</p>
            <h3 className="phone-redial-name">Priya Nayar</h3>
            <p className="phone-redial-meta">+91 98401 22841</p>
            <p
              className={`phone-redial-timer phone-redial-timer--${current.tone}`}
            >
              {formatCallClock(elapsed)}
            </p>
          </div>

          <div className="phone-redial-body">
            {current.system ? (
              <p
                className={`phone-redial-system phone-redial-system--${current.tone}`}
              >
                {current.system}
              </p>
            ) : null}

            {lines.map((line, i) => {
              const isActive = current.clips && i === clipIdx;
              const isPast = current.clips && i < clipIdx;
              if (current.clips && !isActive && !isPast) return null;

              return (
                <div
                  key={`${current.id}-${i}`}
                  className={`phone-redial-line phone-redial-line--${line.who}${
                    isActive ? " phone-redial-line--active" : ""
                  }`}
                >
                  <p>
                    {line.text}
                    {current.cut &&
                    i === lines.length - 1 &&
                    isActive ? (
                      <span className="phone-redial-cut" aria-hidden="true" />
                    ) : null}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="phone-redial-controls">
            {current.tone === "dial" ? (
              <div className="phone-redial-end phone-redial-end--dial" aria-hidden="true">
                <Phone className="h-5 w-5" strokeWidth={1.8} />
              </div>
            ) : (
              <div
                className={`phone-redial-end${
                  current.tone === "drop" ? " phone-redial-end--dead" : ""
                }`}
                aria-hidden="true"
              >
                <PhoneOff className="h-5 w-5" strokeWidth={1.8} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
