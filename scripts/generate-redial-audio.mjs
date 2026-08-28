/**
 * Generate multilingual auto-redial call recordings via Edge TTS.
 * Run: node scripts/generate-redial-audio.mjs
 */
import { mkdir, writeFile, unlink } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { EdgeTTS } from "node-edge-tts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "audio", "redial");

const LANGS = {
  en: {
    agentVoice: "en-IN-NeerjaNeural",
    callerVoice: "en-IN-PrabhatNeural",
    live: {
      agent:
        "Priya ji, I L 28491 renews on 15th March. Shall I send the payment link?",
      caller:
        "Haan send it… signal is bad here, if we disconnect then call ba—",
    },
    back: {
      agent:
        "Sorry Priya ji — line dropped. Continuing, I’m sending the I L 28491 payment link now.",
      caller: "Ok ok, send. Don’t start from first again.",
    },
  },
  hi: {
    agentVoice: "hi-IN-SwaraNeural",
    callerVoice: "hi-IN-MadhurNeural",
    live: {
      agent:
        "Priya ji, I L 28491 पंद्रह मार्च को रिन्यू होता है। पेमेंट लिंक भेज दूँ?",
      caller:
        "हाँ भेज दो… यहाँ सिग्नल खराब है, कट हो गया तो कॉल बा—",
    },
    back: {
      agent:
        "सॉरी Priya ji — लाइन कट हो गई थी। कंटिन्यू करते हैं, I L 28491 का पेमेंट लिंक भेज रही हूँ।",
      caller: "हाँ भेजो। पहले से मत शुरू करना।",
    },
  },
  ta: {
    agentVoice: "ta-IN-PallaviNeural",
    callerVoice: "ta-IN-ValluvarNeural",
    live: {
      agent:
        "Priya ji, I L 28491 March 15 renew ஆகும். Payment link அனுப்பட்டுமா?",
      caller:
        "அனுப்புங்க… சிக்னல் ரொம்ப போர் ஆ இருக்கு, கட் ஆனா கால் பா—",
    },
    back: {
      agent:
        "சாரி Priya ji — லைன் கட் ஆயிடுச்சு. Continue பண்றோம், I L 28491 payment link அனுப்புறேன்.",
      caller: "சரி அனுப்புங்க. முதல்ல இருந்து ஆரம்பிக்காதீங்க.",
    },
  },
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function synth(text, voice, dest) {
  const tts = new EdgeTTS({
    voice,
    outputFormat: "audio-24khz-48kbitrate-mono-mp3",
    timeout: 30000,
  });
  await tts.ttsPromise(text, dest);
}

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const child = spawn("ffmpeg", args, { stdio: "inherit" });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited ${code}`));
    });
  });
}

async function concatMp3(parts, dest) {
  const listPath = `${dest}.txt`;
  const body = parts.map((p) => `file '${p.replace(/\\/g, "/")}'`).join("\n");
  await writeFile(listPath, body, "utf8");
  await runFfmpeg([
    "-y",
    "-f",
    "concat",
    "-safe",
    "0",
    "-i",
    listPath,
    "-c",
    "copy",
    dest,
  ]);
  await unlink(listPath).catch(() => {});
}

async function makeSilence(dest, seconds = 0.45) {
  await runFfmpeg([
    "-y",
    "-f",
    "lavfi",
    "-i",
    "anullsrc=r=24000:cl=mono",
    "-t",
    String(seconds),
    "-c:a",
    "libmp3lame",
    "-b:a",
    "48k",
    dest,
  ]);
}

async function buildPhase(lang, phase, lines, voices) {
  const a = join(OUT, `_tmp-${lang}-${phase}-agent.mp3`);
  const gap = join(OUT, `_tmp-${lang}-${phase}-gap.mp3`);
  const c = join(OUT, `_tmp-${lang}-${phase}-caller.mp3`);
  const out = join(OUT, `${lang}-${phase}.mp3`);

  console.log(`  ${lang}/${phase}…`);
  await synth(lines.agent, voices.agentVoice, a);
  await sleep(400);
  await makeSilence(gap, 0.55);
  await synth(lines.caller, voices.callerVoice, c);
  await concatMp3([a, gap, c], out);
  await Promise.all([unlink(a), unlink(gap), unlink(c)].map((p) => p.catch(() => {})));
}

async function main() {
  await mkdir(OUT, { recursive: true });
  for (const [lang, cfg] of Object.entries(LANGS)) {
    console.log(`Language: ${lang}`);
    await buildPhase(lang, "live", cfg.live, cfg);
    await sleep(500);
    await buildPhase(lang, "back", cfg.back, cfg);
    await sleep(500);
  }
  console.log("Done → public/audio/redial/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
