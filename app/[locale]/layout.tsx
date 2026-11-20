import { ViewTransition } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/layout/Providers";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Engineering Journey",
  description:
    "Plataforma de documentación de ingeniería de Josué García — proyectos, aprendizaje y crecimiento técnico.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <div className="flex min-h-screen min-w-0 flex-col">
          <ViewTransition name="site-navigation" default="none"><Navbar /></ViewTransition>
          <main className="dot-pattern flex-1">{children}</main>
          <Footer />
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
