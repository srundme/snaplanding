import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import MetaPixel from "./components/MetaPixel";
import GoogleAds from "./components/GoogleAds";
import { installAudioUnlock } from "./lib/audioUnlock";

import { ThemeProvider } from "./components/ThemeProvider";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const BlogIndexPage = lazy(() => import("./pages/BlogIndexPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const FunnelPage = lazy(() => import("./pages/FunnelPage"));
const PartnerPage = lazy(() => import("./pages/PartnerPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } else {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  useEffect(() => installAudioUnlock(), []);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <MetaPixel />
      <GoogleAds />
      <Suspense fallback={<div className="min-h-screen bg-surface-0" aria-hidden="true" />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/solutions/:slug" element={<FunnelPage />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}
