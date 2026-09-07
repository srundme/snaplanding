import { LEAD_FROM_EMAIL } from "./links";

/*
  Every lead capture on the site goes through submitLead.

  Two independent channels:
  1. Email — same-origin POST /api/leads-mail, sent via Brevo From noreply@snapserve.ai
  2. Console API — orchestration backend (app.snapserve.ai). Enabled by VITE_LEADS_API_URL.

  A submission counts as delivered if either channel succeeds.
*/

const API_URL = import.meta.env.VITE_LEADS_API_URL?.trim() || "";
const API_KEY = import.meta.env.VITE_LEADS_API_KEY?.trim() || "";

/** Stable contract shared with the console API. Keys are snake_case. */
export function buildLeadPayload(fields, { source, competitor = "" } = {}) {
  return {
    source,
    competitor,
    from: LEAD_FROM_EMAIL,
    name: fields.name,
    email: fields.email,
    company: fields.company,
    phone: fields.phone || "",
    intent: fields.intent,
    industry: fields.industry || "",
    call_volume: fields.call_volume || "",
    current_stack: fields.current_stack || "",
    message: fields.message || "",
    page_url: typeof window !== "undefined" ? window.location.href : "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    submitted_at: new Date().toISOString(),
  };
}

async function sendEmail(lead) {
  const res = await fetch("/api/leads-mail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(lead),
  });

  if (!res.ok) throw new Error("email_failed");
  return "email";
}

async function sendToConsole(lead) {
  if (!API_URL) throw new Error("api_not_configured");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(API_KEY ? { "x-api-key": API_KEY } : {}),
    },
    body: JSON.stringify(lead),
  });

  if (!res.ok) throw new Error("api_failed");
  return "api";
}

/**
 * Delivers a lead to every configured channel.
 * Resolves with the channels that accepted it; rejects only if all failed.
 */
export async function submitLead(lead) {
  const channels = API_URL
    ? [sendEmail(lead), sendToConsole(lead)]
    : [sendEmail(lead)];

  const results = await Promise.allSettled(channels);
  const delivered = results
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value);

  if (!delivered.length) throw new Error("lead_undelivered");
  return delivered;
}
