/*
  SnapServe house glyphs.

  Three construction rules keep the family coherent:
  - amplitude ticks: rounded bars of unequal height, always the voice
  - dial arcs / return curves: the call travelling
  - exactly one filled node per glyph, marking where the live call is

  Every glyph fills the same optical box — roughly 3 to 21 on both axes of a
  24 grid — so none reads small next to its neighbours. Stroke matches the
  1.6 the replaced icons used. Colour comes from currentColor so container
  hover states still drive them.
*/

function Glyph({ size = 16, className, children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

function Live({ cx, cy }) {
  return <circle cx={cx} cy={cy} r="1.35" fill="currentColor" stroke="none" />;
}

/** Meeting bot — a room screen with the agent speaking inside it. */
export function MeetingGlyph(props) {
  return (
    <Glyph {...props}>
      <rect x="2.6" y="5.4" width="13" height="13.2" rx="2.3" />
      <Live cx={5.4} cy={8.4} />
      <path d="M7.6 10v3.4M10.4 8v7.4M13.2 10.4v2.6" />
      <path d="M15.6 9.8 21 6.6v10.8l-5.4-3.2" />
    </Glyph>
  );
}

/** Caller memory — the earlier conversation, then this one picking it up. */
export function MemoryGlyph(props) {
  return (
    <Glyph {...props}>
      <rect x="2.6" y="3.4" width="10.8" height="7.6" rx="2.3" />
      <path d="M5.6 6.2v1.8M7.6 5.3v3.6M9.6 6.4v1.4" />
      <path d="M6 11v2.4l2.6-2.4" />
      <rect x="10.6" y="13.4" width="10.8" height="7.6" rx="2.3" />
      <path d="M17.8 13.4V11l-2.8 2.4" />
      <path d="M13.4 16.3v1.8M18.8 16.3v1.8" />
      <Live cx={16.1} cy={17.2} />
    </Glyph>
  );
}

/** Facts on file — a folder holding the voice. */
export function ProfileGlyph(props) {
  return (
    <Glyph {...props}>
      <path d="M2.8 6.6a1.8 1.8 0 0 1 1.8-1.8h4L10.8 7h8.4a1.8 1.8 0 0 1 1.8 1.8v9.6a1.8 1.8 0 0 1-1.8 1.8H4.6a1.8 1.8 0 0 1-1.8-1.8z" />
      <path d="M7.8 11.4v4.4M11.2 9.4v8.4M18 11.4v4.4" />
      <Live cx={14.6} cy={13.6} />
    </Glyph>
  );
}

/** Loaded before greeting — context lands, then the ring goes out. */
export function PreloadGlyph(props) {
  return (
    <Glyph {...props}>
      <path d="M2.6 12h8.4" />
      <path d="M8.4 9.2 11.2 12l-2.8 2.8" />
      <Live cx={13.6} cy={12} />
      <path d="M16.4 6.4a7.6 7.6 0 0 1 0 11.2" />
      <path d="M19.2 3.8a11.6 11.6 0 0 1 0 16.4" />
    </Glyph>
  );
}

/** Auto-redial — the voice cuts, an arc bridges the gap, the voice resumes. */
export function RedialGlyph(props) {
  return (
    <Glyph {...props}>
      <path d="M3.2 10v4M6.2 7.6v8.8M9.2 9.4v5.2" />
      <path d="M9.9 7.3c1-2.8 3.2-2.8 4.2 0" />
      <Live cx={12} cy={12} />
      <path d="M14.8 9.4v5.2M17.8 7.6v8.8M20.8 10v4" />
    </Glyph>
  );
}

/** One layer — four providers collapsing into a single bus, then one call out. */
export function LayerGlyph(props) {
  return (
    <Glyph {...props}>
      <path d="M4.4 3.6V12M9.5 3.6V12M14.5 3.6V12M19.6 3.6V12" />
      <path d="M3.2 12h17.6" />
      <path d="M12 12v5.6" />
      <Live cx={12} cy={18.9} />
    </Glyph>
  );
}

/** Turn control — two speakers, the turn handed cleanly between them. */
export function TurnGlyph(props) {
  return (
    <Glyph {...props}>
      <path d="M3.6 5.6v4.4M6.6 6.4v2.8M9.6 5v5.6" />
      <path d="M10.6 9.2c1.8.9 1.8 4.7 3.6 5.6" />
      <Live cx={12.4} cy={12} />
      <path d="M14.8 14v4.4M17.8 14.8v2.8M20.8 13.4v5.6" />
    </Glyph>
  );
}

/** Campaigns + CRM — one source fanning out, every outcome landing on a row. */
export function CampaignGlyph(props) {
  return (
    <Glyph {...props}>
      <Live cx={3.6} cy={12} />
      <path d="M5.3 12h6.3M5.4 11 11.6 6.4M5.4 13 11.6 17.6" />
      <path d="M11.6 6.4h9.2M11.6 12h9.2M11.6 17.6h6" />
    </Glyph>
  );
}

/** Live traffic — calls passing a controlled gate. */
export function TrafficGlyph(props) {
  return (
    <Glyph {...props}>
      <path d="M8.4 3.4v17.2M15.6 3.4v17.2" />
      <path d="M2.6 12h4.6M5.8 10.4 7.4 12l-1.6 1.6" />
      <path d="M16.8 12h4.6" />
      <path d="M12 7.6v2.2M12 14.2v2.2" />
      <Live cx={12} cy={12} />
    </Glyph>
  );
}

/** Your keys — a key whose teeth are the amplitude ticks. */
export function KeyGlyph(props) {
  return (
    <Glyph {...props}>
      <circle cx="7.8" cy="12" r="4.6" />
      <path d="M12.4 12h7.2" />
      <path d="M15.4 12v3.6M18.2 12v2.6" />
      <Live cx={20.8} cy={12} />
    </Glyph>
  );
}

/** Conversation trail — a timeline of turns, the current one live. */
export function TrailGlyph(props) {
  return (
    <Glyph {...props}>
      <path d="M4.4 4v16" />
      <circle cx="4.4" cy="7.4" r="1.3" />
      <Live cx={4.4} cy={12} />
      <circle cx="4.4" cy="16.6" r="1.3" />
      <path d="M8.2 7.4h12.2M8.2 12h12.2M8.2 16.6h7.8" />
    </Glyph>
  );
}

/** Partner — two operators on one live line. */
export function PartnerGlyph(props) {
  return (
    <Glyph {...props}>
      <path d="M3.6 8v3.2M5.8 6.4v6.4M8 7.6v4" />
      <path d="M8.8 12h6.4" />
      <Live cx={12} cy={12} />
      <path d="M16 7.6v4M18.2 6.4v6.4M20.4 8v3.2" />
    </Glyph>
  );
}

/** Joins from a link. */
export function LinkGlyph(props) {
  return (
    <Glyph {...props}>
      <path d="M9.8 14.3a4.3 4.3 0 0 0 6.3.5l3.3-3.3a4.3 4.3 0 0 0-6-6l-1.9 1.9" />
      <path d="M14.2 9.7a4.3 4.3 0 0 0-6.3-.5l-3.3 3.3a4.3 4.3 0 0 0 6 6l1.9-1.9" />
      <Live cx={12} cy={12} />
    </Glyph>
  );
}

/** Speaks — the tick motif in its purest form. */
export function VoiceGlyph(props) {
  return (
    <Glyph {...props}>
      <path d="M3.4 10.2v3.6M6.4 7.4v9.2M9.4 9.2v5.6" />
      <Live cx={12} cy={12} />
      <path d="M14.6 9.2v5.6M17.6 7.4v9.2M20.6 10.2v3.6" />
    </Glyph>
  );
}

/** Books follow-ups. */
export function ScheduleGlyph(props) {
  return (
    <Glyph {...props}>
      <rect x="3" y="5.2" width="18" height="15.2" rx="2.4" />
      <path d="M8 2.8v3.6M16 2.8v3.6M3 10.2h18" />
      <Live cx={8} cy={14.6} />
      <path d="m11.8 15.8 2 2 3.8-4.4" />
    </Glyph>
  );
}

/** Detects disconnects — the waveform flatlines and we catch the moment. */
export function DropGlyph(props) {
  return (
    <Glyph {...props}>
      <path d="M2.6 12h1.8l1.6-5.4L7.8 17l1.6-6 1.1 1h0.1" />
      <Live cx={12} cy={12} />
      <path d="M13.5 12h7.9" />
    </Glyph>
  );
}

/*
  Section marks. Same construction rules, but these name a section rather than
  a feature, so none of them doubles as a content icon elsewhere on the page.
*/

/** Platform — one surface carrying every capability. */
export function GridGlyph(props) {
  return (
    <Glyph {...props}>
      <rect x="2.6" y="3.6" width="18.8" height="16.8" rx="2.4" />
      <path d="M2.6 8.6h18.8" />
      <Live cx={5.6} cy={6.1} />
      <path d="M7.4 12.2v4.4M11 10.8v7.2M14.6 12.8v3.2M18.2 11.6v5.6" />
    </Glyph>
  );
}

/** Integrations — providers seated into one socket. */
export function PlugGlyph(props) {
  return (
    <Glyph {...props}>
      <path d="M8.4 3.2v5.2M15.6 3.2v5.2" />
      <path d="M4.6 8.4h14.8v2.8a7.4 7.4 0 0 1-14.8 0z" />
      <path d="M12 18.6v2.2" />
      <Live cx={12} cy={12.4} />
    </Glyph>
  );
}

/** Industries — a skyline of sectors, one of them live. */
export function MapGlyph(props) {
  return (
    <Glyph {...props}>
      <path d="M3.2 20.2h17.6" />
      <path d="M4.6 20.2V11.2h3.6V20.2" />
      <path d="M8.2 20.2V6.2h4.4V20.2" />
      <path d="M12.6 20.2V13h3.8V20.2" />
      <path d="M16.4 20.2V8.4h3.4V20.2" />
      <Live cx={10.4} cy={4.2} />
    </Glyph>
  );
}

/** Trust — controls held around the live call. */
export function ShieldGlyph(props) {
  return (
    <Glyph {...props}>
      <path d="M12 3 4.8 5.8v6c0 4.4 3 7.6 7.2 9 4.2-1.4 7.2-4.6 7.2-9v-6z" />
      <path d="M9 11.2v2.8M15 11.2v2.8" />
      <Live cx={12} cy={12.6} />
    </Glyph>
  );
}

/** How it works — one request routed until every system agrees. */
export function RouteGlyph(props) {
  return (
    <Glyph {...props}>
      <Live cx={3.4} cy={5.4} />
      <path d="M5.2 5.4h5.6a3.4 3.4 0 0 1 3.4 3.4v5.8a3.4 3.4 0 0 0 3.4 3.4h3" />
      <path d="M17.6 15.4 20.6 18l-3 2.6" />
    </Glyph>
  );
}

/** Pricing — a tag metered by the call, not a speedometer. */
export function PriceGlyph(props) {
  return (
    <Glyph {...props}>
      <path d="M3.2 12.1 11.1 4.2h7.3A2 2 0 0 1 20.4 6.2v7.3L12.5 21.4z" />
      <Live cx={8.1} cy={8.5} />
      <path d="M12.2 8v3.6M14.7 7v5.6M17.2 8v3.6" />
    </Glyph>
  );
}

/** Answers — the question asked out loud, then answered. */
export function AskGlyph(props) {
  return (
    <Glyph {...props}>
      <path d="M3 6.2a2.6 2.6 0 0 1 2.6-2.6h12.8A2.6 2.6 0 0 1 21 6.2v7.2a2.6 2.6 0 0 1-2.6 2.6H9.2L3 20.6z" />
      <path d="M8 7.8v3.4M11.6 6.6v5.8" />
      <Live cx={15.6} cy={9.6} />
    </Glyph>
  );
}

/** Opens with context — the call returns and the voice carries on. */
export function ResumeGlyph(props) {
  return (
    <Glyph {...props}>
      <path d="M3.2 7.6h4.4a3.9 3.9 0 0 1 0 7.8H5" />
      <path d="M6.8 13.6 5 15.4l1.8 1.8" />
      <Live cx={13.8} cy={12} />
      <path d="M16.6 7.4v9.2M19.8 9.6v4.8" />
    </Glyph>
  );
}
