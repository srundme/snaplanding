export const THEME_KEY = "snapserve-theme";

export function readStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    /* private mode */
  }
  return "light";
}

export function applyTheme(theme) {
  const next = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", next === "dark" ? "#050607" : "#ffffff");
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    /* private mode */
  }
  return next;
}
