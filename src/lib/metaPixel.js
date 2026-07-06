const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID?.trim() || "";

let initialized = false;

export function getMetaPixelId() {
  return PIXEL_ID || null;
}

export function isMetaPixelEnabled() {
  return Boolean(PIXEL_ID);
}

/**
 * Load Meta Pixel script asynchronously and initialize once.
 * Safe to call multiple times — duplicate init is prevented.
 */
export function initMetaPixel() {
  if (!PIXEL_ID || typeof window === "undefined") return false;

  if (initialized || window.fbq) {
    initialized = true;
    return true;
  }

  /* Meta Pixel bootstrap — loads fbevents.js async */
  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  window.fbq("init", PIXEL_ID);
  initialized = true;
  return true;
}

export function trackPageView() {
  if (!PIXEL_ID || typeof window === "undefined") return;
  if (!initialized && !initMetaPixel()) return;
  if (window.fbq) window.fbq("track", "PageView");
}
