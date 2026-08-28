"""Generate multilingual auto-redial call recordings (EN / HI / TA)."""
from __future__ import annotations

import asyncio
import subprocess
import tempfile
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "audio" / "redial"

LANGS = {
    "en": {
        "agent_voice": "en-IN-NeerjaNeural",
        "caller_voice": "en-IN-PrabhatNeural",
        "live": {
            "agent": "Priya ji, I L 28491 renews on 15th March. Shall I send the payment link?",
            "caller": "Haan send it… signal is bad here, if we disconnect then call ba—",
        },
        "back": {
            "agent": "Sorry Priya ji — line dropped. Continuing, I’m sending the I L 28491 payment link now.",
            "caller": "Ok ok, send. Don’t start from first again.",
        },
    },
    "hi": {
        "agent_voice": "hi-IN-SwaraNeural",
        "caller_voice": "hi-IN-MadhurNeural",
        "live": {
            "agent": "Priya ji, I L 28491 पंद्रह मार्च को रिन्यू होता है। पेमेंट लिंक भेज दूँ?",
            "caller": "हाँ भेज दो… यहाँ सिग्नल खराब है, कट हो गया तो कॉल बा—",
        },
        "back": {
            "agent": "सॉरी Priya ji — लाइन कट हो गई थी। कंटिन्यू करते हैं, I L 28491 का पेमेंट लिंक भेज रही हूँ।",
            "caller": "हाँ भेजो। पहले से मत शुरू करना।",
        },
    },
    "ta": {
        "agent_voice": "ta-IN-PallaviNeural",
        "caller_voice": "ta-IN-ValluvarNeural",
        "live": {
            "agent": "Priya ji, I L 28491 March 15 renew ஆகும். Payment link அனுப்பட்டுமா?",
            "caller": "அனுப்புங்க… சிக்னல் ரொம்ப போர் ஆ இருக்கு, கட் ஆனா கால் பா—",
        },
        "back": {
            "agent": "சாரி Priya ji — லைன் கட் ஆயிடுச்சு. Continue பண்றோம், I L 28491 payment link அனுப்புறேன்.",
            "caller": "சரி அனுப்புங்க. முதல்ல இருந்து ஆரம்பிக்காதீங்க.",
        },
    },
}


async def synth(text: str, voice: str, dest: Path) -> None:
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(str(dest))


def silence(dest: Path, seconds: float = 0.55) -> None:
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "lavfi",
            "-i",
            "anullsrc=r=24000:cl=mono",
            "-t",
            str(seconds),
            "-c:a",
            "libmp3lame",
            "-b:a",
            "48k",
            str(dest),
        ],
        check=True,
        capture_output=True,
    )


def concat(parts: list[Path], dest: Path) -> None:
    list_file = dest.with_suffix(".txt")
    list_file.write_text(
        "\n".join(f"file '{p.as_posix()}'" for p in parts),
        encoding="utf-8",
    )
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(list_file),
            "-c",
            "copy",
            str(dest),
        ],
        check=True,
        capture_output=True,
    )
    list_file.unlink(missing_ok=True)


async def build_phase(lang: str, phase: str, lines: dict, voices: dict) -> None:
    out = OUT / f"{lang}-{phase}.mp3"
    print(f"  {lang}/{phase}…")
    with tempfile.TemporaryDirectory() as tmp:
        tdir = Path(tmp)
        agent = tdir / "agent.mp3"
        gap = tdir / "gap.mp3"
        caller = tdir / "caller.mp3"
        await synth(lines["agent"], voices["agent_voice"], agent)
        silence(gap)
        await synth(lines["caller"], voices["caller_voice"], caller)
        concat([agent, gap, caller], out)


async def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for lang, cfg in LANGS.items():
        print(f"Language: {lang}")
        await build_phase(lang, "live", cfg["live"], cfg)
        await build_phase(lang, "back", cfg["back"], cfg)
    print(f"Done → {OUT}")


if __name__ == "__main__":
    asyncio.run(main())
