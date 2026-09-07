import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";
import { PLATFORM_MARKS } from "../PlatformLogos";

function StackTile({ name, mark }) {
  const Mark = PLATFORM_MARKS[mark];
  if (!Mark) return null;

  return (
    <span className="int-stack-tile" data-stack-tile role="img" title={name} aria-label={name}>
      <Mark size={22} />
    </span>
  );
}

export default function IntegrationsStackBand({ marks }) {
  const bandRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const tiles = gsap.utils.toArray("[data-stack-tile]", gridRef.current);
      if (!tiles.length) return;

      const center = (tiles.length - 1) / 2;

      if (reduce) {
        gsap.set(tiles, { clearProps: "all", opacity: 1 });
        return;
      }

      tiles.forEach((tile, i) => {
        const dist = i - center;
        gsap.set(tile, {
          x: dist * 76,
          y: -Math.abs(dist) * 18,
          rotation: dist * 32,
          scale: 0.7,
          opacity: 0.45,
          transformOrigin: "50% 50%",
        });
      });

      gsap.to(tiles, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        ease: "none",
        stagger: { each: 0.04, from: "center" },
        scrollTrigger: {
          trigger: bandRef.current,
          start: "top 82%",
          end: "top 38%",
          scrub: 0.55,
        },
      });

      gsap.fromTo(
        bandRef.current,
        { boxShadow: "inset 0 0 0 rgba(20,184,166,0)" },
        {
          boxShadow: "inset 0 1px 0 rgba(20,184,166,0.12)",
          scrollTrigger: {
            trigger: bandRef.current,
            start: "top 75%",
            end: "top 40%",
            scrub: true,
          },
        },
      );
    },
    { scope: bandRef, dependencies: [marks] },
  );

  return (
    <div ref={bandRef} className="int-stack-band int-stack-band--motion">
      <p className="int-stack-kicker">Works with your stack</p>
      <div ref={gridRef} className="int-stack-grid int-stack-grid--motion">
        {marks.map((mark) => (
          <StackTile key={mark} name={mark} mark={mark} />
        ))}
      </div>
    </div>
  );
}
