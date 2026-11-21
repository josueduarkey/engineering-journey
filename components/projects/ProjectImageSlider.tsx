"use client";

import { ViewTransition, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/content";
import type { ProjectGalleryImage } from "@/lib/project-gallery";

export default function ProjectImageSlider({ images, locale, slug, title, sizes = "(min-width: 948px) 900px, calc(100vw - 48px)" }: {
  images: ProjectGalleryImage[];
  locale: Locale;
  slug: string;
  title: string;
  sizes?: string;
}) {
  const [active, setActive] = useState(0);
  const [aspectRatios, setAspectRatios] = useState<Record<string, number>>({});
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const es = locale === "es";
  const index = Math.min(active, Math.max(0, images.length - 1));
  const move = (direction: number) => setActive((current) => Math.max(0, Math.min(images.length - 1, current + direction)));
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setActive(event.key === "Home" ? 0 : images.length - 1);
    }
  };
  const onTouchEnd = (event: TouchEvent) => {
    if (!touchStart.current) return;
    const dx = event.changedTouches[0].clientX - touchStart.current.x;
    const dy = event.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
    touchStart.current = null;
  };
  if (images.length === 0) return null;

  return (
    <section
      className="project-slider"
      aria-label={`${es ? "Capturas de" : "Screenshots of"} ${title}`}
      aria-roledescription={es ? "carrusel" : "carousel"}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <ViewTransition name={`project-cover-${slug}`} share="project-morph">
        <div
          className="project-slider-viewport"
          style={{ aspectRatio: aspectRatios[images[index].src] ?? 16 / 10 }}
          onTouchStart={(event) => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
          onTouchEnd={onTouchEnd}
          onTouchCancel={() => { touchStart.current = null; }}
        >
          <div className="project-slider-track" style={{ transform: `translateX(-${index * 100}%)` }}>
            {images.map((capture, slide) => (
              <div key={capture.src} className="project-slider-slide" role="group" aria-roledescription={es ? "diapositiva" : "slide"} aria-label={`${slide + 1} ${es ? "de" : "of"} ${images.length}`} aria-hidden={slide !== index}>
                <Image src={capture.src} alt={capture.alt[locale]} fill preload={slide === 0} loading={slide === 0 ? undefined : "eager"} sizes={sizes} className="object-contain object-center" onLoad={({ currentTarget }) => {
                  const ratio = currentTarget.naturalWidth / currentTarget.naturalHeight;
                  if (Number.isFinite(ratio) && ratio > 0) {
                    setAspectRatios((current) => current[capture.src] === ratio ? current : { ...current, [capture.src]: ratio });
                  }
                }} />
              </div>
            ))}
          </div>
        </div>
      </ViewTransition>
      <div className="project-slider-controls">
        <p aria-live="polite" aria-atomic="true" className="project-slider-caption">
          <span className="tabular-nums">{index + 1} / {images.length}</span>
          <span>{images[index].caption?.[locale] ?? images[index].alt[locale]}</span>
        </p>
        {images.length > 1 && <div className="flex shrink-0 gap-2">
          <button type="button" disabled={index === 0} onClick={() => move(-1)} aria-label={es ? "Imagen anterior" : "Previous image"}><ArrowLeft size={18} aria-hidden="true" /></button>
          <button type="button" disabled={index === images.length - 1} onClick={() => move(1)} aria-label={es ? "Imagen siguiente" : "Next image"}><ArrowRight size={18} aria-hidden="true" /></button>
        </div>}
      </div>
      {images.length > 1 && <div className="project-slider-dots" role="group" aria-label={es ? "Elegir captura" : "Choose screenshot"}>
        {images.map((capture, slide) => <button key={capture.src} type="button" aria-label={`${es ? "Ver imagen" : "View image"} ${slide + 1}`} aria-pressed={slide === index} onClick={() => setActive(slide)}><span aria-hidden="true" /></button>)}
      </div>}
    </section>
  );
}
