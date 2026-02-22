import { useEffect, useRef, useState } from "react";

const defaultOptions: IntersectionObserverInit = {
  rootMargin: "0px 0px -60px 0px",
  threshold: 0.1,
};

export function useInView(options?: Partial<IntersectionObserverInit>) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const opts = { ...defaultOptions, ...options };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) setInView(true);
    }, opts);
    observer.observe(el);
    return () => observer.disconnect();
  }, [opts.rootMargin, opts.threshold]);

  return { ref, inView };
}
