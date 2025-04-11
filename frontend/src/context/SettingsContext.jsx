import React, { createContext, useState, useContext } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    viewportSize: '100%',
    theme: {
      primary: '#3B82F6',
      secondary: '#1F2937',
      background: '#F3F4F6'
    }
  });

  const updateViewportSize = (size) => {
    setSettings(prev => ({ ...prev, viewportSize: size }));
  };

  const updateTheme = (colors) => {
    setSettings(prev => ({ ...prev, theme: { ...prev.theme, ...colors } }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateViewportSize, updateTheme }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
