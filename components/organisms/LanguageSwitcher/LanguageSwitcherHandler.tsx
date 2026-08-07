"use client";

import { useState, useEffect } from "react";
import { languages } from "../../../data/language-list.json";
import LanguageSwitcher from "./LanguageSwitcher";
import { languageSwitcherLabels } from "../../../data/labels";

const languageList = languages.map((lang) => {
  const lastOpen = lang.lastIndexOf("(");
  return {
    label: lang.slice(0, lastOpen).trim(),
    code: lang.slice(lastOpen + 1, -1),
  };
});

export default function LanguageSwitcherHandler() {
  const firstCode = languageList[0] ? languageList[0].code : "";

  // both states stars as firstCode - a safe dafault with no localstorage
  // so it works during server rendering - real values in the effect
  const [main, setMain] = useState(firstCode);
  const [fallback, setFallback] = useState(firstCode);

  const handleSelect = (code: string, type: "primary" | "fallback") => {
    if (type === "primary") {
      setMain(code);
      localStorage.setItem("selectedMain", code);
    } else {
      setFallback(code);
      localStorage.setItem("selectedFallback", code);
    }
  };

  const handleReset = () => {
    setMain(firstCode);
    setFallback(firstCode);
    localStorage.setItem("selectedMain", firstCode);
    localStorage.setItem("selectedFallback", firstCode);
  };

  // run once after component mounts in the browser not the server (useEffect - only runs client-side)
  useEffect(() => {
    // defers the calls slightly so they dont run synchronously
    queueMicrotask(() => {
      setMain(localStorage.getItem("selectedMain") || firstCode); // reads what was last saved in localstorage from before - adds real value
      setFallback(localStorage.getItem("selectedFallback") || firstCode);
    });
  }, [firstCode]);

  return (
    <LanguageSwitcher
      languageList={languageList}
      selectedMain={main}
      selectedFallback={fallback}
      onReset={handleReset}
      onSelect={handleSelect}
      ariaLabel={languageSwitcherLabels.ariaLabel}
      legend={languageSwitcherLabels.legend}
      defaultLanguageLabel={languageSwitcherLabels.defaultLanguage}
      fallbackLanguageLabel={languageSwitcherLabels.fallbackLanguage}
      resetLabel={languageSwitcherLabels.reset}
    />
  );
}
