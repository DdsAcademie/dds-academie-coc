import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DDS Académie - Clash of Clans",
  description: "Site officiel du clan DDS Académie sur Clash of Clans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
