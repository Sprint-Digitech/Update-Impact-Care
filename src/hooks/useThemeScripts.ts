"use client";

import { useEffect } from "react";
import { EXTERNAL_SCRIPTS } from "@/config/scripts";
import {
  EKIT_CONFIG,
  ELEMENTOR_FRONTEND_CONFIG,
  ELEMENTSKIT_CONFIG,
  ELEMENTSKIT_PARALLAX,
  MEJS_L10N,
  WP_I18N,
  WPCF7_CONFIG,
  WP_MEDIAELEMENT_SETTINGS,
} from "@/config/inline-scripts";
import { loadScript, runInlineScript } from "@/utils/loadScript";

export function useThemeScripts() {
  useEffect(() => {
    let cancelled = false;

    async function init() {
      runInlineScript(ELEMENTSKIT_CONFIG, "elementskit-config");
      runInlineScript(ELEMENTSKIT_PARALLAX, "elementskit-parallax-config");

      for (const { src, id } of EXTERNAL_SCRIPTS) {
        if (cancelled) return;

        if (id === "wp-i18n-js") {
          await loadScript(src, id);
          runInlineScript(WP_I18N, "wp-i18n-js-after");
          continue;
        }

        if (id === "contact-form-7-js") {
          runInlineScript(WPCF7_CONFIG, "contact-form-7-js-before");
          await loadScript(src, id);
          continue;
        }

        if (id === "elementor-frontend-js") {
          runInlineScript(ELEMENTOR_FRONTEND_CONFIG, "elementor-frontend-js-before");
          await loadScript(src, id);
          continue;
        }

        if (id === "mediaelement-core-js") {
          runInlineScript(MEJS_L10N, "mediaelement-core-js-before");
          await loadScript(src, id);
          continue;
        }

        if (id === "wp-mediaelement-js") {
          runInlineScript(WP_MEDIAELEMENT_SETTINGS, "mediaelement-js-extra");
          await loadScript(src, id);
          continue;
        }

        if (id === "elementskit-elementor-js") {
          runInlineScript(EKIT_CONFIG, "elementskit-elementor-js-extra");
          await loadScript(src, id);
          continue;
        }

        await loadScript(src, id);
      }

      if (!cancelled) {
        window.jQuery?.(window).trigger("elementor/lazyload/observe");
      }
    }

    init().catch((error) => console.error("[theme-scripts]", error));

    return () => {
      cancelled = true;
    };
  }, []);
}
