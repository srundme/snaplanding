import { LEAD_CC_EMAILS, LEAD_PRIMARY_EMAIL } from "./links";

/*
  Every lead capture on the site goes through submitLead.

  Two independent channels:
  1. Email — FormSubmit relay to LEAD_PRIMARY_EMAIL, copying LEAD_CC_EMAILS.
  2. Console API — the orchestration backend that powers the admin view in
     app.snapserve.ai. Enabled by setting VITE_LEADS_API_URL.

  A submission counts as delivered if either channel succeeds, so a backend
  outage never costs a lead and email stays as the safety net.
*/

const EMAIL_ENDPOINT = `https://formsubmit.co/ajax/${LEAD_PRIMARY_EMAIL}`;
const API_URL = import.meta.env.VITE_LEADS_API_URL?.trim() || "";
const API_KEY = import.meta.env.VITE_LEADS_API_KEY?.trim() || "";

/** Stable contract shared with the console API. Keys are snake_case. */
export function buildLeadPayload(fields, { source, competitor = "" } = {}) {
  return {
    source,
    competitor,
    name: fields.name,
    email: fields.email,
    company: fields.company,
    phone: fields.phone || "",
    intent: fields.intent,
    current_stack: fields.current_stack || "",
    message: fields.message || "",
    page_url: typeof window !== "undefined" ? window.location.href : "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    submitted_at: new Date().toISOString(),
  };
}

function emptyDash(value) {
  return value && String(value).trim() ? value : "—";
}

async function sendEmail(lead) {
  const res = await fetch(EMAIL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: `SnapServe inquiry — ${lead.source}`,
      _template: "table",
      _cc: LEAD_CC_EMAILS.join(","),
      Name: lead.name,
      Email: lead.email,
      Company: lead.company,
      Phone: emptyDash(lead.phone),
      Looking_for: lead.intent,
      Current_stack: emptyDash(lead.current_stack),
      Switching_from: emptyDash(lead.competitor),
      Message: emptyDash(lead.message),
      Source: lead.source,
      Page: lead.page_url,
      Submitted_at: lead.submitted_at,
    }),
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
