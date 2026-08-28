import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import BlogIndexPage from "./pages/BlogIndexPage";
import BlogPostPage from "./pages/BlogPostPage";
import FunnelPage from "./pages/FunnelPage";
import NotFoundPage from "./pages/NotFoundPage";
import MetaPixel from "./components/MetaPixel";
import GoogleAds from "./components/GoogleAds";

import { ThemeProvider } from "./components/ThemeProvider";
import { installMeetingAudioUnlock } from "./lib/meetingAudioUnlock";

export default function App() {
  useEffect(() => installMeetingAudioUnlock(), []);

  return (
    <ThemeProvider>
      <MetaPixel />
      <GoogleAds />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/solutions/:slug" element={<FunnelPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}
