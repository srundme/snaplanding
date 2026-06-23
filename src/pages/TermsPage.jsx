import { Link } from "react-router-dom";
import LegalLayout, { Section, BulletList } from "../components/LegalLayout";

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      lastUpdated="June 2026"
      crossLink={
        <p>
          Also see our{" "}
          <Link to="/privacy" className="text-[#14B8A6] hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      }
    >
      <p>
        Welcome to SnapServe AI. These Terms of Service (&quot;Terms&quot;) govern your access to and
        use of the SnapServe AI platform (&quot;Service&quot;), operated by SnapServe AI
        (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By accessing or
        using the Service, you agree to be bound by these Terms. If you do not agree to these Terms,
        you may not access or use the Service.
      </p>

      <Section title="1. Acceptance of Terms">
        <p>By creating an account, accessing, or using SnapServe AI, you confirm that:</p>
        <BulletList
          items={[
            "You are at least 18 years of age or the legal age of majority in your jurisdiction.",
            "You have the legal capacity to enter into a binding agreement.",
            "You will comply with all applicable laws, regulations, and these Terms.",
            "The information you provide during registration is accurate, complete, and up to date.",
          ]}
        />
        <p className="mt-4">
          We reserve the right to modify these Terms at any time. We will notify you of significant
          changes by posting the updated Terms on our website and updating the &quot;Last
          updated&quot; date. Continued use of the Service after changes constitutes acceptance of
          the new Terms.
        </p>
      </Section>

      <Section title="2. Description of the Service">
        <p>SnapServe AI is an AI Voice Agent Orchestration platform that provides:</p>
        <BulletList
          items={[
            "Creation and management of AI-powered voice agents for automated phone conversations.",
            "Integration with telephony providers (Twilio, Plivo, Vobiz) for outbound and inbound calling.",
            "Integration with AI providers (OpenAI, Anthropic, Google, DeepSeek, etc.) for speech-to-text, language understanding, and text-to-speech.",
            "Google Calendar integration for automated meeting scheduling and Google Meet link generation.",
            "Campaign management for outbound calling at scale.",
            "Call analytics, transcription, and recording (when enabled).",
          ]}
        />
        <p className="mt-4">
          You are responsible for configuring your own provider API keys (ASR, LLM, TTS, telephony)
          and ensuring compliance with each provider&apos;s terms of service. SnapServe AI provides the
          orchestration layer but does not provide the underlying AI or telephony services directly.
        </p>
      </Section>

      <Section title="3. User Responsibilities">
        <p>As a user of SnapServe AI, you agree to:</p>
        <BulletList
          items={[
            "Provide accurate and complete information when creating your account and connecting third-party services.",
            "Maintain the security of your account credentials and API keys. You are responsible for all activity under your account.",
            "Obtain proper consent from individuals before calling them using our platform, in compliance with applicable laws (e.g., TCPA, GDPR, TRAI regulations).",
            "Ensure you have the legal right to use the phone numbers and contacts you upload to the platform.",
            "Comply with all applicable telemarketing, privacy, and data protection laws in your jurisdiction.",
            "Monitor your usage and wallet balance to avoid service interruptions.",
            "Not interfere with or disrupt the Service or its infrastructure.",
          ]}
        />
      </Section>

      <Section title="4. Prohibited Uses">
        <p>You may not use SnapServe AI for any of the following:</p>
        <BulletList
          items={[
            "Any illegal, fraudulent, or harmful purpose, including scams, phishing, or impersonation.",
            "Harassment, abuse, or threatening behavior toward individuals.",
            "Calling numbers on the Do Not Call (DNC) registry or individuals who have opted out.",
            "Spoofing caller ID or misrepresenting your identity.",
            "Recording calls without proper consent where required by law.",
            "Distributing malware, viruses, or other malicious code.",
            "Attempting to gain unauthorized access to our systems or other users' accounts.",
            "Reselling or redistributing the Service without written authorization.",
            "Using the Service to generate spam or unsolicited communications.",
            "Reverse engineering, decompiling, or disassembling any part of the Service.",
          ]}
        />
        <p className="mt-4">
          Violation of these prohibitions may result in immediate suspension or termination of your
          account, and we may report illegal activity to the appropriate authorities.
        </p>
      </Section>

      <Section title="5. Intellectual Property">
        <p>
          All content, software, and materials provided by SnapServe AI, including but not limited
          to:
        </p>
        <BulletList
          items={[
            "The SnapServe AI platform, website, and mobile interfaces.",
            "Logos, trademarks, brand names, and trade dress.",
            "Software code, algorithms, and documentation.",
            "User interfaces, designs, and visual elements.",
          ]}
        />
        <p className="mt-4">
          are the intellectual property of SnapServe AI and are protected by copyright, trademark,
          and other intellectual property laws. You may not use, copy, modify, or distribute our
          intellectual property without express written permission.
        </p>
        <p className="mt-4">
          You retain ownership of your data, including call recordings, transcripts, and contact
          lists. You grant us a limited license to process and store your data solely for the purpose
          of providing the Service.
        </p>
      </Section>

      <Section title="6. Limitation of Liability">
        <p>To the maximum extent permitted by law:</p>
        <BulletList
          items={[
            "SnapServe AI is provided \"as is\" and \"as available\" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.",
            "We do not warrant that the Service will be uninterrupted, error-free, or secure at all times.",
            "We are not responsible for the quality, accuracy, or legality of AI-generated responses during calls. The AI providers you connect are responsible for their model outputs.",
            "We are not liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, data loss, or business interruption, arising from your use of the Service.",
            "Our total liability for any claim arising from these Terms or the Service shall not exceed the amount you paid us in the 12 months preceding the claim, or $100, whichever is greater.",
          ]}
        />
      </Section>

      <Section title="7. Termination">
        <p>
          You may terminate your account at any time by deleting it from the Settings page. Upon
          termination:
        </p>
        <BulletList
          items={[
            "Your access to the Service will be immediately revoked.",
            "All your data will be permanently deleted within 30 days, except where retention is required by law.",
            "Any active campaigns or scheduled calls will be cancelled.",
            "Any remaining wallet balance will be forfeited unless otherwise agreed.",
          ]}
        />
        <p className="mt-4">
          We may suspend or terminate your account immediately if you violate these Terms, engage in
          illegal activity, or if required by law. We will notify you of such termination where
          possible.
        </p>
      </Section>

      <Section title="8. Governing Law">
        <p>
          These Terms shall be governed by and construed in accordance with the laws of India,
          without regard to its conflict of law provisions. Any dispute arising from these Terms or
          the Service shall be resolved through binding arbitration in Bengaluru, India, in
          accordance with the Arbitration and Conciliation Act, 1996. Each party waives any objection
          to this venue.
        </p>
        <p className="mt-4">
          Notwithstanding the above, either party may seek injunctive relief in a court of competent
          jurisdiction to prevent irreparable harm pending the resolution of arbitration.
        </p>
      </Section>

      <Section title="9. Contact Information">
        <p>
          If you have any questions about these Terms of Service, please contact us at:{" "}
          <a href="mailto:support@snapserve.ai" className="text-[#14B8A6] hover:underline">
            support@snapserve.ai
          </a>
        </p>
      </Section>
    </LegalLayout>
  );
}
