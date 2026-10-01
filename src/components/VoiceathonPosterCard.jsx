import { Users, Mic, Trophy } from "lucide-react";
import SnapServeLogo from "./SnapServeLogo";

export default function VoiceathonPosterCard({ className = "" }) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[460px] overflow-hidden rounded-3xl border border-[#e4e4e7] bg-[#FAF9F6] p-7 text-[#18181b] shadow-2xl transition-all duration-300 hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)] ${className}`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Background Watermark Letters & Dots */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden opacity-[0.06]" aria-hidden="true">
        <span className="absolute left-6 top-24 font-serif text-5xl font-bold">அ</span>
        <span className="absolute right-8 top-32 font-serif text-6xl font-bold">ஆ</span>
        <span className="absolute left-10 bottom-36 font-serif text-5xl font-bold">இ</span>
        <span className="absolute right-12 bottom-28 font-serif text-6xl font-bold">க</span>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-8xl font-black">தமிழ்</span>
      </div>

      {/* Decorative Corner Soundwave Halftones */}
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-[radial-gradient(#f97316_1.5px,transparent_1.5px)] [background-size:8px_8px] opacity-25" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-[radial-gradient(#f97316_1.5px,transparent_1.5px)] [background-size:8px_8px] opacity-25" />

      {/* Top Header Row */}
      <div className="relative z-10 flex items-start justify-between border-b border-[#e4e4e7]/80 pb-4">
        {/* Powered by vobiz */}
        <div>
          <span className="block text-[9px] font-semibold uppercase tracking-wider text-[#71717a]">
            Powered by
          </span>
          <div className="mt-1 flex items-center gap-1.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 6L11 18L13 14L8 6H4Z" fill="#F97316" />
              <path d="M13 14L15 10L20 18H16L13 14Z" fill="#F97316" />
            </svg>
            <span className="font-extrabold text-[17px] tracking-tight text-[#09090b]">vobiz</span>
          </div>
        </div>

        {/* Organized by SnapServe */}
        <div className="text-center">
          <span className="block text-[9px] font-semibold uppercase tracking-wider text-[#71717a]">
            Organized by
          </span>
          <div className="mt-1 flex items-center justify-center">
            <SnapServeLogo variant="full" size="sm" theme="light" />
          </div>
        </div>

        {/* Chapter 01 */}
        <div className="text-right">
          <span className="inline-block rounded-md bg-[#f4f4f5] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#52525b]">
            Chapter 01: Chennai
          </span>
        </div>
      </div>

      {/* Center Event Typography */}
      <div className="relative z-10 my-7 text-center">
        {/* Acoustic Wave Wings */}
        <div className="flex items-center justify-center gap-3">
          <div className="hidden h-5 w-12 items-center justify-end gap-[3px] opacity-40 sm:flex" aria-hidden="true">
            <span className="h-2 w-[2px] rounded-full bg-[#f97316]" />
            <span className="h-3 w-[2px] rounded-full bg-[#f97316]" />
            <span className="h-5 w-[2px] rounded-full bg-[#f97316]" />
            <span className="h-4 w-[2px] rounded-full bg-[#f97316]" />
            <span className="h-2 w-[2px] rounded-full bg-[#f97316]" />
          </div>

          <h3 className="flex items-center justify-center text-[26px] font-black tracking-[-0.03em] text-[#09090b] sm:text-[32px]">
            <span>VOICE-</span>
            <span className="relative text-[#f97316] inline-block px-[1px]">
              A
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px] text-[#f97316]">▲</span>
            </span>
            <span>-THON</span>
            <span className="ml-1.5 flex flex-col text-[10px] font-extrabold leading-none text-[#f97316]">
              <span>20</span>
              <span>26</span>
            </span>
          </h3>

          <div className="hidden h-5 w-12 items-center justify-start gap-[3px] opacity-40 sm:flex" aria-hidden="true">
            <span className="h-2 w-[2px] rounded-full bg-[#f97316]" />
            <span className="h-4 w-[2px] rounded-full bg-[#f97316]" />
            <span className="h-5 w-[2px] rounded-full bg-[#f97316]" />
            <span className="h-3 w-[2px] rounded-full bg-[#f97316]" />
            <span className="h-2 w-[2px] rounded-full bg-[#f97316]" />
          </div>
        </div>

        <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#52525b]">
          Build the Voice of India
        </p>

        {/* Orange Capsule Badge */}
        <div className="mt-3.5 flex justify-center">
          <span className="inline-block rounded-full bg-[#f97316] px-5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-[0_4px_12px_rgba(249,115,22,0.3)]">
            Tamil Nadu Edition
          </span>
        </div>

        {/* Date & Location */}
        <div className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">
          Chennai · 05 September 2026
        </div>
      </div>

      {/* 3 Metric Columns */}
      <div className="relative z-10 grid grid-cols-3 divide-x divide-[#e4e4e7] border-y border-[#e4e4e7] py-4 text-center">
        {/* 50+ Teams */}
        <div className="px-2">
          <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-[#f4f4f5] text-[#18181b]">
            <Users className="h-4 w-4" />
          </div>
          <div className="mt-1.5 font-extrabold text-[17px] text-[#09090b]">50+</div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#71717a]">Teams</div>
        </div>

        {/* Live AI Agents */}
        <div className="px-2">
          <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-[#f97316]">
            <Mic className="h-4 w-4" />
          </div>
          <div className="mt-1.5 font-extrabold text-[17px] text-[#09090b]">LIVE AI</div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#71717a]">Agents</div>
        </div>

        {/* 1,00,000 Prize Pool */}
        <div className="px-2">
          <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <Trophy className="h-4 w-4" />
          </div>
          <div className="mt-1.5 font-extrabold text-[17px] text-[#09090b]">₹ 1,00,000</div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#71717a]">Prize Pool</div>
        </div>
      </div>

      {/* Partner Row */}
      <div className="relative z-10 mt-5 flex items-center justify-around text-center text-xs">
        {/* Ecosystem Partner */}
        <div>
          <span className="block text-[9px] font-medium uppercase tracking-wider text-[#71717a]">
            Ecosystem Partner
          </span>
          <div className="mt-1 flex items-center justify-center gap-1 font-extrabold text-[15px] text-[#09090b]">
            <span>Zen</span>
            <span className="text-[#f97316]">X</span>
            <span>ai</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-8 w-[1px] bg-[#e4e4e7]" />

        {/* Venue Partner */}
        <div>
          <span className="block text-[9px] font-medium uppercase tracking-wider text-[#71717a]">
            Venue Partner
          </span>
          <div className="mt-1 flex items-center justify-center gap-1.5 font-bold text-[13px] text-[#09090b]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-800 text-[10px] font-black text-amber-300">
              OPS
            </span>
            <span>Olive Public School</span>
          </div>
        </div>
      </div>

      {/* Footer Network Status */}
      <div className="relative z-10 mt-5 border-t border-[#e4e4e7]/80 pt-3 text-center">
        <div className="flex items-center justify-center gap-2 text-[9px] font-bold tracking-[0.2em] text-[#a1a1aa]">
          <span>·</span>
          <span>LIVE VOICE NETWORK</span>
          <span>·</span>
          <span className="text-[#14B8A6]">CONNECTED</span>
          <span>·</span>
        </div>
      </div>
    </div>
  );
}
