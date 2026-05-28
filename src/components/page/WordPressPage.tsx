"use client";
import { useMemo, useEffect } from "react";

import { HtmlBlock } from "@/components/ui/HtmlBlock";
import { BodyClassManager } from "@/components/client/BodyClassManager";
import { usePageScripts } from "@/hooks/usePageScripts";

export type WordPressPageProps = {
  bodyHtml: string;
  bodyClass: string;
  elementorConfig: string | null;
  children?: React.ReactNode;
};

export function WordPressPage({
  bodyHtml,
  bodyClass,
  elementorConfig,
  children,
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

  // Inject the scroll indicator into the page hero, never into the header.
  useEffect(() => {
    let scrollIndicator: HTMLDivElement | null = null;
    let hero: Element | null = null;

    const heroSelectors = [
      ".top-hero-banner",
      ".page-header.bg-section",
      'main#content .e-parent:first-of-type',
      'main#content div[data-elementor-type="wp-page"] > .e-parent:first-of-type',
      'main#content div[data-elementor-type="wp-post"] > .e-parent:first-of-type',
      'div[data-elementor-type="wp-page"] > .e-parent:first-of-type',
      'div[data-elementor-type="wp-post"] > .e-parent:first-of-type',
    ];

    const findHero = () => {
      for (const selector of heroSelectors) {
        const candidates = document.querySelectorAll(selector);

        for (const candidate of candidates) {
          if (!candidate.closest(".ekit-template-content-header")) {
            return candidate;
          }
        }
      }

      return null;
    };

    const timer = setTimeout(() => {
      hero = findHero();

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
      {children ? children : <HtmlBlock html={sanitizedBodyHtml} />}
    </>
  );
}
