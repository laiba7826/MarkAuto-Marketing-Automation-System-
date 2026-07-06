import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { useTheme } from '../../context/ThemeContext';

const themes = [
  { id: 'dark' as const, name: 'Dark', description: 'Modern high-contrast dashboard (default).' },
  { id: 'light' as const, name: 'Light', description: 'Bright professional interface.' },
  { id: 'system' as const, name: 'System', description: 'Follow your device preference.' },
];

const colorPresets = [
  { id: 'blue' as const, name: 'Ocean blue', className: 'bg-sky-500' },
  { id: 'violet' as const, name: 'Violet glow', className: 'bg-violet-500' },
  { id: 'emerald' as const, name: 'Emerald', className: 'bg-emerald-500' },
];

export const SettingsPage = () => {
  const { settings, setSettings } = useTheme();
  const [prefs, setPrefs] = useState({ notif: true, twoFa: false, digest: true });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('markauto_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        setPrefs({
          notif: parsed.notif ?? true,
          twoFa: parsed.twoFa ?? false,
          digest: parsed.digest ?? true,
        });
      }
    } catch {
      /* use defaults */
    }
  }, []);

  useEffect(() => {
    try {
      const existing = localStorage.getItem('markauto_settings');
      const merged = existing ? { ...JSON.parse(existing), ...prefs, ...settings } : { ...prefs, ...settings };
      localStorage.setItem('markauto_settings', JSON.stringify(merged));
    } catch {
      /* ignore */
    }
  }, [prefs, settings]);

  const toggleSetting = (key: 'notif' | 'twoFa' | 'digest') => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader title="System Settings" subtitle="Configure platform-wide preferences and visual theme." />

      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="card space-y-6">
          <div>
            <h2 className="section-title">Platform preferences</h2>
            <p className="section-muted mt-2">Set your system behavior and notification preferences.</p>
          </div>
          <div className="surface-card space-y-4">
            <label className="flex items-center justify-between gap-4">
              <div>
                <p className="font-bold">Email notifications</p>
                <p className="section-muted">Send alerts for campaign updates and approvals.</p>
              </div>
              <button onClick={() => toggleSetting('notif')} className={`w-12 h-6 rounded-full relative ${prefs.notif ? 'bg-primary-600' : 'bg-blue-800/50'}`}>
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${prefs.notif ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </label>
            <label className="flex items-center justify-between gap-4">
              <div>
                <p className="font-bold">Two-factor authentication</p>
                <p className="section-muted">Add extra security for admin and editor access.</p>
              </div>
              <button onClick={() => toggleSetting('twoFa')} className={`w-12 h-6 rounded-full relative ${prefs.twoFa ? 'bg-primary-600' : 'bg-blue-800/50'}`}>
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${prefs.twoFa ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </label>
            <label className="flex items-center justify-between gap-4">
              <div>
                <p className="font-bold">Weekly digest</p>
                <p className="section-muted">Summaries of campaign performance delivered via email.</p>
              </div>
              <button onClick={() => toggleSetting('digest')} className={`w-12 h-6 rounded-full relative ${prefs.digest ? 'bg-primary-600' : 'bg-blue-800/50'}`}>
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${prefs.digest ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </label>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="section-title">Theme settings</h2>
                <p className="section-muted">Pick a polished workspace style for your team.</p>
              </div>
              <div className="text-sm font-semibold section-muted">Current: {settings.theme}</div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {themes.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => setSettings(prev => ({ ...prev, theme: theme.id }))}
                  className={`theme-option ${settings.theme === theme.id ? 'theme-option-active' : ''}`}
                >
                  <p className="font-bold">{theme.name}</p>
                  <p className="section-muted mt-1">{theme.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="section-title">Accent color</h2>
                <p className="section-muted">Choose the highlight color used across the app.</p>
              </div>
              <div className="rounded-full py-1 px-3 text-sm font-semibold surface-card">{settings.accent}</div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {colorPresets.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => setSettings(prev => ({ ...prev, accent: preset.id }))}
                  className={`rounded-3xl p-4 transition shadow-sm ${preset.className} ${settings.accent === preset.id ? 'ring-2 ring-offset-2 ring-primary-600' : ''}`}
                >
                  <span className="text-white font-bold text-sm">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
