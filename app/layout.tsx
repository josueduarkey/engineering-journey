import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Engineering Journey",
    default: "Engineering Journey",
  },
  description:
    "Plataforma de documentación de ingeniería de Josué García - proyectos, aprendizaje y crecimiento técnico.",
  icons: {
    icon: "/computer-science-logo.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={inter.variable}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
