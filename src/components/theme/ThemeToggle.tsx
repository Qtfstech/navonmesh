import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Initial read from localStorage or default to dark as requested
    const savedTheme = (localStorage.getItem("navonmesh_theme") as "dark" | "light") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "light") {
      document.documentElement.classList.add("theme-light");
    } else {
      document.documentElement.classList.remove("theme-light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("navonmesh_theme", newTheme);

    if (newTheme === "light") {
      document.documentElement.classList.add("theme-light");
    } else {
      document.documentElement.classList.remove("theme-light");
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tech shadow-sm ${
        theme === "dark"
          ? "border-white/15 bg-night-deep/80 text-night-foreground/80 hover:border-amber-400/50 hover:bg-night-surface hover:text-amber-300"
          : "border-slate-300 bg-white text-slate-700 hover:border-signal/50 hover:bg-slate-50 hover:text-signal"
      } ${className}`}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative size-4 flex items-center justify-center">
        {theme === "dark" ? (
          <Sun className="size-4 text-amber-400 transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="size-4 text-signal transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </div>
      <span className="hidden sm:inline-block font-mono text-[11px] font-semibold tracking-wide">
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
}
