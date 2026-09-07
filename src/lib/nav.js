import { PARTNER_URL } from "./links";

/** Desktop sidebar — keep short; deep links live in footer */
export const SIDEBAR_NAV = [
  { label: "Platform", href: "#differentiator" },
  { label: "Live demos", href: "#meeting-bot" },
  { label: "Integrations", href: "#integrations-stack" },
  { label: "Trust", href: "#trust" },
  { label: "Pricing", href: "#pricing" },
  { label: "Answers", href: "#answers" },
];

/** Mobile scroll strip — a few more anchors, still compact */
export const MOBILE_NAV = [
  { label: "Platform", href: "#differentiator" },
  { label: "Demos", href: "#meeting-bot" },
  { label: "Integrations", href: "#integrations-stack" },
  { label: "Industries", href: "#industries" },
  { label: "Trust", href: "#trust" },
  { label: "Pricing", href: "#pricing" },
  { label: "Answers", href: "#answers" },
  { label: "Partner", href: PARTNER_URL },
];
