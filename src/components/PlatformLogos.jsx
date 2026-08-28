/**
 * Simplified platform marks drawn inline so the "works with" surfaces stay
 * crisp at small sizes without shipping raster brand assets.
 */

export function GoogleMeetMark({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="#00832D"
        d="M2 8.2A2.2 2.2 0 0 1 4.2 6h8.1a2.2 2.2 0 0 1 2.2 2.2v7.6a2.2 2.2 0 0 1-2.2 2.2H4.2A2.2 2.2 0 0 1 2 15.8V8.2Z"
      />
      <path
        fill="#0066DA"
        d="M14.5 10.4l5-3.3a1 1 0 0 1 1.5.9v8a1 1 0 0 1-1.5.9l-5-3.3v-3.2Z"
      />
      <path fill="#FFBA00" d="M14.5 13.6l3 2v-4l-3 2Z" opacity=".85" />
    </svg>
  );
}

export function ZoomMark({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect width="24" height="24" rx="5.5" fill="#2D8CFF" />
      <path
        fill="#fff"
        d="M6 9.7c0-.6.5-1.1 1.1-1.1h6.2c.6 0 1.1.5 1.1 1.1v4.6c0 .6-.5 1.1-1.1 1.1H7.1A1.1 1.1 0 0 1 6 14.3V9.7Zm9 1.6 2.6-1.8c.4-.3.9 0 .9.4v4.2c0 .4-.5.7-.9.4L15 12.7v-1.4Z"
      />
    </svg>
  );
}

export function TeamsMark({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="5" width="13" height="14" rx="2.4" fill="#5B5FC7" />
      <path fill="#fff" d="M5 8.3h7v1.8H9.4V16H7.6v-5.9H5V8.3Z" />
      <circle cx="18.4" cy="8.3" r="2.5" fill="#7B83EB" />
      <path
        fill="#7B83EB"
        d="M15.6 11.6h5.1a1.3 1.3 0 0 1 1.3 1.3v2.5a3.9 3.9 0 0 1-3.9 3.9h-.2a3.9 3.9 0 0 1-2.3-.8v-6.9Z"
        opacity=".9"
      />
    </svg>
  );
}

export function TwilioMark({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#F22F46"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 0C5.381-.008.008 5.352 0 11.971V12c0 6.64 5.359 12 12 12 6.64 0 12-5.36 12-12 0-6.641-5.36-12-12-12zm0 20.801c-4.846.015-8.786-3.904-8.801-8.75V12c-.014-4.846 3.904-8.786 8.75-8.801H12c4.847-.014 8.786 3.904 8.801 8.75V12c.015 4.847-3.904 8.786-8.75 8.801H12zm5.44-11.76c0 1.359-1.12 2.479-2.481 2.479-1.366-.007-2.472-1.113-2.479-2.479 0-1.361 1.12-2.481 2.479-2.481 1.361 0 2.481 1.12 2.481 2.481zm0 5.919c0 1.36-1.12 2.48-2.481 2.48-1.367-.008-2.473-1.114-2.479-2.48 0-1.359 1.12-2.479 2.479-2.479 1.361-.001 2.481 1.12 2.481 2.479zm-5.919 0c0 1.36-1.12 2.48-2.479 2.48-1.368-.007-2.475-1.113-2.481-2.48 0-1.359 1.12-2.479 2.481-2.479 1.358-.001 2.479 1.12 2.479 2.479zm0-5.919c0 1.359-1.12 2.479-2.479 2.479-1.367-.007-2.475-1.112-2.481-2.479 0-1.361 1.12-2.481 2.481-2.481 1.358 0 2.479 1.12 2.479 2.481z" />
    </svg>
  );
}

export function PlivoMark({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect width="32" height="32" rx="6" fill="#323DFE" />
      <path
        fill="#fff"
        d="M13.296 13.932c-.586.227-1.18.378-1.692.763-.782.59-1.087 1.399-1.38 2.301-.03.042-.112.042-.139 0-.22-.586-.373-1.172-.759-1.677-.655-.86-1.276-.964-2.208-1.341-.074-.031-.158-.05-.097-.154.027-.046.852-.316.983-.374.805-.343 1.395-.94 1.738-1.746.131-.312.216-.651.355-.956l.069-.023.073.062c.274.867.575 1.642 1.307 2.22.513.405 1.114.57 1.715.794.046.027.042.085.03.131h.004Z"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.86 3.634 12.8 4.466l11.608 5.25s.038.019.054.03l.12.074c.135.112.404.44.389.848v5.966c-.008.254-.127.79-.513 1.037l-.058.034-8.475 3.912v6.17c0 .22-.177.397-.397.397h-4.794a.397.397 0 0 1-.397-.397V18.572c0-.023 0-.046.004-.065.012-.143.123-.474.466-.674l.042-.023 8.842-4.078-9.316-4.204c-.12-.054-.177-.181-.15-.3V9.03l.054-4.525c-.073-.748.358-.886.586-.863v-.008h-.004Z"
      />
    </svg>
  );
}

export function VobizMark({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect width="24" height="24" rx="5.5" fill="#1A100C" />
      <g transform="translate(2.4 5) scale(0.137)">
        <path
          fill="#E83C00"
          d="M140 3.923C140 1.714 138.208-.085 136.001.003c-11.767.471-23.37 3.017-34.269 7.532C89.6 12.561 78.575 19.927 69.29 29.213 60.004 38.499 52.638 49.523 47.612 61.655c-4.515 10.9-7.061 22.502-7.532 34.269C39.992 98.132 41.791 99.923 44 99.923h43.538c2.209 0 3.983-1.794 4.165-3.995a51.3 51.3 0 0 1 3.524-14.55c2.435-5.88 6.005-11.222 10.505-15.722 4.5-4.5 9.843-8.07 15.722-10.505 4.646-1.924 9.555-3.11 14.551-3.524C138.206 51.444 140 49.67 140 47.461V3.923Z"
        />
        <path
          fill="#E86A00"
          d="M0 3.923C0 1.714 1.794-.094 3.996.086c5.197.425 10.306 1.678 15.138 3.72 6.066 2.563 11.578 6.32 16.221 11.055 4.643 4.736 8.326 10.358 10.839 16.546 2.012 4.953 3.242 10.192 3.652 15.52C50.016 49.13 48.209 50.923 46 50.923H4C1.791 50.923 0 49.132 0 46.923V3.923Z"
        />
      </g>
    </svg>
  );
}

export function GeminiMark({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="#4285F4"
        d="M12 2.2c.35 3.55 3.15 6.35 6.7 6.7-3.55.35-6.35 3.15-6.7 6.7-.35-3.55-3.15-6.35-6.7-6.7 3.55-.35 6.35-3.15 6.7-6.7Z"
      />
      <path
        fill="#8AB4F8"
        d="M12 12.2c.35 3.55 3.15 6.35 6.7 6.7-3.55.35-6.35 3.15-6.7 6.7-.35-3.55-3.15-6.35-6.7-6.7 3.55-.35 6.35-3.15 6.7-6.7Z"
        opacity=".9"
      />
    </svg>
  );
}

export function OpenAIMark({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Three capsules at 60° read as the six-fold knot at badge sizes. Drawn
          unfilled because a black disc disappears against the dark surfaces. */}
      <g stroke="#E8EAED" strokeWidth="1.45">
        <rect x="8.1" y="4.7" width="7.8" height="14.6" rx="3.9" />
        <rect
          x="8.1"
          y="4.7"
          width="7.8"
          height="14.6"
          rx="3.9"
          transform="rotate(60 12 12)"
        />
        <rect
          x="8.1"
          y="4.7"
          width="7.8"
          height="14.6"
          rx="3.9"
          transform="rotate(120 12 12)"
        />
      </g>
    </svg>
  );
}

export function GoogleCalendarMark({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="2.4" fill="#fff" />
      <path fill="#4285F4" d="M3 5.4A2.4 2.4 0 0 1 5.4 3H8.5v5.5H3V5.4Z" />
      <path fill="#EA4335" d="M15.5 3h3.1A2.4 2.4 0 0 1 21 5.4v3.1h-5.5V3Z" />
      <path fill="#34A853" d="M3 15.5h5.5V21H5.4A2.4 2.4 0 0 1 3 18.6v-3.1Z" />
      <path fill="#FBBC04" d="M15.5 15.5H21v3.1A2.4 2.4 0 0 1 18.6 21h-3.1v-5.5Z" />
      <path
        fill="#4285F4"
        d="M8.9 10.3h2.9v.85l-1.15 1.25c.72.13 1.2.62 1.2 1.32 0 .85-.66 1.4-1.63 1.4-.6 0-1.13-.2-1.45-.5l.42-.75c.25.22.6.36.95.36.4 0 .66-.2.66-.53 0-.36-.3-.55-.83-.55h-.3v-.72l1-1.1H8.9v-1.03Zm4.7 0h1.35v3.9h-1.1v-2.95l-.72.2-.23-.86.7-.29Z"
      />
    </svg>
  );
}

export function MetaMark({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3.6 13.9c0-3.5 1.7-6.4 3.9-6.4 1.8 0 3 1.5 4.5 4 1.5-2.5 2.7-4 4.5-4 2.2 0 3.9 2.9 3.9 6.4 0 1.7-.9 2.9-2.4 2.9-1.5 0-2.5-1.1-3.9-3.4L12 11.1l-2.1 2.3c-1.4 2.3-2.4 3.4-3.9 3.4-1.5 0-2.4-1.2-2.4-2.9Z"
        stroke="#0F8CFF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GoogleSheetsMark({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="#0F9D58"
        d="M6.2 2.8h8.1L19.2 7.7v13.1A2.4 2.4 0 0 1 16.8 23.2H6.2A2.4 2.4 0 0 1 3.8 20.8V5.2A2.4 2.4 0 0 1 6.2 2.8Z"
      />
      <path fill="#87CEAC" d="M14.3 2.8v4.1a.8.8 0 0 0 .8.8h4.1L14.3 2.8Z" />
      <path
        fill="#fff"
        d="M7.1 11.2h9.8v8.2H7.1v-8.2Zm1.15 1.1v1.8h2.7v-1.8h-2.7Zm3.85 0v1.8h2.7v-1.8h-2.7Zm3.85 0v1.8h2.05v-1.8H15.95Zm-7.7 2.9v1.8h2.7v-1.8h-2.7Zm3.85 0v1.8h2.7v-1.8h-2.7Zm3.85 0v1.8h2.05v-1.8H15.95Zm-7.7 2.9V18.1h2.7v-1.9h-2.7Zm3.85 0V18.1h2.7v-1.9h-2.7Zm3.85 0V18.1h2.05v-1.9H15.95Z"
      />
    </svg>
  );
}

export function GoogleMark({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export function DeepgramMark({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect width="24" height="24" rx="5.5" fill="#13EF93" />
      <path
        fill="#0A0A0A"
        d="M6.2 14.2h1.8v-4.4H6.2v4.4Zm3.3 2.1h1.8V7.7H9.5v8.6Zm3.3-1.4h1.8V9.1h-1.8v5.8Zm3.3 2.6h1.8V5.5h-1.8v12Z"
      />
    </svg>
  );
}

export function ElevenLabsMark({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect width="24" height="24" rx="5.5" fill="#F5F5F5" />
      <rect x="7.2" y="5.5" width="3.2" height="13" rx="1.4" fill="#111" />
      <rect x="13.6" y="5.5" width="3.2" height="13" rx="1.4" fill="#111" />
    </svg>
  );
}

export function HubSpotMark({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect width="24" height="24" rx="5.5" fill="#FF7A59" />
      <circle cx="12" cy="13.2" r="4.2" stroke="#fff" strokeWidth="1.8" />
      <path
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="M12 9V5.8M12 5.8h2.4"
      />
      <circle cx="16.6" cy="8.2" r="1.35" fill="#fff" />
    </svg>
  );
}

export function ZohoMark({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect width="24" height="24" rx="5.5" fill="#E42527" />
      <path
        fill="#fff"
        d="M7.2 7.4h9.6v2.1l-5.8 7.1h6v2H7.1v-2.1l5.9-7.1H7.2v-2Z"
      />
    </svg>
  );
}

export function SarvamMark({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect width="24" height="24" rx="5.5" fill="#0B3D2E" />
      <path
        fill="#5EEAD4"
        d="M12 4.8c-1.4 2.4-3.9 4-6.6 4.2 1.1 1.3 1.8 3 1.8 4.9 0 2.1-.9 4-2.3 5.4C7.2 18.2 9.5 17 12 17s4.8 1.2 7.1 2.3c-1.4-1.4-2.3-3.3-2.3-5.4 0-1.9.7-3.6 1.8-4.9-2.7-.2-5.2-1.8-6.6-4.2Z"
      />
      <circle cx="12" cy="12.2" r="2.1" fill="#0B3D2E" />
    </svg>
  );
}

export const PLATFORM_MARKS = {
  "Google Meet": GoogleMeetMark,
  Zoom: ZoomMark,
  "Microsoft Teams": TeamsMark,
  Twilio: TwilioMark,
  Plivo: PlivoMark,
  Vobiz: VobizMark,
  OpenAI: OpenAIMark,
  Google: GoogleMark,
  Deepgram: DeepgramMark,
  ElevenLabs: ElevenLabsMark,
  Sarvam: SarvamMark,
  HubSpot: HubSpotMark,
  Zoho: ZohoMark,
  "Google Calendar": GoogleCalendarMark,
  "Google Sheets": GoogleSheetsMark,
  Meta: MetaMark,
  Gemini: GeminiMark,
};
