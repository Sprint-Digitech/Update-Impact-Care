"use client";
import { useMemo } from "react";

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
  usePageScripts(elementorConfig);

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
