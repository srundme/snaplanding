import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import BlogIndexPage from "./pages/BlogIndexPage";
import BlogPostPage from "./pages/BlogPostPage";
import FunnelPage from "./pages/FunnelPage";
import MetaPixel from "./components/MetaPixel";
import GoogleAds from "./components/GoogleAds";

export default function App() {
  return (
    <>
      <MetaPixel />
      <GoogleAds />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/solutions/:slug" element={<FunnelPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </>
  );
}
