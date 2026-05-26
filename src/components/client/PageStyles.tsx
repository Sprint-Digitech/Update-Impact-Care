"use client";

import { useEffect } from "react";

type PageStylesProps = {
  stylesheets: string[];
};

export function PageStyles({ stylesheets }: PageStylesProps) {
  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    for (const href of stylesheets) {
      const clean = href.split("?")[0];
      if (document.querySelector(`link[data-page-style="${clean}"]`)) continue;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = clean;
      link.dataset.pageStyle = clean;
      document.head.appendChild(link);
      links.push(link);
    }
    return () => {
      links.forEach((l) => l.remove());
    };
  }, [stylesheets]);

  return null;
}
