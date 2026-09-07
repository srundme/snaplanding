import { LEAD_FROM_EMAIL, LEAD_RECIPIENTS } from "../src/lib/links.js";

const BREVO_SEND_URL = "https://api.brevo.com/v3/smtp/email";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function dash(value) {
  const text = String(value ?? "").trim();
  return text || "—";
}

function mailRows(lead) {
  return [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company],
    ["Phone", dash(lead.phone)],
    ["Looking for", lead.intent],
    ["Industry", dash(lead.industry)],
    ["Call volume", dash(lead.call_volume)],
    ["Current stack", dash(lead.current_stack)],
    ["Switching from", dash(lead.competitor)],
    ["Message", dash(lead.message)],
    ["Source", lead.source],
    ["Page", dash(lead.page_url)],
    ["Submitted at", dash(lead.submitted_at)],
  ];
}

export async function sendLeadMail(lead) {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("mail_not_configured");
  }
  if (!lead?.email || !lead?.name) {
    throw new Error("invalid_lead");
  }

  const rows = mailRows(lead);
  const textContent = rows.map(([label, value]) => `${label}: ${dash(value)}`).join("\n");
  const htmlContent = `
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><th align="left" style="border:1px solid #ddd;background:#f6f6f6">${escapeHtml(label)}</th><td style="border:1px solid #ddd">${escapeHtml(dash(value))}</td></tr>`,
        )
        .join("")}
    </table>
  `;

  const res = await fetch(BREVO_SEND_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: {
        name: "SnapServe",
        email: LEAD_FROM_EMAIL,
      },
      to: LEAD_RECIPIENTS.map((email) => ({ email })),
      replyTo: { email: String(lead.email).trim() },
      subject: `SnapServe inquiry — ${dash(lead.source)}`,
      textContent,
      htmlContent,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[leads-mail] brevo", res.status, detail.slice(0, 400));
    throw new Error("email_failed");
  }
}

export async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

export async function handleLeadsMailRequest(req, res) {
  res.setHeader("Content-Type", "application/json");
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "method_not_allowed" }));
    return;
  }
  try {
    const lead = await readJsonBody(req);
    await sendLeadMail(lead);
    res.statusCode = 200;
    res.end(JSON.stringify({ ok: true }));
  } catch (error) {
    console.error("[leads-mail]", error?.message || error);
    res.statusCode = error?.message === "mail_not_configured" ? 503 : 500;
    res.end(JSON.stringify({ error: "email_failed" }));
  }
}
