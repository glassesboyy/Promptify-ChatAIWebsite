"use client";

import { useEffect, useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi2";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-primary bg-sidebar-accent hover:bg-sidebar-accent/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        {isDark ? (
          <HiMoon className="w-5 h-5 text-sidebar-accent-foreground transition-transform duration-300 group-hover:rotate-12" />
        ) : (
          <HiSun className="w-5 h-5 text-sidebar-accent-foreground transition-transform duration-300 group-hover:rotate-12" />
        )}
      </div>
    </button>
  );
}
