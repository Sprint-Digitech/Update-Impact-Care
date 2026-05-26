"use client";

import { useEffect } from "react";

export function ElementorLazyLoad() {
  useEffect(() => {
    const lazyloadRunObserver = () => {
      const lazyloadBackgrounds = document.querySelectorAll(
        ".e-con.e-parent:not(.e-lazyloaded)"
      );
      const lazyloadBackgroundObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const lazyloadBackground = entry.target;
              lazyloadBackground.classList.add("e-lazyloaded");
              lazyloadBackgroundObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "200px 0px 200px 0px" }
      );
      lazyloadBackgrounds.forEach((lazyloadBackground) => {
        lazyloadBackgroundObserver.observe(lazyloadBackground);
      });
    };

    const events = ["DOMContentLoaded", "elementor/lazyload/observe"] as const;
    events.forEach((event) => {
      if (event === "DOMContentLoaded" && document.readyState !== "loading") {
        lazyloadRunObserver();
        return;
      }
      document.addEventListener(event, lazyloadRunObserver);
    });

    lazyloadRunObserver();

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, lazyloadRunObserver);
      });
    };
  }, []);

  return null;
}
