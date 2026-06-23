import { Link } from "react-router-dom";
import LegalLayout, { Section, BulletList } from "../components/LegalLayout";

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated="June 2026"
      crossLink={
        <p>
          Also see our{" "}
          <Link to="/terms" className="text-[#14B8A6] hover:underline">
            Terms of Service
          </Link>
          .
        </p>
      }
    >
      <p>
        SnapServe AI (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
        This Privacy Policy explains how we collect, use, store, and protect your information when
        you use our AI Voice Agent Orchestration platform. By using SnapServe AI, you agree to the
        practices described in this policy.
      </p>

      <Section title="What Data We Collect">
        <p>We collect the following types of information:</p>
        <BulletList
          items={[
            "Google Account Information: When you sign in with Google, we collect your name, email address, and profile picture. This is provided by Google OAuth and used solely for authentication and user identification within our platform.",
            "Google Calendar Data: When you connect your Google Calendar, we access your calendar events, availability, and time zone information. This is necessary for automated meeting scheduling and Google Meet link generation.",
            "Voice Call Data: We store call transcripts, recordings (if enabled), and call metadata (duration, timestamps, outcomes) to enable call analysis and quality monitoring.",
            "Usage Data: We collect information about how you interact with our platform, including feature usage, API calls, and error logs, to improve our service.",
            "Payment Information: We store transaction records and wallet balance information. We do not store full credit card details — these are handled securely by our payment processor.",
          ]}
        />
      </Section>

      <Section title="Why We Collect It">
        <p>We use your data for the following purposes:</p>
        <BulletList
          items={[
            "Authentication: To verify your identity and provide secure access to your account.",
            "Calendar-Based Booking: To read your availability, create appointments, and generate Google Meet links for scheduled meetings.",
            "Voice Agent Operations: To enable your AI voice agents to make and receive calls, store transcripts, and track call outcomes.",
            "Service Improvement: To analyze usage patterns, fix bugs, and develop new features.",
            "Customer Support: To respond to your inquiries and troubleshoot issues.",
          ]}
        />
      </Section>

      <Section title="How We Use Google User Data">
        <p>Our use of Google user data is strictly limited to the following:</p>
        <BulletList
          items={[
            "We use Google Calendar data only for scheduling purposes — reading your free/busy times, creating events, and generating Meet links.",
            "We use Google OAuth data only for authentication — verifying your identity and populating your profile.",
            "We never sell your Google user data to third parties.",
            "We never use your Google data for advertising or marketing purposes.",
            "We never share your Google data with unauthorized third parties.",
            "Access is limited to the minimum scope required: calendar access is only used when you explicitly connect your calendar, and OAuth data is only used during sign-in.",
          ]}
        />
      </Section>

      <Section title="Google API Limited Use Disclosure">
        <p>
          SnapServe AI&apos;s use of information received from Google APIs adheres to the Google API
          Services User Data Policy, including the Limited Use requirements.
        </p>
        <BulletList
          items={[
            "Scope used: We request the https://www.googleapis.com/auth/calendar.events scope solely to create and manage Google Calendar events on behalf of the authenticated user for meeting scheduling purposes.",
            "No advertising use: Data obtained through Google APIs is never used to serve advertisements and is not used for any advertising-related purpose.",
            "No data sales: We do not sell, rent, or transfer Google user data to any third party.",
            "No unauthorized sharing: We do not share Google user data with any third party except as necessary to provide the scheduling feature (e.g., writing the event back to Google Calendar on your behalf).",
            "Revoke access: You can revoke SnapServe AI's access to your Google Calendar at any time from your Google Account Permissions page. Revoking access disables calendar-based scheduling features but does not delete your SnapServe account.",
          ]}
        />
      </Section>

      <Section title="How We Store and Protect Data">
        <p>We take data security seriously:</p>
        <BulletList
          items={[
            "Encryption: All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.",
            "Secure Infrastructure: We host on Replit's secure infrastructure with industry-standard security practices.",
            "Access Controls: Only authorized personnel can access production data, and all access is logged and audited.",
            "API Key Protection: Your provider API keys (Twilio, OpenAI, etc.) are encrypted at rest using AES-256-GCM. We only show the last 4 characters in the UI.",
            "Session Management: Authentication tokens are signed with HMAC-SHA256 and have a 30-day expiration. Tokens are stored securely in your browser's localStorage.",
            "Regular Audits: We conduct regular security reviews and vulnerability assessments.",
          ]}
        />
      </Section>

      <Section title="Third-Party Services">
        <p>We use the following third-party services to provide our platform:</p>
        <BulletList
          items={[
            "Google OAuth: For user authentication and identity verification.",
            "Google Calendar API: For reading availability and creating calendar events.",
            "Google Meet API: For generating video conference links.",
            "Telephony Providers (Twilio, Plivo, Vobiz): For making and receiving voice calls. You bring your own provider keys.",
            "AI Providers (OpenAI, Anthropic, Google, DeepSeek, etc.): For speech-to-text, language model, and text-to-speech processing. You bring your own provider keys.",
            "Payment Processor: For handling wallet top-ups and billing.",
          ]}
        />
        <p className="mt-4">
          Each third-party service is governed by its own privacy policy. We recommend reviewing
          those policies for complete information.
        </p>
      </Section>

      <Section title="Your Rights">
        <p>You have the following rights regarding your data:</p>
        <BulletList
          items={[
            "Access: You can view all your data within the SnapServe AI dashboard, including call logs, transcripts, and calendar connections.",
            "Delete: You can delete your account and all associated data at any time from the Settings page. This permanently removes all your data from our systems.",
            "Revoke Google Permissions: You can revoke SnapServe AI's access to your Google data at any time through your Google Account Permissions page. Revoking access will disable calendar-based features but will not delete your account data.",
            "Data Portability: You can export your call logs and campaign data in CSV format from the dashboard.",
            "Correction: You can update your profile information and correct any inaccurate data through the Settings page.",
          ]}
        />
      </Section>

      <Section title="Data Retention">
        <p>We retain your data for as long as your account is active. When you delete your account:</p>
        <BulletList
          items={[
            "All personal data is permanently deleted within 30 days.",
            "Call recordings and transcripts are deleted immediately.",
            "Aggregated, anonymized analytics data may be retained for service improvement purposes.",
          ]}
        />
      </Section>

      <Section title="Contact Information">
        <p>
          If you have any questions about this Privacy Policy or your data, please contact us at:{" "}
          <a href="mailto:support@snapserve.ai" className="text-[#14B8A6] hover:underline">
            support@snapserve.ai
          </a>
        </p>
      </Section>
    </LegalLayout>
  );
}
