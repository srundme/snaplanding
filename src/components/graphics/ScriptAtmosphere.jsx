import TempleSkyline from "./TempleSkyline";
import { FloatingScripts } from "./SectionScripts";
import { SECTION_SCRIPT_PLACEMENTS } from "../../data/sectionScriptPlacements";

/**
 * Chennai-style atmosphere — scattered script letters + optional line skyline.
 * @param {keyof typeof SECTION_SCRIPT_PLACEMENTS} section
 * @param {"default" | "compact" | "hero"} variant
 * @param {boolean} skyline — vertical temple line art at bottom (default on)
 */
export default function ScriptAtmosphere({
  section,
  variant = "default",
  skyline = true,
}) {
  const placements = SECTION_SCRIPT_PLACEMENTS[section];
  if (!placements?.length) return null;

  return (
    <div
      className={`script-atmosphere script-atmosphere--${variant}${skyline ? "" : " script-atmosphere--no-skyline"}`}
      aria-hidden="true"
    >
      <FloatingScripts placements={placements} />
      {skyline ? <TempleSkyline /> : null}
    </div>
  );
}
