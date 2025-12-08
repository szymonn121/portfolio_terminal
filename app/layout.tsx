import type { Metadata } from "next";
import "./globals.css";
import TerminalLayout from "@/components/TerminalLayout";

export const metadata: Metadata = {
  title: "Terminal Portfolio | Retro CRT Style",
  description: "A retro DOS/terminal style portfolio with CRT effects",
  keywords: ["portfolio", "developer", "terminal", "retro", "CRT"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-mono bg-terminal-dark text-terminal-green min-h-screen">
        <TerminalLayout>{children}</TerminalLayout>
      </body>
    </html>
  );
}
