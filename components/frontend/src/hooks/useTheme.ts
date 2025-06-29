import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import { ThemeContextType } from "../contexts/ThemeContext";

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};