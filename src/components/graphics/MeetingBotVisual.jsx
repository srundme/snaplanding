import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  isMeetingAudioUnlocked,
  markMeetingAudioUnlocked,
  whenMeetingAudioUnlocked,
} from "../../lib/meetingAudioUnlock";
import MacBookMeetFrame from "./MacBookMeetFrame";
import {
  MeetCamIcon,
  MeetCaptionsIcon,
  MeetChatIcon,
  MeetChevronIcon,
  MeetEndCallIcon,
  MeetHandIcon,
  MeetMicIcon,
  MeetMoreIcon,
  MeetPeopleIcon,
  MeetPinIcon,
  MeetPresentIcon,
  MeetVolumeIcon,
} from "./MeetIcons";

const MEETING_CLOCK = "12:45 PM";

const PARTICIPANTS = [
  { initials: "SS", name: "SnapServe AI", agent: true, avatarBg: "#0b8043" },
  { initials: "PS", name: "Priya S.", avatarBg: "#1a73e8" },
  { initials: "SH", name: "Shiva", you: true, avatarBg: "#e8710a" },
  { initials: "AK", name: "Anita K.", avatarBg: "#9334e6" },
];

const STAGES = [
  { id: "present", slide: "pricing", speaker: "SS" },
  { id: "speak", slide: "changes", speaker: "SS" },
  { id: "question", slide: "changes", speaker: "SH" },
  { id: "answer", slide: "changes", speaker: "SS" },
  { id: "notes", slide: "next", speaker: null },
];

const CAPTIONS = {
  present: { who: "SnapServe AI", text: "Walking through the 2026 renewal proposal now." },
  speak: { who: "SnapServe AI", text: "Enterprise plan at ₹75L — an 8% increase, support unchanged." },
  question: { who: "Shiva", text: "This slide shows the revised enterprise pricing for the 2026 renewal." },
  answer: { who: "SnapServe AI", text: "I've captured the action item. Follow-up is scheduled for Friday." },
  notes: { who: "SnapServe AI", text: "I've captured the action item. Follow-up is scheduled for Friday." },
};

const SLIDES = {
  pricing: {
    kicker: "Q3 Enterprise",
    title: "2026 Renewal Proposal",
    rows: [
      ["Plan", "Enterprise"],
      ["Price", "₹75L"],
      ["Change", "+8%"],
    ],
  },
  changes: {
    kicker: "What changed",
    title: "2026 renewal",
    rows: [
      ["Renewal adjustment", "+8%"],
      ["Enterprise support", "Unchanged"],
      ["Delivery", "Friday"],
    ],
  },
  next: {
    kicker: "Next steps",
    title: "Follow-up",
    rows: [
      ["Action", "Share revised proposal"],
      ["Owner", "Priya S."],
      ["Due", "Friday"],
    ],
  },
};

const VOICE_TRACKS = {
  present: import.meta.env.VITE_MEETING_VOICE_PRESENT_URL || "/audio/ai-present.mp3",
  speak: import.meta.env.VITE_MEETING_VOICE_SPEAK_URL || "/audio/ai-speak.mp3",
  question: import.meta.env.VITE_MEETING_VOICE_QUESTION_URL || "/audio/shiva-question.mp3",
  answer: import.meta.env.VITE_MEETING_VOICE_ANSWER_URL || "/audio/ai-answer.mp3",
  notes: import.meta.env.VITE_MEETING_VOICE_NOTES_URL || "/audio/ai-notes.mp3",
};

const STAGE_HOLD_MS = {
  present: 2400,
  speak: 4200,
  question: 2600,
  answer: 4800,
  notes: 3600,
};

const CAPTION_STAGES = new Set(["present", "speak", "question", "answer", "notes"]);
const AUDIO_SESSION_KEY = "snapserve_meeting_voice";
const EASE = [0.22, 1, 0.36, 1];

function PersonSilhouette() {
  return (
    <svg className="meet-tile-sil" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 12c2.7 0 4.8-2.2 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
  );
}

function VoiceWave({ running }) {
  return (
    <span className="meet-wave" data-on={running} aria-hidden="true">
      <span /><span /><span /><span />
    </span>
  );
}

function PresentationSlide({ slideKey }) {
  const slide = SLIDES[slideKey] || SLIDES.pricing;
  return (
    <div className="meet-deck">
      <div className="meet-deck-body">
        <p>{slide.kicker}</p>
        <h3>{slide.title}</h3>
        <dl className="meet-deck-fields">
          {slide.rows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function ParticipantTile({ participant, stage, waveRunning, reduce }) {
  const speaking = stage.speaker === participant.initials;
  const presenting = Boolean(participant.agent);
  const muted = participant.agent
    ? false
    : !(participant.initials === "SH" && stage.id === "question");

  return (
    <div
      className="meet-tile"
      data-speaking={speaking || undefined}
      data-presenting={presenting || undefined}
    >
      <button type="button" className="meet-tile-pin" tabIndex={-1} aria-hidden="true">
        <MeetPinIcon size={14} />
      </button>

      {presenting && <span className="meet-tile-badge">Presenting</span>}

      {presenting ? (
        <div className="meet-tile-share">
          <AnimatePresence initial={false}>
            <motion.div
              key={stage.slide}
              className="meet-tile-share-frame"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.18, ease: EASE }}
            >
              <PresentationSlide slideKey={stage.slide} />
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div className="meet-tile-feed">
          <span className="meet-tile-avatar-wrap" data-speaking={speaking || undefined}>
            <span className="meet-tile-avatar" style={{ background: participant.avatarBg }}>
              {participant.initials === "AK" ? participant.initials : <PersonSilhouette />}
            </span>
          </span>
        </div>
      )}

      <span className="meet-tile-label">
        {participant.you ? `${participant.name} (You)` : participant.name}
      </span>

      <span className="meet-tile-mic" data-muted={muted}>
        {speaking && waveRunning ? (
          <VoiceWave running={waveRunning} />
        ) : (
          <MeetMicIcon off={muted} size={13} />
        )}
      </span>
    </div>
  );
}

function MeetGrid({ stage, waveRunning, reduce }) {
  return (
    <div className="meet-grid">
      {PARTICIPANTS.map((participant) => (
        <ParticipantTile
          key={participant.initials}
          participant={participant}
          stage={stage}
          waveRunning={waveRunning}
          reduce={reduce}
        />
      ))}
    </div>
  );
}

function MeetToolbar({ stage, voiceOn, audioAvailable, onToggleVoice }) {
  const micOn = stage.id === "question";
  const camOn = false;
  const captionsOn = CAPTION_STAGES.has(stage.id);

  return (
    <footer className="meet-toolbar">
      <div className="meet-toolbar-left">
        <span className="meet-toolbar-time num">{MEETING_CLOCK}</span>
        <span className="meet-toolbar-code num">kdx-mfvz-qta</span>
      </div>

      <div className="meet-toolbar-center">
        <div className="meet-ctl-group" data-off={!micOn}>
          <button type="button" className="meet-ctl meet-ctl-main" tabIndex={-1} aria-label="Microphone">
            <MeetMicIcon off={!micOn} size={20} />
          </button>
          <button type="button" className="meet-ctl meet-ctl-chevron" tabIndex={-1}>
            <MeetChevronIcon />
          </button>
        </div>
        <div className="meet-ctl-group" data-off={!camOn}>
          <button type="button" className="meet-ctl meet-ctl-main" tabIndex={-1} aria-label="Camera">
            <MeetCamIcon off={!camOn} size={20} />
          </button>
          <button type="button" className="meet-ctl meet-ctl-chevron" tabIndex={-1}>
            <MeetChevronIcon />
          </button>
        </div>
        <button type="button" className="meet-ctl" data-active={captionsOn} tabIndex={-1} aria-label="Captions">
          <MeetCaptionsIcon size={20} />
        </button>
        <button type="button" className="meet-ctl meet-ctl--optional" tabIndex={-1} aria-label="Raise hand">
          <MeetHandIcon size={20} />
        </button>
        <button type="button" className="meet-ctl" tabIndex={-1} aria-label="Present">
          <MeetPresentIcon size={20} />
        </button>
        <button type="button" className="meet-ctl" tabIndex={-1} aria-label="More">
          <MeetMoreIcon size={20} />
        </button>
        <button type="button" className="meet-ctl meet-ctl--end" tabIndex={-1} aria-label="Leave">
          <MeetEndCallIcon size={20} />
        </button>
      </div>

      <div className="meet-toolbar-right">
        <button type="button" className="meet-ctl meet-ctl--aux" tabIndex={-1}>
          <MeetPeopleIcon size={20} />
          <span className="meet-ctl-count">4</span>
        </button>
        <button type="button" className="meet-ctl meet-ctl--aux" tabIndex={-1}>
          <MeetChatIcon size={20} />
        </button>
        <button
          type="button"
          className="meet-ctl meet-ctl--aux meet-ctl--sound"
          onClick={onToggleVoice}
          disabled={!audioAvailable}
          data-on={voiceOn && audioAvailable}
          aria-label={voiceOn ? "Mute demo" : "Unmute demo"}
        >
          <MeetVolumeIcon off={!(voiceOn && audioAvailable)} size={20} />
        </button>
      </div>
    </footer>
  );
}

function MeetApp({ stage, reduce, voiceOn, audioAvailable, onToggleVoice, waveRunning }) {
  const caption = CAPTIONS[stage.id];

  return (
    <div className="meet-app" data-meeting-state={stage.id}>
      <div className="meet-main">
        <div className="meet-room">
          <div className="meet-rec"><span /> REC</div>
          <div className="meet-present-chip">
            <MeetPresentIcon size={14} />
            <span>SnapServe AI is presenting to everyone</span>
          </div>

          <MeetGrid stage={stage} waveRunning={waveRunning} reduce={reduce} />

          {CAPTION_STAGES.has(stage.id) && (
            <div className="meet-overlay">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={stage.id}
                  className="meet-caption"
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.16, ease: EASE }}
                >
                  <strong>{caption.who}</strong>
                  <p>{caption.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      <MeetToolbar
        stage={stage}
        voiceOn={voiceOn}
        audioAvailable={audioAvailable}
        onToggleVoice={onToggleVoice}
      />
    </div>
  );
}

export default function MeetingBotVisual({ sectionInView = false }) {
  const storyRef = useRef(null);
  const audioRef = useRef(null);
  const holdTimerRef = useRef(null);
  const activeRef = useRef(0);
  const wasInViewRef = useRef(false);
  const inViewRef = useRef(false);
  const voiceOnRef = useRef(true);
  const sequenceDoneRef = useRef(false);
  const stageIdRef = useRef(STAGES[0].id);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [sequenceDone, setSequenceDone] = useState(false);
  const [playKick, setPlayKick] = useState(0);
  const [readyTracks] = useState(() => ({ ...VOICE_TRACKS }));
  const [voiceOn, setVoiceOn] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return JSON.parse(sessionStorage.getItem(AUDIO_SESSION_KEY) || "{}").enabled !== false;
    } catch {
      return true;
    }
  });
  const visualInView = useInView(storyRef, {
    amount: 0.3,
    margin: "0px 0px -8% 0px",
  });
  const inView = sectionInView || visualInView;
  const activeStage = STAGES[active];
  const trackFor = (stageId) => readyTracks[stageId] || null;

  activeRef.current = active;
  inViewRef.current = inView;
  voiceOnRef.current = voiceOn;
  sequenceDoneRef.current = sequenceDone;
  stageIdRef.current = activeStage.id;

  const clearHold = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  const pauseAudio = () => {
    const audio = audioRef.current;
    if (audio && !audio.paused) audio.pause();
    setSpeaking(false);
  };

  const finishOrAdvance = () => {
    if (activeRef.current >= STAGES.length - 1) {
      setSpeaking(false);
      setSequenceDone(true);
      return;
    }
    setSpeaking(false);
    setActive((c) => c + 1);
  };

  const playStageAudio = async (stageId) => {
    const audio = audioRef.current;
    const source = trackFor(stageId);
    if (!audio || !source) return false;

    try {
      const absolute = new URL(source, window.location.href).href;
      if (audio.dataset.stage !== stageId || audio.src !== absolute) {
        audio.src = source;
        audio.dataset.stage = stageId;
      }
      if (audio.readyState >= 2) audio.currentTime = 0;
      audio.muted = false;
      audio.volume = 1;
      await audio.play();
      markMeetingAudioUnlocked();
      setSpeaking(true);
      return true;
    } catch {
      setSpeaking(false);
      return false;
    }
  };

  /** Sync play inside a real user-gesture stack (click / key / touch). */
  const playFromGesture = () => {
    markMeetingAudioUnlocked();
    if (
      reduce ||
      !inViewRef.current ||
      !voiceOnRef.current ||
      sequenceDoneRef.current
    ) {
      return;
    }
    const audio = audioRef.current;
    const stageId = stageIdRef.current;
    const source = VOICE_TRACKS[stageId];
    if (!audio || !source) return;
    if (!audio.paused && audio.dataset.stage === stageId && !audio.muted) return;

    if (audio.dataset.stage !== stageId) {
      audio.src = source;
      audio.dataset.stage = stageId;
    }
    audio.muted = false;
    audio.volume = 1;
    const p = audio.play();
    if (p) {
      p.then(() => {
        setSpeaking(true);
        // If we were frozen waiting for unlock, kick the stage runner
        setPlayKick((k) => k + 1);
      }).catch(() => {});
    }
  };

  const persistVoice = (enabled) => {
    try {
      sessionStorage.setItem(AUDIO_SESSION_KEY, JSON.stringify({ enabled }));
    } catch { /* noop */ }
  };

  const toggleVoice = () => {
    const next = !voiceOn;
    setVoiceOn(next);
    persistVoice(next);
    if (!next) {
      pauseAudio();
      return;
    }
    playFromGesture();
  };

  useEffect(() => {
    const audio = audioRef.current;
    const first = VOICE_TRACKS.present;
    if (!audio || !first) return;
    audio.src = first;
    audio.dataset.stage = "present";
    audio.preload = "auto";
    audio.load();
    Object.values(VOICE_TRACKS).forEach((url) => {
      if (!url || url === first) return;
      const warm = new Audio();
      warm.preload = "auto";
      warm.src = url;
    });
  }, []);

  // While Meeting Bot is on screen, any click/tap/key starts audible playback
  useEffect(() => {
    if (!inView) return undefined;
    const onGesture = () => playFromGesture();
    const events = ["pointerdown", "touchstart", "keydown"];
    events.forEach((e) =>
      window.addEventListener(e, onGesture, { capture: true, passive: true }),
    );
    return () =>
      events.forEach((e) =>
        window.removeEventListener(e, onGesture, { capture: true }),
      );
  }, [inView, reduce]);

  // If user already gestured earlier on the page, start as soon as unlocked
  useEffect(() => {
    if (!inView || reduce || !voiceOn) return undefined;
    return whenMeetingAudioUnlocked(() => {
      if (!inViewRef.current || sequenceDoneRef.current) return;
      void playStageAudio(stageIdRef.current).then((ok) => {
        if (ok) setPlayKick((k) => k + 1);
      });
    });
  }, [inView, reduce, voiceOn]);

  useEffect(() => {
    if (inView && !wasInViewRef.current) {
      wasInViewRef.current = true;
      clearHold();
      pauseAudio();
      setSequenceDone(false);
      setActive(0);
      setPlayKick((k) => k + 1);
      return;
    }
    if (!inView && wasInViewRef.current) {
      wasInViewRef.current = false;
      pauseAudio();
      clearHold();
      setSequenceDone(false);
      setActive(0);
    }
  }, [inView]);

  useEffect(() => {
    clearHold();
    if (!inView || sequenceDone) {
      pauseAudio();
      return undefined;
    }

    const stageId = activeStage.id;
    const holdMs = STAGE_HOLD_MS[stageId] ?? 3000;
    let cancelled = false;

    const run = async () => {
      if (reduce || !trackFor(stageId) || !voiceOn) {
        pauseAudio();
        holdTimerRef.current = setTimeout(() => {
          if (!cancelled) finishOrAdvance();
        }, reduce ? Math.min(holdMs, 1600) : holdMs);
        return;
      }

      const played = await playStageAudio(stageId);
      if (cancelled) return;

      if (played) {
        // Advance on audio `ended` — don't silent-skip ahead of the voice
        return;
      }

      // Autoplay blocked: FREEZE here until a gesture unlocks sound.
      // Do not advance on a timer — that was why scroll never "heard" anything.
      if (!isMeetingAudioUnlocked()) {
        return;
      }

      // Unlocked but play still failed (loading) — brief retry then hold
      holdTimerRef.current = setTimeout(() => {
        if (cancelled) return;
        void playStageAudio(stageId).then((ok) => {
          if (!ok && !cancelled) finishOrAdvance();
        });
      }, 400);
    };

    const raf = requestAnimationFrame(() => {
      void run();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearHold();
    };
  }, [active, inView, voiceOn, reduce, sequenceDone, activeStage.id, playKick]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    const onEnded = () => finishOrAdvance();
    const onPause = () => setSpeaking(false);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(
    () => () => {
      clearHold();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeAttribute("src");
        audioRef.current.load();
      }
    },
    [],
  );

  return (
    <div ref={storyRef} className="meet-story">
      <audio ref={audioRef} preload="auto" playsInline />
      <MacBookMeetFrame>
        <MeetApp
          stage={activeStage}
          reduce={reduce}
          voiceOn={voiceOn}
          audioAvailable={Object.keys(readyTracks).length > 0}
          onToggleVoice={toggleVoice}
          waveRunning={
            Boolean(activeStage.speaker) &&
            inView &&
            !reduce &&
            !sequenceDone &&
            (speaking || !trackFor(activeStage.id))
          }
        />
      </MacBookMeetFrame>
    </div>
  );
}

