import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import DynamicIslandWave from "./DynamicIslandWave";
import { SCRIPT_FONTS } from "../../data/indianScriptGlyphs";

const VOICES = [
  {
    id: "tamil",
    name: "Aditi",
    language: "Tamil",
    accent: "Chennai",
    char: "அ",
    script: "tamil",
    useCase: "Real estate · site visit",
    script_text:
      "சரி ராஜேஷ், East Coast Road-ல இருக்க 4BHK penthouse-க்கு Saturday 9:40 AM slot lock பண்ணிட்டேன். Gate pass WhatsApp-ல வந்துரும்.",
    translation:
      "Alright Rajesh, I’ve locked Saturday 9:40 AM for the 4BHK penthouse on East Coast Road. Your gate pass will arrive on WhatsApp.",
    audio: "/audio/voices/aditi-tamil.mp3",
    duration: 12.2,
    latency: "312 ms",
  },
  {
    id: "hindi",
    name: "Dev",
    language: "Hindi",
    accent: "Delhi",
    char: "अ",
    script: "devanagari",
    useCase: "Lending · EMI reminder",
    script_text:
      "राहुल जी, आपका personal loan limit ₹4.8 लाख तक बढ़ गया है। 11.9% पर 36 महीने की EMI ₹15,910 बनेगी — लिंक अभी SMS पर है।",
    translation:
      "Rahul ji, your personal-loan limit is now ₹4.8 lakh. At 11.9% for 36 months the EMI is ₹15,910 — the link is on SMS now.",
    audio: "/audio/voices/dev-hindi.mp3",
    duration: 15.3,
    latency: "298 ms",
  },
  {
    id: "telugu",
    name: "Kavya",
    language: "Telugu",
    accent: "Hyderabad",
    char: "అ",
    script: "telugu",
    useCase: "Healthcare · appointment",
    script_text:
      "సునీత గారు, రేపు ఉదయం 8:15కి Dr. Meenakshi slot confirm చేశాను. వివరాలు WhatsAppలో పంపాను.",
    translation:
      "Sunitha, I’ve confirmed Dr. Meenakshi’s slot for tomorrow at 8:15 AM. I’ve sent the details on WhatsApp.",
    audio: "/audio/voices/kavya-telugu.mp3",
    duration: 7.3,
    latency: "324 ms",
  },
  {
    id: "malayalam",
    name: "Arya",
    language: "Malayalam",
    accent: "Kochi",
    char: "അ",
    script: "malayalam",
    useCase: "Insurance · renewal",
    script_text:
      "അനീഷ്, നിങ്ങളുടെ car policy-യിൽ NCB 45% hold ചെയ്തിട്ടുണ്ട്. ₹18,240-ൽ renew ചെയ്യാം — UPI request ഇപ്പോൾ അയച്ചു.",
    translation:
      "Aneesh, we’ve held 45% NCB on your car policy. You can renew at ₹18,240 — the UPI request is sent.",
    audio: "/audio/voices/arya-malayalam.mp3",
    duration: 10.2,
    latency: "331 ms",
  },
  {
    id: "kannada",
    name: "Chetan",
    language: "Kannada",
    accent: "Bengaluru",
    char: "ಅ",
    script: "kannada",
    useCase: "D2C · COD confirmation",
    script_text:
      "ಮಂಜುನಾಥ್, ನಿಮ್ಮ ಆರ್ಡರ್ ನಾಳೆ ಬರುತ್ತೆ. Rider ಬಂದಾಗ QR ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.",
    translation:
      "Manjunath, your order arrives tomorrow. Scan the QR when the rider comes.",
    audio: "/audio/voices/chetan-kannada.mp3",
    duration: 5.7,
    latency: "305 ms",
  },
  {
    id: "bengali",
    name: "Ananya",
    language: "Bengali",
    accent: "Kolkata",
    char: "অ",
    script: "bengali",
    useCase: "EdTech · counselling",
    script_text:
      "ঋতু, NEET crash batch-এর last seat আজ রাত 9টায় বন্ধ। Scholarship code KOL-19 apply করে Zoom link পাঠিয়েছি।",
    translation:
      "Ritu, the last NEET crash-batch seat closes tonight at 9. I’ve applied scholarship code KOL-19 and sent the Zoom link.",
    audio: "/audio/voices/ananya-bengali.mp3",
    duration: 8.5,
    latency: "342 ms",
  },
];

function formatTime(seconds) {
  const total = Math.max(0, Math.floor(seconds || 0));
  const m = Math.floor(total / 60);
  return `${m}:${String(total % 60).padStart(2, "0")}`;
}

export default function IndicAcousticShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  // Starts paused: browsers block autoplay with sound, so the play button leads.
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(VOICES[0].duration);
  const frameRef = useRef(null);
  const audioRef = useRef(null);

  const voice = VOICES[activeIdx];
  const progress = Math.min(1, duration ? elapsed / duration : 0);

  const goTo = useCallback((idx) => {
    setActiveIdx(idx);
    setElapsed(0);
    setDuration(VOICES[idx].duration);
  }, []);

  const advance = useCallback(() => {
    goTo((activeIdx + 1) % VOICES.length);
  }, [activeIdx, goTo]);

  // Voices with a recording drive the clock from the audio element itself.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !voice.audio) return undefined;

    audio.src = voice.audio;
    audio.load();
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    }
    return () => audio.pause();
    // Reload only when the selected voice changes, not on every play toggle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !voice.audio) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, voice.audio]);

  // Voices still awaiting a recording fall back to a simulated playhead.
  useEffect(() => {
    if (!playing || voice.audio) return undefined;

    let last = performance.now();
    const tick = (now) => {
      const delta = (now - last) / 1000;
      last = now;
      setElapsed((prev) => {
        if (prev + delta >= voice.duration) {
          advance();
          return 0;
        }
        return prev + delta;
      });
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [playing, voice.audio, voice.duration, advance]);

  const selectVoice = useCallback(
    (idx) => {
      goTo(idx);
      setPlaying(true);
    },
    [goTo],
  );

  return (
    <div className="voice-studio relative overflow-hidden rounded-2xl border border-line bg-surface-0">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[#14B8A6]/[0.07] blur-3xl"
        aria-hidden="true"
      />

      <audio
        ref={audioRef}
        preload="none"
        onTimeUpdate={(e) => setElapsed(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={advance}
      />

      <div className="relative z-[2]">
        <div className="border-b border-line px-5 py-4 md:px-8">
          <p className="text-[13.5px] tracking-[-0.014em] text-ink-2">
            Pick a voice. Hear the script read back.
          </p>
        </div>

        <div className="px-5 py-8 md:px-8 md:py-10">
          <p className="label text-ink-3">{voice.useCase}</p>

          <p
            key={voice.id}
            className="mt-4 text-[21px] leading-[1.6] tracking-[-0.01em] text-ink md:text-[26px] md:leading-[1.55]"
            style={{ fontFamily: SCRIPT_FONTS[voice.script] }}
          >
            {voice.script_text}
          </p>

          <p className="mt-4 max-w-2xl text-[14px] leading-[1.65] text-ink-3">
            {voice.translation}
          </p>
        </div>

        <div className="flex items-center gap-4 border-t border-line px-5 py-4 md:gap-6 md:px-8">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#14B8A6] text-black transition-transform hover:scale-105 active:scale-95"
            aria-label={playing ? `Pause ${voice.name}` : `Play ${voice.name}`}
          >
            {playing ? (
              <Pause className="h-4 w-4 fill-current" />
            ) : (
              <Play className="ml-0.5 h-4 w-4 fill-current" />
            )}
          </button>

          <DynamicIslandWave
            playing={playing}
            progress={progress}
            className="flex-1"
          />

          <span className="shrink-0 font-mono text-[12px] text-ink-3">
            {formatTime(elapsed)} / {formatTime(duration)}
          </span>
        </div>

        <div className="border-t border-line px-5 py-4 md:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {VOICES.map((item, idx) => {
              const selected = idx === activeIdx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectVoice(idx)}
                  aria-pressed={selected}
                  className={`flex shrink-0 cursor-pointer items-center gap-2.5 rounded-full border px-3.5 py-2 text-left transition-colors ${
                    selected
                      ? "border-[#14B8A6]/50 bg-[#14B8A6]/10"
                      : "border-line bg-surface-1 hover:border-line-strong"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[13px] leading-none ${
                      selected ? "bg-[#14B8A6] text-black" : "bg-surface-2 text-ink-2"
                    }`}
                    style={{ fontFamily: SCRIPT_FONTS[item.script] }}
                    aria-hidden="true"
                  >
                    {item.char}
                  </span>
                  <span className="text-[13px] leading-tight tracking-[-0.012em] text-ink">
                    {item.name}
                    <span className="ml-1.5 text-ink-3">{item.language}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-line px-5 py-3.5 text-[12px] text-ink-3 md:px-8">
          <span className="font-mono text-ink-2">{voice.latency} first audio</span>
          <span>24 kHz streaming</span>
          <span>11 Indian languages</span>
          <span className="hidden sm:inline">Hinglish and Tanglish code-mixing</span>
        </div>
      </div>
    </div>
  );
}
