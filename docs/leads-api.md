# Lead capture API

The marketing site has one lead form (`PartnerForm`), used on `/partner` and on
every `/solutions/:slug` page. All submissions go through `src/lib/leads.js`.

Each submission is sent to two independent channels. It counts as delivered if
either one succeeds, so a backend outage never loses a lead.

| Channel | Destination | Configured by |
| --- | --- | --- |
| Email | support@snapserve.ai, cc gopi@snapserve.ai, karthikeyan@theaitel.com, and sathizcivil77@gmail.com | `src/lib/links.js` |
| Console API | Orchestration DB behind app.snapserve.ai | `VITE_LEADS_API_URL` |

## What the console needs to implement

`POST` to `VITE_LEADS_API_URL`.

Headers:

```
Content-Type: application/json
x-api-key: <VITE_LEADS_API_KEY>   # only sent when the key is set
```

Body:

```json
{
  "source": "solutions/vapi-alternative",
  "competitor": "Vapi",
  "from": "leads@snapserve.ai",
  "name": "Priya Nayar",
  "email": "priya@acme.in",
  "company": "Acme Insurance",
  "phone": "+91 98401 22841",
  "intent": "switch",
  "industry": "Insurance",
  "call_volume": "25,000 – 1 lakh / month",
  "current_stack": "Vapi",
  "message": "Team of 20, want to move next month.",
  "page_url": "https://snapserve.ai/solutions/vapi-alternative",
  "referrer": "https://www.google.com/",
  "user_agent": "Mozilla/5.0 ...",
  "submitted_at": "2026-08-29T12:04:11.482Z"
}
```

Field notes:

- `from` is always `leads@snapserve.ai`. The console should send any outbound lead mail with that address as the From header. FormSubmit cannot spoof From; its messages still originate from FormSubmit.
- `source` is `partner` on the partner page, or `solutions/<slug>` on funnel pages.
- `competitor`, `phone`, `current_stack`, and `message` may be empty strings.
- `intent` is one of `partner`, `switch`, `enterprise`, `other`.
- `industry` is one of `Real estate`, `Insurance`, `Healthcare`, `Lending & finance`, `EdTech & coaching`, `D2C & e-commerce`, `Collections`, `Travel & hospitality`, `Automotive`, `Other`.
- `call_volume` is one of `Just starting`, `Under 5,000 / month`, `5,000 – 25,000 / month`, `25,000 – 1 lakh / month`, `1 lakh+ / month`.
- Every other field is always present and non-empty.

Response: any `2xx` means accepted. The site ignores the response body.

## CORS

The endpoint is called from the browser, so it must allow the site origin:

```
Access-Control-Allow-Origin: https://snapserve.ai
Access-Control-Allow-Headers: content-type, x-api-key
Access-Control-Allow-Methods: POST, OPTIONS
```

and answer the `OPTIONS` preflight.

Because `VITE_LEADS_API_KEY` ships in the client bundle it is a routing token,
not a secret. Rate-limit the endpoint and treat the body as untrusted input.

## Suggested table

```sql
create table leads (
  id            bigserial primary key,
  source        text        not null,
  competitor    text        not null default '',
  name          text        not null,
  email         text        not null,
  company       text        not null,
  phone         text        not null default '',
  intent        text        not null,
  industry      text        not null default '',
  call_volume   text        not null default '',
  current_stack text        not null default '',
  message       text        not null default '',
  page_url      text        not null default '',
  referrer      text        not null default '',
  user_agent    text        not null default '',
  submitted_at  timestamptz not null,
  created_at    timestamptz not null default now()
);

create index leads_submitted_at_idx on leads (submitted_at desc);
create index leads_email_idx on leads (email);
```

## Turning it on

Set `VITE_LEADS_API_URL` (and `VITE_LEADS_API_KEY` if used) in the deploy
environment and rebuild. No code change needed — the site starts posting to the
API automatically and keeps sending email as well.
