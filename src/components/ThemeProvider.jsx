import { createContext, useContext, useMemo, useState } from "react";
import { applyTheme, readStoredTheme } from "../lib/theme";

/* eslint-disable react-refresh/only-export-components */
const ThemeContext = createContext({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof document === "undefined") return "dark";
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "dark" || attr === "light") return attr;
    return readStoredTheme();
  });

  const value = useMemo(() => {
    const setTheme = (next) => {
      setThemeState(applyTheme(next));
    };
    return {
      theme,
      setTheme,
      toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
