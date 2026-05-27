import type { Metadata } from "next";
import { Stylesheets } from "@/components/styles/Stylesheets";
import { ThemeScripts } from "@/components/client/ThemeScripts";
import { ElementorLazyLoad } from "@/components/client/ElementorLazyLoad";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Dispnsary – Medical WordPress Theme",
  description:
    "Dispnsary medical and healthcare website – modern clinic, pharmacy, and doctor appointment landing page.",
  icons: {
    icon: "/assets/uploads/2024/11/favicon.png",
    apple: "/assets/uploads/2024/11/favicon.png",
  },
  openGraph: {
    title: "Dispnsary – Medical WordPress Theme",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <Stylesheets />
      </head>
      <body className="wp-theme-dispnsary tt-magic-cursor" suppressHydrationWarning>
        {children}
        <ThemeScripts />
        <ElementorLazyLoad />
      </body>
    </html>
  );
}
