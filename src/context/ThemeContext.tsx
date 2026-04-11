import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { LocalStorageService } from "../utils/localStorage";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    LocalStorageService.getItem("theme") || "dark",
  );

  function toggleTheme() {
    setTheme((prev: "light" | "dark") => {
      const newTheme = prev === "dark" ? "light" : "dark";
      LocalStorageService.setItem("theme", newTheme);
      return newTheme;
    });
  }

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
