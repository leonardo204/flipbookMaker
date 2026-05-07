import { createContext, useContext, useState } from "react";

export interface AppSettings {
  claudePath: string;
  claudeVerified: boolean;
  outputPath: string;
  autoUpdate: boolean;
  // Confluence (API 토큰은 OS Keychain에서 별도 관리)
  atlassianUrl: string;
  confluenceEmail: string;
  spaceKey: string;
  parentPageUrl: string;
  confluenceVerified: boolean;
  // Figma
  figmaToken: string;
  figmaVerified: boolean;
}

const defaultSettings: AppSettings = {
  claudePath: "",
  claudeVerified: false,
  outputPath: "",
  autoUpdate: true,
  atlassianUrl: "",
  confluenceEmail: "",
  spaceKey: "",
  parentPageUrl: "",
  confluenceVerified: false,
  figmaToken: "",
  figmaVerified: false,
};

const SettingsContext = createContext<{
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
}>({ settings: defaultSettings, updateSettings: () => {} });

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const stored = localStorage.getItem("flipbookmaker-settings");
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const updateSettings = (partial: Partial<AppSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      localStorage.setItem("flipbookmaker-settings", JSON.stringify(next));
      return next;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
