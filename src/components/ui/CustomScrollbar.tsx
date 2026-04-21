'use client';

import { useEffect, useRef, useState } from 'react';

interface CustomScrollbarProps {
  scrollContainerRef: React.RefObject<HTMLElement | null>;
  variant?: 'page' | 'card';
  className?: string;
  thumbColor?: string;
  thumbHoverColor?: string;
  thumbWidth?: number;
  trackColorLight?: string;
  trackColorDark?: string;
}

const MIN_THUMB_SIZE = 40;
const DEFAULT_SCROLLBAR_WIDTH = 9;
const MIN_SCROLLBAR_WIDTH = 6;
const MAX_SCROLLBAR_WIDTH = 14;
const RIGHT_OFFSET_PX = 3;
const VISIBILITY_THRESHOLD_PX = 5;

export function CustomScrollbar({
  scrollContainerRef,
  variant = 'page',
  className = '',
  thumbColor = '#d32f2f',
  thumbHoverColor,
  thumbWidth = DEFAULT_SCROLLBAR_WIDTH,
  trackColorLight = 'rgba(0, 0, 0, 0.05)',
  trackColorDark = 'rgba(255, 255, 255, 0.05)',
}: CustomScrollbarProps) {
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia('(min-width: 768px)').matches;
  });

  const dragStart = useRef<{ offsetY: number; scrollTop: number; pointerY: number }>({
    offsetY: 0,
    scrollTop: 0,
    pointerY: 0,
  });
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isDesktop) return;

    const updateThumb = () => {
      const { scrollHeight, clientHeight, scrollTop } = container;
      const trackHeight = trackRef.current?.clientHeight ?? clientHeight;
      const thumb = Math.max((clientHeight / scrollHeight) * trackHeight, MIN_THUMB_SIZE);
      const maxThumbTop = Math.max(trackHeight - thumb, 0);
      const newTop =
        scrollHeight === clientHeight
          ? 0
          : Math.min((scrollTop / (scrollHeight - clientHeight)) * maxThumbTop, maxThumbTop);
      const nextThumbHeight = Number.isFinite(thumb) ? thumb : MIN_THUMB_SIZE;
      const nextThumbTop = Number.isFinite(newTop) ? newTop : 0;
      const nextIsVisible = scrollHeight - clientHeight > VISIBILITY_THRESHOLD_PX;
      setThumbHeight((prev) => (prev === nextThumbHeight ? prev : nextThumbHeight));
      setThumbTop((prev) => (prev === nextThumbTop ? prev : nextThumbTop));
      setIsVisible((prev) => (prev === nextIsVisible ? prev : nextIsVisible));
    };

    updateThumb();

    const resolveContentTarget = () => {
      if (variant === 'page') {
        const mainElement = Array.from(container.children).find(
          (child) => child instanceof HTMLElement && child.tagName === 'MAIN'
        );
        if (mainElement instanceof HTMLElement) return mainElement;
      }
      return container.firstElementChild instanceof HTMLElement ? container.firstElementChild : null;
    };

    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateThumb) : null;
    let observedContentTarget: HTMLElement | null = null;
    const syncObservedContentTarget = () => {
      const nextTarget = resolveContentTarget();
      if (!resizeObserver) {
        observedContentTarget = nextTarget;
        return;
      }
      if (observedContentTarget && observedContentTarget !== nextTarget) {
        resizeObserver.unobserve(observedContentTarget);
      }
      if (nextTarget && observedContentTarget !== nextTarget) {
        resizeObserver.observe(nextTarget);
      }
      observedContentTarget = nextTarget;
    };

    resizeObserver?.observe(container);
    syncObservedContentTarget();

    const mutationObserver = typeof MutationObserver !== 'undefined'
      ? new MutationObserver(() => {
          syncObservedContentTarget();
          updateThumb();
        })
      : null;
    mutationObserver?.observe(container, { childList: true });

    container.addEventListener('scroll', updateThumb, { passive: true });
    window.addEventListener('resize', updateThumb);

    return () => {
      mutationObserver?.disconnect();
      resizeObserver?.disconnect();
      container.removeEventListener('scroll', updateThumb);
      window.removeEventListener('resize', updateThumb);
    };
  }, [scrollContainerRef, isDesktop, variant]);

  useEffect(() => {
    if (!isDragging || !isDesktop) return;
    const container = scrollContainerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const handleMouseMove = (event: MouseEvent) => {
      const { clientHeight, scrollHeight } = container;
      const trackRect = track.getBoundingClientRect();
      const trackHeight = trackRect.height;
      const maxThumbTop = Math.max(trackHeight - thumbHeight, 0);
      const scrollableHeight = Math.max(scrollHeight - clientHeight, 0);
      if (maxThumbTop === 0 || scrollableHeight === 0) {
        container.scrollTo({ top: 0, behavior: 'auto' });
        setThumbTop(0);
        return;
      }
      const deltaY = event.clientY - dragStart.current.pointerY;
      const pixelsPerScrollUnit = scrollableHeight / maxThumbTop;
      const nextScrollTop = Math.min(
        Math.max(dragStart.current.scrollTop + deltaY * pixelsPerScrollUnit, 0),
        scrollableHeight
      );
      const nextThumbTop = (nextScrollTop / scrollableHeight) * maxThumbTop;
      container.scrollTo({ top: nextScrollTop, behavior: 'auto' });
      setThumbTop((prev) => (prev === nextThumbTop ? prev : nextThumbTop));
    };

    const handleMouseUp = () => setIsDragging(false);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, thumbHeight, isDesktop, scrollContainerRef]);

  if (!isDesktop || !isVisible) return null;

  const interactiveState = isHovering || isDragging;
  const currentThumbColor = interactiveState && thumbHoverColor ? thumbHoverColor : thumbColor;
  const resolvedThumbWidth = Math.min(Math.max(thumbWidth, MIN_SCROLLBAR_WIDTH), MAX_SCROLLBAR_WIDTH);
  const resolvedTrackColor = trackColorLight || trackColorDark;

  const wrapperClasses = [
    'pointer-events-none hidden md:flex z-30 items-start justify-end',
    variant === 'card' ? 'absolute inset-y-0 right-0' : 'fixed inset-y-0 right-0',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses} aria-hidden>
      <div className="relative h-full" style={{ width: `${resolvedThumbWidth + RIGHT_OFFSET_PX}px` }}>
        <div className="absolute inset-y-0" style={{ right: RIGHT_OFFSET_PX, width: `${resolvedThumbWidth}px` }}>
          <div
            ref={trackRef}
            className="relative h-full w-full rounded-full"
            style={{ backgroundColor: resolvedTrackColor }}
          >
            <div
              className="absolute left-0 w-full"
              style={{ height: `${thumbHeight}px`, top: `${thumbTop}px` }}
            >
              <div
                className="pointer-events-auto w-full h-full rounded-full shadow-md transition-transform transition-colors duration-200 ease-in-out"
                style={{
                  backgroundColor: currentThumbColor,
                  transform: `scale(${interactiveState ? 1.04 : 1})`,
                  filter: interactiveState ? 'brightness(1.05)' : 'none',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.16)',
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseDown={(event) => {
                  event.preventDefault();
                  const thumbRect = event.currentTarget.getBoundingClientRect();
                  const container = scrollContainerRef.current;
                  if (!container) return;
                  dragStart.current = {
                    offsetY: event.clientY - thumbRect.top,
                    scrollTop: container.scrollTop,
                    pointerY: event.clientY,
                  };
                  setIsDragging(true);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
