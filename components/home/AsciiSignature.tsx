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

    const prepare = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      if (!width || !height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
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

    const draw = (time: number) => {
      const elapsed = time - (startRef.current ?? time);
      if (!shouldAnimate || reducedMotion.matches || elapsed >= NAVIGATION_REVEAL_DELAY) {
        document.documentElement.dataset.introNavigationReady = "true";
      }
      if (inView && time - lastTime >= 32) {
        lastTime = time;
        const progress = !shouldAnimate || reducedMotion.matches ? 1 : Math.min(1, elapsed / REVEAL_DURATION);
        if (progress === 1 && background.dataset.settled !== "true") {
          background.dataset.settled = "true";
        }
        context.clearRect(0, 0, width, height);
        context.fillStyle = getComputedStyle(canvas).color;
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
