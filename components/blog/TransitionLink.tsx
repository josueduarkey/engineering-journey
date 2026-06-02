"use client";

import { useRouter } from "@/i18n/navigation";

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export default function TransitionLink({ href, className, children }: Props) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (!("startViewTransition" in document)) {
      router.push(href);
      return;
    }

    // router.push queues a React update in a microtask.
    // startViewTransition captures the new DOM on the next animation frame,
    // which runs AFTER microtasks — so React finishes rendering before the
    // browser takes the "new" screenshot. startTransition breaks this because
    // it defers React's update past the animation frame.
    document.startViewTransition(() => {
      router.push(href);
    });
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
