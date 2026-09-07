import { useMemo, useState } from "react";
import { APP_URL, LEAD_PRIMARY_EMAIL } from "../lib/links";
import { buildLeadPayload, submitLead } from "../lib/leads";
import GlowButton from "./GlowButton";

const INTENTS = [
  { value: "partner", label: "Agency or reseller partner" },
  { value: "switch", label: "Switching from another platform" },
  { value: "enterprise", label: "Enterprise rollout" },
  { value: "other", label: "Other" },
];

const INDUSTRIES = [
  "Real estate",
  "Insurance",
  "Healthcare",
  "Lending & finance",
  "EdTech & coaching",
  "D2C & e-commerce",
  "Collections",
  "Travel & hospitality",
  "Automotive",
  "Other",
];

const CALL_VOLUMES = [
  "Just starting",
  "Under 5,000 / month",
  "5,000 – 25,000 / month",
  "25,000 – 1 lakh / month",
  "1 lakh+ / month",
];

function fieldClass(extra = "") {
  return [
    "partner-form__field w-full rounded-xl border border-line bg-surface-0 px-3.5 py-2.5 text-[14px] text-ink outline-none transition-colors",
    "placeholder:text-ink-3 focus:border-[#14B8A6]/45 focus:ring-2 focus:ring-[#14B8A6]/15",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

export default function PartnerForm({
  id = "partner-form",
  source = "partner",
  competitor = "",
  embedded = false,
  title = "Tell us about your partnership",
  subtitle = "Share a few details — we’ll reach out within one business day and you can explore the live console right away.",
}) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const defaultStack = competitor ? `Currently evaluating a move from ${competitor}` : "";
  const defaultIntent = competitor ? "switch" : "partner";

  const formKey = useMemo(
    () => `${source}-${competitor || "general"}`,
    [source, competitor],
  );

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "submitting") return;

    const data = new FormData(event.currentTarget);

    const lead = buildLeadPayload(
      {
        name: data.get("name"),
        email: data.get("email"),
        company: data.get("company"),
        phone: data.get("phone"),
        intent: data.get("intent"),
        industry: data.get("industry"),
        call_volume: data.get("call_volume"),
        current_stack: data.get("current_stack"),
        message: data.get("message"),
      },
      { source, competitor },
    );

    setStatus("submitting");
    setError("");

    try {
      await submitLead(lead);
      setStatus("success");
      window.open(APP_URL, "_blank", "noopener,noreferrer");
    } catch {
      setStatus("idle");
      setError(
        `Something went wrong. Email ${LEAD_PRIMARY_EMAIL} and we’ll help you right away.`,
      );
    }
  }

  if (status === "success") {
    return (
      <div
        id={id}
        className={`partner-form partner-form--success${embedded ? " partner-form--embedded" : ""}`}
      >
        <h2 className="headline-lg max-w-xl">Thanks — we got your details.</h2>
        <p className="body-text mt-3 max-w-lg">
          The SnapServe console should be open in a new tab. Sign up with the same
          email so we can match your inquiry to your account.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <GlowButton href={APP_URL} hoverText="Open console →">
            Open SnapServe console
          </GlowButton>
          <a href="/" className="outline-btn">
            Back to home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      id={id}
      className={`partner-form${embedded ? " partner-form--embedded" : ""}`}
    >
      {!embedded ? (
        <div className="partner-form__head">
          <h2 className="headline-lg max-w-2xl">{title}</h2>
          <p className="body-text mt-3 max-w-xl">{subtitle}</p>
        </div>
      ) : (
        <div className="partner-form__head partner-form__head--embedded">
          <p className="label text-ink-3">Apply</p>
          <h2 className="partner-form__embedded-title">{title}</h2>
          <p className="partner-form__embedded-sub">{subtitle}</p>
        </div>
      )}

      <form
        key={formKey}
        className={`partner-form__grid${embedded ? " partner-form__grid--embedded mt-6" : " mt-8"}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="partner-form__label">
          <span>Full name</span>
          <input
            className={fieldClass()}
            type="text"
            name="name"
            autoComplete="name"
            required
            placeholder="Your name"
          />
        </label>

        <label className="partner-form__label">
          <span>Work email</span>
          <input
            className={fieldClass()}
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="you@company.com"
          />
        </label>

        <label className="partner-form__label">
          <span>Company</span>
          <input
            className={fieldClass()}
            type="text"
            name="company"
            autoComplete="organization"
            required
            placeholder="Company name"
          />
        </label>

        <label className="partner-form__label">
          <span>Phone</span>
          <input
            className={fieldClass()}
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="+91 …"
          />
        </label>

        <label className="partner-form__label partner-form__label--wide">
          <span>What are you looking for?</span>
          <select
            className={fieldClass()}
            name="intent"
            defaultValue={defaultIntent}
            required
          >
            {INTENTS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="partner-form__label partner-form__label--wide partner-form__fieldset">
          <legend>Preferred industry</legend>
          <div className="partner-form__chips">
            {INDUSTRIES.map((item) => (
              <label key={item} className="partner-form__chip">
                <input type="radio" name="industry" value={item} required />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="partner-form__label partner-form__label--wide partner-form__fieldset">
          <legend>Expected monthly call volume</legend>
          <div className="partner-form__chips">
            {CALL_VOLUMES.map((item) => (
              <label key={item} className="partner-form__chip">
                <input type="radio" name="call_volume" value={item} required />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="partner-form__label partner-form__label--wide">
          <span>Current voice stack (if any)</span>
          <input
            className={fieldClass()}
            type="text"
            name="current_stack"
            defaultValue={defaultStack}
            placeholder="Vapi, Bolna, Retell, in-house, etc."
          />
        </label>

        <label className="partner-form__label partner-form__label--wide">
          <span>Anything else we should know?</span>
          <textarea
            className={fieldClass("min-h-[7.5rem] resize-y")}
            name="message"
            rows={4}
            placeholder="Team size, timeline…"
          />
        </label>

        {error ? (
          <p className="partner-form__error partner-form__label--wide" role="alert">
            {error}
          </p>
        ) : null}

        <div className="partner-form__actions partner-form__label--wide">
          <button
            type="submit"
            className="partner-form__submit"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending…" : "Submit & open console"}
          </button>
          <p className="text-[12px] text-ink-3">
            Opens app.snapserve.ai in a new tab after submit. No card required to explore.
          </p>
        </div>
      </form>
    </div>
  );
}
