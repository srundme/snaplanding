const ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID?.trim() || "";

let initialized = false;

export function getGoogleAdsId() {
  return ADS_ID || null;
}

export function isGoogleAdsEnabled() {
  return Boolean(ADS_ID);
}

/**
 * Load gtag.js asynchronously and initialize once.
 * Safe to call multiple times — duplicate init is prevented.
 */
export function initGoogleAds() {
  if (!ADS_ID || typeof window === "undefined") return false;

  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
  }

  if (!initialized) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
    document.head.appendChild(script);

    window.gtag("config", ADS_ID);
    initialized = true;
  }

  return true;
}

export function trackGoogleAdsPageView(pathname = window.location?.pathname || "/") {
  if (!ADS_ID || typeof window === "undefined") return;
  if (!initialized && !initGoogleAds()) return;
  if (window.gtag) {
    window.gtag("config", ADS_ID, { page_path: pathname });
  }
}
