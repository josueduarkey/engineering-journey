import { redirect } from "next/navigation";
import type { Locale } from "@/lib/content";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/about`);
}
