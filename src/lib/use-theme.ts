import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "mua-theme";

/**
 * Runs before first paint so the stored preference is applied without a flash
 * of the wrong palette. Inlined as a string in src/routes/__root.tsx.
 */
export const themeBootstrapScript = `(function(){var e=document.documentElement;e.classList.add('js');try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)e.classList.add('dark')}catch(_){}})();`;

function currentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(currentTheme());
  }, []);

  const toggle = useCallback(() => {
    setTheme((previous) => {
      const next: Theme = previous === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Private mode or blocked storage: the class toggle above still applies.
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
