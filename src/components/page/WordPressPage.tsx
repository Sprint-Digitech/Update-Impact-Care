"use client";
import { useMemo, useEffect } from "react";

import { HtmlBlock } from "@/components/ui/HtmlBlock";
import { BodyClassManager } from "@/components/client/BodyClassManager";
import { usePageScripts } from "@/hooks/usePageScripts";

type WordPressPageProps = {
  bodyHtml: string;
  bodyClass: string;
  elementorConfig: string | null;
};

export function WordPressPage({
  bodyHtml,
  bodyClass,
  elementorConfig,
}: WordPressPageProps) {
  usePageScripts(elementorConfig, bodyHtml);

  useEffect(() => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      const el = preloader as HTMLElement;
      el.style.transition = "opacity 0.4s ease";
      el.style.opacity = "0";
      const timer = setTimeout(() => {
        el.style.display = "none";
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [bodyHtml]);

  // Inject animated scroll indicator into the hero section
  useEffect(() => {
    let scrollIndicator: HTMLDivElement | null = null;
    let hero: Element | null = null;

    const timer = setTimeout(() => {
      // Prioritize the dedicated top-hero-banner, fallback to the very first main content section
      hero =
        document.querySelector(".top-hero-banner") ||
        document.querySelector('div[data-elementor-type="wp-page"] > .e-parent:first-of-type') ||
        document.querySelector('div[data-elementor-type="wp-post"] > .e-parent:first-of-type');

      if (hero && !hero.querySelector(".scroll-indicator-container")) {
        // Ensure the hero is positioned relatively so the absolute indicator attaches to it
        const heroStyle = window.getComputedStyle(hero);
        if (heroStyle.position === "static") {
          (hero as HTMLElement).style.position = "relative";
        }

        scrollIndicator = document.createElement("div");
        scrollIndicator.className = "scroll-indicator-container";
        scrollIndicator.innerHTML = `
          <div class="scroll-indicator-mouse">
            <div class="scroll-indicator-wheel"></div>
          </div>
          <div class="scroll-indicator-text">Scroll Down</div>
        `;

        scrollIndicator.addEventListener("click", () => {
          window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth",
          });
        });

        hero.appendChild(scrollIndicator);
      }
    }, 100); // Defer slightly to ensure HTMLBlock parses DOM

    return () => {
      clearTimeout(timer);
      if (hero && scrollIndicator && hero.contains(scrollIndicator)) {
        hero.removeChild(scrollIndicator);
      }
    };
  }, [bodyHtml]);

  // Some Elementor widgets can remain stuck in `elementor-invisible` when a
  // widget/chunk doesn't fully initialize in this Next.js runtime.
  // Removing it here prevents entire sections (e.g. video galleries) from
  // staying hidden.
  const sanitizedBodyHtml = useMemo(
    () => bodyHtml.replaceAll("elementor-invisible", ""),
    [bodyHtml]
  );

  return (
    <>
      <BodyClassManager className={bodyClass} />
      <HtmlBlock html={sanitizedBodyHtml} />
    </>
  );
}
