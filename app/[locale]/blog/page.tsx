import { ViewTransition } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import SectionHeader from "@/components/shared/SectionHeader";
import TagList from "@/components/shared/TagList";
import { getAllPosts, formatDate } from "@/lib/blog";
import type { BlogPost } from "@/types/blog";
import type { Locale } from "@/lib/content";

const copy: Record<Locale, {
  eyebrow: string;
  title: string;
  description: string;
  readMore: string;
  empty: string;
}> = {
  es: {
    eyebrow: "Blog",
    title: "Notas de un ingeniero en formación.",
    description: "Artículos técnicos, reflexiones sobre aprendizaje y documentación del proceso de estudiar Ingeniería en Key Institute.",
    readMore: "Leer artículo",
    empty: "Los primeros artículos están en camino.",
  },
  en: {
    eyebrow: "Blog",
    title: "Notes from an engineer in training.",
    description: "Technical articles, reflections on learning, and documentation of the process of building systems.",
    readMore: "Read article",
    empty: "First articles are on the way.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = copy[locale];
  const ogImage = `/og?title=${encodeURIComponent("Blog")}&description=${encodeURIComponent(c.description)}`;
  return {
    title: "Blog",
    description: c.description,
    alternates: { canonical: `/${locale}/blog` },
    openGraph: {
      title: "Blog — Josué García",
      description: c.description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: "Blog — Josué García", images: [ogImage] },
  };
}

function ArticleCard({
  post,
  locale,
  readMore,
}: {
  post: BlogPost;
  locale: Locale;
  readMore: string;
}) {
  return (
    <article className="group flex flex-col rounded-sm border border-(--border-color) bg-(--bg) overflow-hidden transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      {/* Cover — ViewTransition name matches the article page for shared morph */}
      <ViewTransition name={`blog-cover-${post.slug}`} share="morph">
        <div className="relative h-44 w-full shrink-0 overflow-hidden bg-linear-to-br from-primary/15 via-primary/5 to-secondary/10">
          {post.coverImage && (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
        </div>
      </ViewTransition>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <time className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
          {formatDate(post.date, locale)}
        </time>

        <h2 className="mt-2 text-base font-semibold leading-snug text-neutral-900 dark:text-white">
          {post.title}
        </h2>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          {post.summary}
        </p>

        {post.tags.length > 0 && (
          <div className="mt-4">
            <TagList tags={post.tags} tone="neutral" />
          </div>
        )}

        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary transition-opacity hover:opacity-75"
        >
          {readMore}
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const c = copy[locale];
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
      <SectionHeader eyebrow={c.eyebrow} title={c.title} description={c.description} />

      <div className="mt-16">
        {posts.length === 0 ? (
          <div className="rounded-sm border border-dashed border-(--border-color) px-8 py-12 text-center">
            <p className="text-sm text-neutral-400 dark:text-neutral-500">{c.empty}</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} locale={locale} readMore={c.readMore} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
