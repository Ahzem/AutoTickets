// ThemeContext.tsx
import React, { createContext, useState, useMemo } from 'react';

export type Theme = 'light' | 'dark' | 'cyberpunk';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme((curr) => {
          const themes: Theme[] = ['light', 'dark', 'cyberpunk'];
          const nextIndex = (themes.indexOf(curr) + 1) % themes.length;
          return themes[nextIndex];
        });
      },
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};