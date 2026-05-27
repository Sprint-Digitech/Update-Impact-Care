"use client";

import { useEffect, useRef } from "react";
import { runInlineScript } from "@/utils/loadScript";

function normalizeElementorConfig(raw: string): string {
  return raw
    .replaceAll(
      "https:\\/\\/demo.awaikenthemes.com\\/dispnsary\\/wp-content\\/plugins\\/elementor\\/assets\\/",
      "\\/vendor\\/plugins\\/elementor\\/assets\\/"
    )
    .replaceAll(
      "https://demo.awaikenthemes.com/dispnsary/wp-content/plugins/elementor/assets/",
      "/vendor/plugins/elementor/assets/"
    )
    .replaceAll(
      "https:\\/\\/demo.awaikenthemes.com\\/dispnsary\\/wp-content\\/uploads",
      "\\/assets\\/uploads"
    )
    .replaceAll(
      "https://demo.awaikenthemes.com/dispnsary/wp-content/uploads",
      "/assets/uploads"
    )
    .replaceAll(
      "https:\\/\\/demo.awaikenthemes.com\\/dispnsary\\/wp-admin\\/admin-ajax.php",
      "\\/api\\/admin-ajax"
    )
    .replaceAll(
      "https://demo.awaikenthemes.com/dispnsary/wp-admin/admin-ajax.php",
      "/api/admin-ajax"
    );
}

/** Re-run Elementor + theme init when navigating between pages */
export function usePageScripts(elementorConfig: string | null, bodyHtml: string) {
  const ran = useRef(false);

  useEffect(() => {
    let elementorInitHadError = false;
    if (elementorConfig) {
      const normalized = normalizeElementorConfig(elementorConfig);
      const existing = document.getElementById("elementor-frontend-js-before");
      if (existing) {
        existing.textContent = `var elementorFrontendConfig = ${normalized};`;
      } else {
        runInlineScript(
          `var elementorFrontendConfig = ${normalized};`,
          "elementor-frontend-js-before"
        );
      }
    }

    const jQuery = window.jQuery as
      | ((selector?: unknown) => {
          trigger: (event: string) => void;
        })
      | undefined;

    jQuery?.(window).trigger("elementor/lazyload/observe");

    // Setup lazyload observer for Elementor container backgrounds
    const lazyloadBackgrounds = document.querySelectorAll(
      ".e-con.e-parent:not(.e-lazyloaded)"
    );
    const lazyloadBackgroundObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyloadBackground = entry.target;
            lazyloadBackground.classList.add("e-lazyloaded");
            lazyloadBackgroundObserver.unobserve(lazyloadBackground);
          }
        });
      },
      { rootMargin: "200px 0px 200px 0px" }
    );
    lazyloadBackgrounds.forEach((lazyloadBackground) => {
      lazyloadBackgroundObserver.observe(lazyloadBackground);
    });

    if (typeof window.elementorFrontend !== "undefined") {
      try {
        window.elementorFrontend?.init?.();
      } catch {
        elementorInitHadError = true;
        /* already initialized */
      }
    }

    jQuery?.(document).trigger("ready");

    const gsap = window.gsap as { registerPlugin?: (p: unknown) => void } | undefined;
    const scrollTrigger = window.ScrollTrigger as { refresh?: () => void } | undefined;
    scrollTrigger?.refresh?.();

    if (!ran.current) {
      ran.current = true;
    }

    // Fallback: if Elementor didn't unhide elements (missing chunk / init issues),
    // ensure widgets become visible so galleries/videos render.
    const timer = window.setTimeout(() => {
      const invisible = Array.from(document.querySelectorAll<HTMLElement>(".elementor-invisible"));
      if (!invisible.length) return;
      // If elements are still invisible after init, reveal them so content is visible.
      // (Elementor normally removes this class as part of its animation/lazy-load logic.)
      void elementorInitHadError;

      for (const el of invisible) {
        const settings = el.getAttribute("data-settings") || "";
        const animation = settings.includes("fadeInUp") ? "fadeInUp" : null;
        el.classList.remove("elementor-invisible");
        if (animation) {
          el.classList.add("animated", `elementor-animation-${animation}`);
        }
      }
    }, 220);

    return () => {
      lazyloadBackgroundObserver.disconnect();
      window.clearTimeout(timer);
    };
  }, [elementorConfig, bodyHtml]);
}

declare global {
  interface Window {
    elementorFrontend?: { init?: () => void };
    jQuery?: (target?: unknown) => { trigger: (event: string) => void };
    gsap?: { registerPlugin?: (p: unknown) => void };
    ScrollTrigger?: { refresh?: () => void };
  }
}
