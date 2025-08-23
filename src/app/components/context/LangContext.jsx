"use client";
import { createContext, useContext, useState } from "react";
import translations from "../locales/translations";

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState("ar");

  const toggleLang = () => {
    setLang(lang === "ar" ? "en" : "ar");
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
