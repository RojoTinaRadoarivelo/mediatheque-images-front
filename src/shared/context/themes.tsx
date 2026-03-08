import React, { createContext, useContext, useState } from "react";
export type ThemeType = "Light" | "Dark";
interface ThemeContextProps {
  Theme: ThemeType;
  setTheme: (Theme: ThemeType) => void;
}
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [Theme, setThemeState] = useState<ThemeType>(
    (localStorage.getItem("Theme") as ThemeType) || "Light",
  );
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem("Theme", newTheme);
  };
  return (
    <ThemeContext.Provider value={{ Theme, setTheme }}>
      {" "}
      {children}{" "}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
