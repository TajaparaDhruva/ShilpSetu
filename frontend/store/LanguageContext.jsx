import React, { createContext, useContext, useState } from 'react';
import { getTranslation } from '@/translations';import { jsx as _jsx } from "react/jsx-runtime";







const LanguageContext = /*#__PURE__*/createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('hi'); // Default Hindi for artisan accessibility

  const t = (key, params) => {
    return getTranslation(language, key, params);
  };

  return (/*#__PURE__*/
    _jsx(LanguageContext.Provider, { value: { language, setLanguage, t }, children:
      children }
    ));

};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};