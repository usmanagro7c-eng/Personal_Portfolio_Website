import { useEffect } from "react";

const REVEAL_SELECTOR = '[data-reveal]:not([data-revealed="true"])';

/**
 * Fades elements carrying `data-reveal` in as they scroll into view.
 *
 * Re-scans whenever `deps` change so nodes mounted later — project cards after
 * a filter change or "view all" — are observed too. Elements already revealed
 * are skipped, so re-running is cheap and never replays an animation.
 */
export function useScrollReveal(deps: readonly unknown[] = []) {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    if (targets.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (const target of targets) target.dataset["revealed"] = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset["revealed"] = "true";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
