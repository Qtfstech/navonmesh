import { useEffect } from "react";

// Section headings and every card in a section's layout grids (hero excluded). Layout grids
// always set a gap; icon boxes that use `grid place-items-center` don't, so they're skipped.
const SELECTOR = [
  "main > section:not(#top) h2",
  'main > section:not(#top) .grid[class*="gap-"] > *',
  'main > footer .grid[class*="gap-"] > *',
].join(",");

/**
 * Cards and headings rise and fade in as they scroll into view, staggered within their grid.
 * Classes are added from JS, so content stays visible without it (and to crawlers), and it's
 * skipped entirely for visitors who prefer reduced motion.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const matched = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    // Animate the innermost cards only, so a card and its wrapper don't both move.
    const targets = matched.filter((el) => !matched.some((other) => other !== el && el.contains(other)));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    for (const el of targets) {
      const index = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty("--reveal-delay", `${Math.min(index, 8) * 80}ms`);
      el.classList.add("reveal");
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);
}
