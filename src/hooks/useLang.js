import { createContext, useContext, useState, useEffect } from 'react';

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en');
  const isAr = lang === 'ar';

  const toggle = () => {
    const next = isAr ? 'en' : 'ar';
    setLang(next);
    document.documentElement.setAttribute('dir', next === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', next);
    document.title = next === 'ar'
      ? 'طاولة | Tawla — نظام تشغيل المطعم الذكي'
      : 'Tawla | طاولة — The Smart Restaurant OS';
  };

  const t = (en, ar) => (isAr ? ar : en);

  return (
    <LangContext.Provider value={{ lang, isAr, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
