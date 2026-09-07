const ICON_PROPS = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.55,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function TelephonyIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M6.5 4.5h3.2l1.4 3.4a1 1 0 0 1-.24 1.03l-1.5 1.5a11.5 11.5 0 0 0 5.51 5.51l1.5-1.5a1 1 0 0 1 1.03-.24l3.4 1.4v3.2a1 1 0 0 1-1 1A14.5 14.5 0 0 1 5.5 5.5a1 1 0 0 1 1-1Z" />
      <path d="M17 3.5v3M19.5 6H14.5" opacity="0.7" />
    </svg>
  );
}

export function OrchestrationIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <circle cx="12" cy="18" r="2.2" />
      <path d="M8 6.8h8M7.6 7.8 10.4 16M16.4 7.8 13.6 16" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BusinessIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="4.5" y="5.5" width="15" height="13" rx="2" />
      <path d="M8.5 10h7M8.5 13.5h4.5" />
      <path d="M9 5.5V4.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <circle cx="17" cy="8" r="2.8" fill="rgba(20,184,166,0.15)" stroke="currentColor" />
      <path d="M16.2 8l.55.55 1.05-1.1" strokeWidth="1.35" />
    </svg>
  );
}

export function MemoryIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M5 8.5a7 7 0 0 1 14 0" />
      <path d="M5 15.5a7 7 0 0 0 14 0" />
      <ellipse cx="12" cy="12" rx="3.2" ry="2.2" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
      <path d="M8.5 12H6M18 12h-2.5" opacity="0.65" />
    </svg>
  );
}

export function LanguagesIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="8.2" />
      <ellipse cx="12" cy="12" rx="3.4" ry="8.2" />
      <path d="M4.2 9.5h15.6M4.2 14.5h15.6" opacity="0.65" />
      <path d="M12 3.8v16.4" opacity="0.45" />
    </svg>
  );
}

export function ConversationIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M5 6.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H10l-3.5 2.5V6.5Z" />
      <path d="M8 10.5v3M11 9v4.5M14 10.5v3M17 9.5v3.5" strokeWidth="1.75" />
    </svg>
  );
}

export function OutcomeIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M6 5.5h9l3 3v10.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z" />
      <path d="M15 5.5V9h3" opacity="0.65" />
      <path d="M8.5 12.5l1.6 1.6 3.4-3.6" strokeWidth="1.7" />
      <path d="M17.5 8.5 20 6l1.5 1.5" opacity="0.75" />
      <circle cx="20" cy="6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

