"use client";

import { useMemo } from "react";

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

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={innerHTML}
      suppressHydrationWarning={suppressHydrationWarning}
    />
  );
}
