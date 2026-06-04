import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://josueduardo.dev";
const ogImage = `${siteUrl}/og?title=Engineering%20Journey&description=Plataforma%20de%20documentaci%C3%B3n%20de%20ingenier%C3%ADa%20de%20Josu%C3%A9%20Garc%C3%ADa`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Engineering Journey — Josué García",
    template: "%s | Josué García",
  },
  description:
    "Plataforma de documentación de ingeniería de Josué García — proyectos, aprendizaje, trayectoria y crecimiento técnico.",

  keywords: [
    "Josué García",
    "Engineering Journey",
    "ingeniería",
    "software",
    "portfolio",
    "Key Institute",
    "El Salvador",
    "Next.js",
    "full stack",
  ],

  authors: [{ name: "Josué García", url: siteUrl }],
  creator: "Josué García",
  publisher: "Josué García",

  openGraph: {
    type: "website",
    locale: "es_SV",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "Engineering Journey",
    title: "Engineering Journey — Josué García",
    description:
      "Plataforma de documentación de ingeniería de Josué García — proyectos, aprendizaje, trayectoria y crecimiento técnico.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Engineering Journey — Josué García",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Engineering Journey — Josué García",
    description:
      "Plataforma de documentación de ingeniería de Josué García — proyectos, aprendizaje, trayectoria y crecimiento técnico.",
    images: [ogImage],
    creator: "@josueduarkey",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/computer-science-logo.svg",
    shortcut: "/computer-science-logo.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
