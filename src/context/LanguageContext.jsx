import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Function to detect browser language
const detectBrowserLanguage = () => {
  const browserLang = navigator.language || navigator.languages[0];
  
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('en')) return 'en';
  if (browserLang.startsWith('nl')) return 'nl'; // Dutch
  
  return 'es'; // Default to Spanish
};

export const LanguageProvider = ({ children, defaultLanguage, disableChanging = false }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // If defaultLanguage is provided, use it
    if (defaultLanguage) return defaultLanguage;
    
    // Otherwise check localStorage first, then detect browser language
    const savedLanguage = localStorage.getItem('preferred-language');
    return savedLanguage || detectBrowserLanguage();
  });

  const changeLanguage = (language) => {
    if (disableChanging) return; // Prevent changing if disabled
    setCurrentLanguage(language);
    localStorage.setItem('preferred-language', language);
  };

  useEffect(() => {
    // Save language preference whenever it changes
    if (!disableChanging) {
      localStorage.setItem('preferred-language', currentLanguage);
    }
  }, [currentLanguage, disableChanging]);

  const value = {
    currentLanguage,
    changeLanguage,
    availableLanguages: [
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'nl', name: 'Nederlands', flag: '🇳🇱' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
