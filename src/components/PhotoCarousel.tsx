import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type PhotoCarouselImage = {
  src: string;
  alt: string;
};

type PhotoCarouselProps = {
  images: PhotoCarouselImage[];
  className?: string;
};

export default function PhotoCarousel({ images, className }: PhotoCarouselProps) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const normalizeIndex = (idx: number) => {
    if (safeImages.length === 0) return 0;
    return ((idx % safeImages.length) + safeImages.length) % safeImages.length;
  };

  const prev = () => setActiveIndex((i) => normalizeIndex(i - 1));
  const next = () => setActiveIndex((i) => normalizeIndex(i + 1));
  const goTo = (idx: number) => setActiveIndex(normalizeIndex(idx));

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return;

    const apply = () => setPrefersReducedMotion(!!mq.matches);
    apply();

    // Safari fallback (older versions may not support addEventListener here).
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', apply);
      return () => mq.removeEventListener('change', apply);
    }

    mq.addListener(apply);
    return () => mq.removeListener(apply);
  }, []);

  useEffect(() => {
    if (safeImages.length <= 1) return;
    if (isPaused) return;
    if (prefersReducedMotion) return;

    const AUTOPLAY_MS = 2000;
    const id = window.setInterval(() => {
      next();
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [safeImages.length, isPaused, prefersReducedMotion]);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    touchStartY.current = e.touches[0]?.clientY ?? null;
    setIsPaused(true);
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (safeImages.length <= 1) return;

    const endX = e.changedTouches[0]?.clientX ?? null;
    const endY = e.changedTouches[0]?.clientY ?? null;
    const startX = touchStartX.current;
    const startY = touchStartY.current;

    // Reset immediately to avoid accidental reuse.
    touchStartX.current = null;
    touchStartY.current = null;

    if (startX == null || startY == null || endX == null || endY == null) return;

    const dx = endX - startX;
    const dy = endY - startY;

    // Ignore mostly-vertical swipes.
    if (Math.abs(dy) > Math.abs(dx)) return;

    const SWIPE_THRESHOLD_PX = 40;
    if (dx > SWIPE_THRESHOLD_PX) prev();
    else if (dx < -SWIPE_THRESHOLD_PX) next();

    setIsPaused(false);
  };

  if (safeImages.length === 0) return null;

  return (
    <div
      className={[
        'rounded-2xl overflow-hidden shadow-2xl aspect-4/5 relative select-none',
        className ?? '',
      ].join(' ')}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Wedding photo carousel"
    >
      <div
        className="flex h-full transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {safeImages.map((img, idx) => (
          <div key={img.src + idx} className="min-w-full h-full relative">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
              draggable={false}
              loading={idx === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />

      {safeImages.length > 1 ? (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/55 text-white backdrop-blur"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/55 text-white backdrop-blur"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-2 px-3">
            {safeImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === activeIndex ? 'true' : 'false'}
                className={[
                  'w-2.5 h-2.5 rounded-full transition-colors',
                  idx === activeIndex ? 'bg-brand-red' : 'bg-white/50 hover:bg-white/70',
                ].join(' ')}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

