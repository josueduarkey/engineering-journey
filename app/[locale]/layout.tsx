import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/layout/Providers";
import Sidebar from "@/components/navigation/Sidebar";
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
        <div className="flex min-h-screen">
          <Sidebar />
          {/* Content column — offset on mobile for the fixed top bar */}
          <div className="flex min-w-0 flex-1 flex-col pt-14 lg:pt-0">
            <main className="dot-pattern flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
