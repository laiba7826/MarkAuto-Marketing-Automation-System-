import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';
type AccentColor = 'blue' | 'violet' | 'emerald';

interface ThemeSettings {
  theme: ThemeMode;
  accent: AccentColor;
}

interface ThemeContextValue {
  settings: ThemeSettings;
  setSettings: React.Dispatch<React.SetStateAction<ThemeSettings>>;
}

const defaultSettings: ThemeSettings = { theme: 'dark', accent: 'blue' };

const accentMap: Record<AccentColor, string> = {
  blue: '#0ea5e9',
  violet: '#8b5cf6',
  emerald: '#10b981',
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const resolveTheme = (mode: ThemeMode): 'light' | 'dark' => {
  if (mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return mode;
};

const applyTheme = (settings: ThemeSettings) => {
  const resolved = resolveTheme(settings.theme);
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.setProperty('--primary', accentMap[settings.accent]);
  document.documentElement.style.setProperty(
    '--primary-foreground',
    resolved === 'dark' ? '#ffffff' : '#ffffff'
  );
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    try {
      const saved = localStorage.getItem('markauto_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          theme: parsed.theme ?? defaultSettings.theme,
          accent: parsed.accent ?? defaultSettings.accent,
        };
      }
    } catch {
      /* use defaults */
    }
    return defaultSettings;
  });

  useEffect(() => {
    applyTheme(settings);
    try {
      const existing = localStorage.getItem('markauto_settings');
      const merged = existing ? { ...JSON.parse(existing), ...settings } : settings;
      localStorage.setItem('markauto_settings', JSON.stringify(merged));
    } catch {
      localStorage.setItem('markauto_settings', JSON.stringify(settings));
    }

    if (settings.theme !== 'system') return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyTheme(settings);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [settings]);

  return (
    <ThemeContext.Provider value={{ settings, setSettings }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
