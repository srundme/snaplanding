import { FEATURED_LANGUAGES, SCRIPT_FONTS } from "../../data/indianScriptGlyphs";
import { SECTION_SCRIPT_PLACEMENTS } from "../../data/sectionScriptPlacements";

function FloatingScripts({ placements = [] }) {
  if (!placements.length) return null;

  return (
    <div className="floating-scripts" aria-hidden="true">
      {placements.map((place) => {
        const lang = FEATURED_LANGUAGES.find((item) => item.id === place.langId);
        if (!lang) return null;

        return (
          <span
            key={`${place.langId}-${place.top ?? ""}-${place.left ?? ""}-${place.right ?? ""}`}
            className={`floating-script floating-script--${place.tone ?? "muted"}`}
            style={{
              top: place.top,
              left: place.left,
              right: place.right,
              bottom: place.bottom,
              fontSize: place.size,
              fontFamily: SCRIPT_FONTS[lang.script],
            }}
          >
            {lang.char}
          </span>
        );
      })}
    </div>
  );
}

/** Scatter script letters inside a section — letter only, varied positions. */
export default function SectionScripts({ section }) {
  const placements = SECTION_SCRIPT_PLACEMENTS[section];
  return <FloatingScripts placements={placements ?? []} />;
}

export { FloatingScripts };
