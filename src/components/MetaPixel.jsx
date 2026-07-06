import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initMetaPixel, isMetaPixelEnabled, trackPageView } from "../lib/metaPixel";

/**
 * Initializes Meta Pixel once and fires PageView on load + SPA route changes.
 */
export default function MetaPixel() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isMetaPixelEnabled()) return;
    initMetaPixel();
    trackPageView();
  }, [pathname]);

  return null;
}
