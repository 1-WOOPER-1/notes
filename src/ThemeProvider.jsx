import { useState, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext.js";
import { LocalStorageService } from "./utils/localStorage.js";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    LocalStorageService.getItem("theme") || "dark"
  );

  function toggleTheme() {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      LocalStorageService.setItem("theme", newTheme);
      return newTheme;
    });
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
