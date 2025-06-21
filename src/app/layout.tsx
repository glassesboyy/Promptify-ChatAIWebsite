import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Promptify | Smart AI Chat via OpenRouter API",
  description:
    "Experience powerful AI conversations. Promptify uses OpenRouter's API to deliver responses from top AI models.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
