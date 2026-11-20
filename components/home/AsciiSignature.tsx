"use client";

import { useEffect, useRef } from "react";

let introductionClaimed = false;

const REVEAL_DURATION = 5000;
const NAVIGATION_REVEAL_DELAY = 4000;

export default function AsciiSignature() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playRef = useRef<boolean | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    if (playRef.current === null) {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      const initialPath = new URL(navigation?.name ?? window.location.href).pathname;
      playRef.current = !introductionClaimed && /\/(es|en)\/about\/?$/.test(initialPath);
      introductionClaimed = true;
    }
    const shouldAnimate = playRef.current;
    startRef.current ??= performance.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const background = canvas.parentElement;
    const section = background?.parentElement;
    if (!background || !section) return;
    let inView = true;
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; });
    observer.observe(section);

    const pointer = { x: -1000, y: -1000 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = -100;
    let points: { x: number; y: number; bit: string; seed: number }[] = [];
    let stars: { x: number; y: number; radius: number; opacity: number; phase: number; warm: boolean }[] = [];

    const prepare = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      if (!width || !height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      // Stable positions keep resizing from randomly rearranging the night sky.
      let seed = 4271;
      const random = () => {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        return seed / 4294967296;
      };
      stars = Array.from({ length: Math.min(520, Math.max(70, Math.round(width * height / 4500))) }, () => {
        const x = random() * width;
        const y = random() * height;
        const brightness = random();
        // Leave quieter space around the binary wordmark.
        const centerFade = Math.abs(y / height - 0.5) < 0.16 ? 0.6 : 1;
        return {
          x, y,
          radius: brightness > 0.94 ? 1.25 : 0.45 + random() * 0.5,
          opacity: (0.28 + brightness * 0.54) * centerFade,
          phase: random() * Math.PI * 2,
          warm: random() > 0.9,
        };
      });
      const mask = document.createElement("canvas");
      mask.width = Math.round(width);
      mask.height = Math.round(height);
      const ink = mask.getContext("2d");
      if (!ink) return;
      const word = "josueduardo.dev";
      ink.font = "900 100px Arial";
      const fontSize = Math.min(width * 0.92 / ink.measureText(word).width * 100, height * 0.35);
      ink.font = `900 ${fontSize}px Arial`;
      ink.textAlign = "center";
      ink.textBaseline = "middle";
      ink.fillText(word, width / 2, height / 2);
      const pixels = ink.getImageData(0, 0, mask.width, mask.height).data;
      const step = width < 600 ? 3 : 6;
      points = [];
      for (let y = 0; y < mask.height; y += step) {
        for (let x = 0; x < mask.width; x += step) {
          if (pixels[(y * mask.width + x) * 4 + 3] > 90) {
            const seed = ((x * 127 + y * 311) % 1009) / 1009;
            points.push({ x, y, bit: seed > 0.5 ? "1" : "0", seed });
          }
        }
      }
    };

    const drawSky = (elapsed: number, color: string, warmColor: string) => {
      for (const star of stars) {
        // Nearby stars drift slightly faster; wrapping happens outside the viewport.
        const drift = reducedMotion.matches ? 0 : elapsed / 1000 * (1.8 + star.radius * 2.8);
        const x = (star.x + drift + 8) % (width + 16) - 8;
        const y = (star.y + drift * 0.25 + 8) % (height + 16) - 8;
        const shimmer = reducedMotion.matches ? 1 : 0.88 + Math.sin(elapsed / 2800 + star.phase) * 0.12;
        const tint = star.warm ? warmColor : color;
        const opacity = star.opacity * shimmer;
        // The brightest stars have a small, soft halo around a crisp point.
        if (star.radius > 1) {
          const halo = context.createRadialGradient(x, y, 0, x, y, 4);
          halo.addColorStop(0, `rgba(${tint}, ${opacity * 0.22})`);
          halo.addColorStop(1, `rgba(${tint}, 0)`);
          context.fillStyle = halo;
          context.beginPath();
          context.arc(x, y, 4, 0, Math.PI * 2);
          context.fill();
        }
        context.fillStyle = `rgba(${tint}, ${opacity})`;
        context.beginPath();
        context.arc(x, y, star.radius, 0, Math.PI * 2);
        context.fill();
      }

      if (reducedMotion.matches || elapsed < 9000) return;
      // An occasional comet crosses the sky after the name has formed.
      const cycle = Math.floor((elapsed - 9000) / 18000);
      const progress = ((elapsed - 9000) % 18000) / 1400;
      if (progress >= 1) return;
      const direction = cycle % 2 === 0 ? 1 : -1;
      const origin = direction === 1 ? 0.16 + (cycle % 3) * 0.12 : 0.82;
      const travel = Math.min(width * 0.25, 320);
      const x = width * origin + progress * travel * direction;
      const y = height * (0.12 + (cycle % 3) * 0.07) + progress * travel * 0.45;
      const tail = Math.min(110, width * 0.14) * Math.min(1, progress * 5);
      const opacity = Math.sin(progress * Math.PI) * 0.5;
      const tailX = x - tail * direction;
      const tailY = y - tail * 0.45;
      const trail = context.createLinearGradient(tailX, tailY, x, y);
      trail.addColorStop(0, `rgba(${color}, 0)`);
      trail.addColorStop(1, `rgba(${color}, ${opacity})`);
      context.strokeStyle = trail;
      context.lineWidth = 0.9;
      context.beginPath();
      context.moveTo(tailX, tailY);
      context.lineTo(x, y);
      context.stroke();
      context.fillStyle = `rgba(${color}, ${opacity * 1.4})`;
      context.beginPath();
      context.arc(x, y, 0.9, 0, Math.PI * 2);
      context.fill();
    };

    const draw = (time: number) => {
      const elapsed = time - (startRef.current ?? time);
      if (!shouldAnimate || reducedMotion.matches || elapsed >= NAVIGATION_REVEAL_DELAY) {
        document.documentElement.dataset.introNavigationReady = "true";
      }
      if (inView && !document.hidden && time - lastTime >= 32) {
        lastTime = time;
        const progress = !shouldAnimate || reducedMotion.matches ? 1 : Math.min(1, elapsed / REVEAL_DURATION);
        if (progress === 1 && background.dataset.settled !== "true") {
          background.dataset.settled = "true";
        }
        context.clearRect(0, 0, width, height);
        const style = getComputedStyle(canvas);
        drawSky(elapsed, style.getPropertyValue("--sky-color").trim(), style.getPropertyValue("--sky-warm-color").trim());
        context.fillStyle = style.color;
        context.font = `${width < 600 ? 3 : 6}px monospace`;
        for (const point of points) {
          // Every bit settles into its final position by exactly five seconds.
          const local = Math.min(1, Math.max(0, (progress - point.seed * 0.55) / 0.45));
          if (local === 0) continue;
          const ease = 1 - Math.pow(1 - local, 3);
          const scatter = (1 - ease) * Math.min(height * 0.42, 240);
          const dx = point.x - pointer.x;
          const dy = point.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          const force = !reducedMotion.matches && progress === 1 && distance < 90 ? (90 - distance) * 0.25 : 0;
          context.globalAlpha = ease;
          context.fillText(point.bit, point.x + Math.sin(point.seed * 80) * scatter + dx / (distance || 1) * force, point.y + Math.cos(point.seed * 60) * scatter + dy / (distance || 1) * force);
        }
        context.globalAlpha = 1;
      }
      frame = requestAnimationFrame(draw);
    };
    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const leave = () => { pointer.x = -1000; pointer.y = -1000; };
    const resize = new ResizeObserver(prepare);
    resize.observe(canvas);
    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    prepare();
    canvas.parentElement?.setAttribute("data-ready", "true");
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
      canvas.parentElement?.removeAttribute("data-ready");
      background.removeAttribute("data-settled");
      document.documentElement.dataset.introNavigationReady = "true";
      observer.disconnect();
    };
  }, []);

  return (
    <div className="binary-background" aria-hidden="true">
      <canvas ref={canvasRef} className="binary-background__canvas" />
    </div>
  );
}
