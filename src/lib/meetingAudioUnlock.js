/** Site-wide unlock so Meeting Bot can autoplay after any real user gesture. */

let unlocked = false;
const waiters = new Set();

export function isMeetingAudioUnlocked() {
  if (unlocked) return true;
  try {
    if (navigator.userActivation?.hasBeenActive) {
      unlocked = true;
      return true;
    }
  } catch { /* noop */ }
  return false;
}

export function markMeetingAudioUnlocked() {
  if (unlocked) return;
  unlocked = true;
  waiters.forEach((cb) => {
    try {
      cb();
    } catch { /* noop */ }
  });
  waiters.clear();
}

/** Run once unlocked (immediately if already). Returns unsubscribe. */
export function whenMeetingAudioUnlocked(cb) {
  if (isMeetingAudioUnlocked()) {
    cb();
    return () => {};
  }
  waiters.add(cb);
  return () => waiters.delete(cb);
}

/** Call from app shell — any click/tap/key unlocks muted→unmuted meeting audio later. */
export function installMeetingAudioUnlock() {
  if (typeof window === "undefined") return () => {};

  const unlock = () => markMeetingAudioUnlocked();
  const events = ["pointerdown", "touchstart", "keydown"];
  events.forEach((e) =>
    window.addEventListener(e, unlock, { capture: true, passive: true }),
  );

  return () =>
    events.forEach((e) =>
      window.removeEventListener(e, unlock, { capture: true }),
    );
}
