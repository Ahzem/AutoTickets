// src/hooks/useTheme.ts
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'cyberpunk';

interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
}

const themeConfigs: Record<Theme, ThemeColors> = {
  light: {
    background: '#ffffff',
    text: '#2d3436',
    primary: '#4e54c8',
    secondary: '#8f94fb',
    accent: '#4776e6'
  },
  dark: {
    background: '#1a1a1a',
    text: '#ffffff',
    primary: '#4e54c8',
    secondary: '#0307583f',
    accent: '#4776e6'
  },
  cyberpunk: {
    background: '#120458',
    text: '#05d9e8',
    primary: '#ff2a6d',
    secondary: '#05d9e8',
    accent: '#7700ff'
  }
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    // Apply theme colors to CSS variables
    Object.entries(themeConfigs[theme]).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [theme]);

  return {
    theme,
    themeColors: themeConfigs[theme],
    setTheme: (newTheme: Theme) => setTheme(newTheme),
    toggleTheme: () => {
      const themes: Theme[] = ['light', 'dark', 'cyberpunk'];
      const currentIndex = themes.indexOf(theme);
      const nextIndex = (currentIndex + 1) % themes.length;
      setTheme(themes[nextIndex]);
    }
  };
};