import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <Sun size={13} strokeWidth={1.8} aria-hidden="true" />
      ) : (
        <Moon size={13} strokeWidth={1.8} aria-hidden="true" />
      )}
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
