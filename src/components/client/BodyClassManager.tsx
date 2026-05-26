"use client";

import { useEffect } from "react";

type BodyClassManagerProps = {
  className: string;
};

export function BodyClassManager({ className }: BodyClassManagerProps) {
  useEffect(() => {
    const previous = document.body.className;
    document.body.className = className;
    return () => {
      document.body.className = previous;
    };
  }, [className]);

  return null;
}
