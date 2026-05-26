import { HtmlBlock } from "@/components/ui/HtmlBlock";

type SectionProps = {
  html: string;
};

export function Section({ html }: SectionProps) {
  return <HtmlBlock html={html} suppressHydrationWarning />;
}
