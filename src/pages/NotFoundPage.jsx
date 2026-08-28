import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import SnapServeLogo from "../components/SnapServeLogo";
import GlowButton from "../components/GlowButton";
import { SIGNUP_URL } from "../lib/links";

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page not found | SnapServe"
        description="This page does not exist. Return to SnapServe — AI voice agent platform."
        pathname="/404"
        noindex
      />
      <div className="dot-bg flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <SnapServeLogo variant="full" size="md" asLink href="/" />
        <p className="label mt-10 text-ink-3">404</p>
        <h1 className="headline-lg mt-3 max-w-md">
          This page isn’t on the{" "}
          <span className="brand-gradient-text">call list.</span>
        </h1>
        <p className="body-text mx-auto mt-4 max-w-sm">
          The link may be old or mistyped. Head home or start a free account.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <GlowButton href={SIGNUP_URL} hoverText="Get started →">
            Get started free
          </GlowButton>
          <Link to="/" className="outline-btn">
            Back to home
          </Link>
        </div>
      </div>
    </>
  );
}
