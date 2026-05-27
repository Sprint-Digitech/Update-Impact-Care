"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";

type HtmlBlockProps = {
  html: string;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
  suppressHydrationWarning?: boolean;
};

export function HtmlBlock({
  html,
  className,
  as: Tag = "div",
  suppressHydrationWarning = true,
}: HtmlBlockProps) {
  const innerHTML = useMemo(() => ({ __html: html }), [html]);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest("a");

    if (!anchor) return;
    
    const href = anchor.getAttribute("href");
    const targetAttr = anchor.getAttribute("target");
    
    // Ignore if no href, or if opening in a new tab/window
    if (!href || targetAttr === "_blank" || e.ctrlKey || e.metaKey || e.shiftKey) return;
    
    // Ignore hashes
    if (href.startsWith("#")) return;
    
    // Handle same origin internal navigation
    if (href.startsWith("/") && !href.startsWith("//")) {
      e.preventDefault();
      router.push(href);
    } else if (href.startsWith(window.location.origin)) {
      e.preventDefault();
      router.push(href.replace(window.location.origin, "") || "/");
    }
  };

  return React.createElement(Tag, {
    className,
    dangerouslySetInnerHTML: innerHTML,
    suppressHydrationWarning,
    onClick: handleClick,
  });
}
