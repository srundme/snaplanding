import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  initGoogleAds,
  isGoogleAdsEnabled,
  trackGoogleAdsPageView,
} from "../lib/googleAds";

/**
 * Initializes Google Ads gtag once and tracks page views on load + SPA route changes.
 */
export default function GoogleAds() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isGoogleAdsEnabled()) return;
    initGoogleAds();
    trackGoogleAdsPageView(pathname);
  }, [pathname]);

  return null;
}
