import { ViewTransition } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import TagList from "@/components/shared/TagList";
import { getAllPosts, getPostMeta, formatDate } from "@/lib/blog";
import type { Locale } from "@/lib/content";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostMeta(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const locales: Locale[] = ["es", "en"];
  return locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug }))
  );
}

export const dynamicParams = false;

const backLabel: Record<Locale, string> = {
  es: "Volver al blog",
  en: "Back to blog",
};

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPostMeta(slug);
  if (!post) notFound();

  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);

  return (
    <div className="mx-auto max-w-215 px-6 py-16 md:py-24">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-primary dark:text-neutral-400"
      >
        <ArrowLeft size={14} />
        {backLabel[locale]}
      </Link>

      {/* Cover — same ViewTransition name as the card: browser morphs between positions */}
      <ViewTransition name={`blog-cover-${slug}`} share="morph">
        <div className="relative mt-8 h-56 w-full overflow-hidden rounded-sm bg-linear-to-br from-primary/15 via-primary/5 to-secondary/10 md:h-72">
          {post.coverImage && (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 860px) 100vw, 860px"
            />
          )}
        </div>
      </ViewTransition>

      <header className="mt-8 border-b border-(--border-color) pb-8">
        <time className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
          {formatDate(post.date, locale)}
        </time>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-neutral-900 dark:text-white md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
          {post.summary}
        </p>
        {post.tags.length > 0 && (
          <div className="mt-5">
            <TagList tags={post.tags} tone="blue" />
          </div>
        )}
      </header>

      <article className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
        <Content />
      </article>

      <div className="mt-16 border-t border-(--border-color) pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-primary dark:text-neutral-400"
        >
          <ArrowLeft size={14} />
          {backLabel[locale]}
        </Link>
      </div>
    </div>
  );
}
