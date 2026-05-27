"use client";

import dynamic from "next/dynamic";
import type { WordPressPageProps } from "./WordPressPage";

export const ClientWordPressPage = dynamic(
  () => import("./WordPressPage").then((mod) => mod.WordPressPage),
  { ssr: false }
);
