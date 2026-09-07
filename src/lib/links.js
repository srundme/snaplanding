export const APP_URL = "https://app.snapserve.ai";
export const SIGNUP_URL = "https://app.snapserve.ai";
export const PARTNER_URL = "/partner";
/*
  Lead routing. Every inquiry reaches these inboxes: the primary address is
  the FormSubmit endpoint, the rest are copied on it.
*/
export const LEAD_PRIMARY_EMAIL = "support@snapserve.ai";
export const LEAD_FROM_EMAIL = "leads@snapserve.ai";
export const LEAD_CC_EMAILS = [
  "gopi@snapserve.ai",
  "karthikeyan@theaitel.com",
  "sathizcivil77@gmail.com",
];
export const LEAD_RECIPIENTS = [LEAD_PRIMARY_EMAIL, ...LEAD_CC_EMAILS];
export const SALES_URL = PARTNER_URL;
export const X_URL = "https://x.com/snapserve_ai";
export const LINKEDIN_URL = "https://www.linkedin.com/company/snapserve-ai";
export const INSTAGRAM_URL = "https://www.instagram.com/snapserve_ai";

/** Verified + public profiles — used in footer and schema sameAs */
export const SOCIAL_SAME_AS = [
  LINKEDIN_URL,
  X_URL,
  INSTAGRAM_URL,
].filter(Boolean);
