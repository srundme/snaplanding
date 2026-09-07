/** Site-wide unlock so demo sections can autoplay after any real user gesture. */

let unlocked = false;
const waiters = new Set();

export function isAudioUnlocked() {
  if (unlocked) return true;
  try {
    if (navigator.userActivation?.hasBeenActive) {
      unlocked = true;
      return true;
    }
  } catch { /* noop */ }
  return false;
}

export function markAudioUnlocked() {
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
export function whenAudioUnlocked(cb) {
  if (isAudioUnlocked()) {
    cb();
    return () => {};
  }
  waiters.add(cb);
  return () => waiters.delete(cb);
}

/** Call from app shell — any click/tap/key on the page unlocks demo audio. */
export function installAudioUnlock() {
  if (typeof window === "undefined") return () => {};

  const unlock = () => markAudioUnlocked();
  const events = ["pointerdown", "touchstart", "keydown"];
  events.forEach((e) =>
    window.addEventListener(e, unlock, { capture: true, passive: true }),
  );

  return () =>
    events.forEach((e) =>
      window.removeEventListener(e, unlock, { capture: true }),
    );
}
