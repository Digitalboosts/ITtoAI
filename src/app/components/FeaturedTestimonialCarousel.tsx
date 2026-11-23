'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { StarRating } from './TestimonialCard';
import type { Testimonial } from '@/app/success-stories/data';

const AUTO_ADVANCE_MS = 6000;

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export default function FeaturedTestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (i: number) => setIndex(((i % testimonials.length) + testimonials.length) % testimonials.length),
    [testimonials.length]
  );

  useEffect(() => {
    if (testimonials.length <= 1 || paused) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [testimonials.length, paused]);

  if (testimonials.length === 0) return null;
  const testimonial = testimonials[index];
  const { name, photo, quote, priorRole, newRole, company, rating, result } = testimonial;

  return (
    <div
      className="relative bg-card rounded-2xl border border-border shadow-card p-8 sm:p-10 lg:p-12 max-w-3xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Icon
        name="ChatBubbleBottomCenterTextIcon"
        variant="solid"
        size={36}
        className="text-accent/10 absolute top-8 right-8 hidden sm:block"
        aria-hidden="true"
      />

      <p key={testimonial.id} className="text-lg sm:text-xl text-foreground leading-relaxed mb-8 pr-0 sm:pr-10 animate-in-up">
        &ldquo;{quote}&rdquo;
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        <div className="flex-1 min-w-[130px] rounded-xl border border-border bg-secondary px-4 py-3 text-center">
          <p className="text-sm font-700 text-foreground truncate">{priorRole}</p>
          <p className="text-2xs text-muted-foreground uppercase tracking-wide mt-0.5">Before</p>
        </div>
        <div
          className="flex-1 min-w-[130px] rounded-xl border px-4 py-3 text-center"
          style={{ borderColor: 'rgba(37,99,235,0.2)', background: 'rgba(37,99,235,0.06)' }}
        >
          <p className="text-sm font-700 text-accent truncate">{newRole}</p>
          <p className="text-2xs text-muted-foreground uppercase tracking-wide mt-0.5">After</p>
        </div>
        {result && (
          <div className="flex-1 min-w-[130px] rounded-xl border border-border bg-secondary px-4 py-3 text-center">
            <p className="text-sm font-700 text-foreground truncate">{result}</p>
            <p className="text-2xs text-muted-foreground uppercase tracking-wide mt-0.5">Result</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          {photo ? (
            <AppImage src={photo} alt={name} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
          ) : (
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-700 text-accent flex-shrink-0"
              style={{ background: 'rgba(37,99,235,0.1)' }}
              aria-hidden="true"
            >
              {getInitials(name)}
            </div>
          )}
          <div>
            <p className="text-sm font-700 text-foreground">{name}</p>
            <p className="text-xs text-muted">
              {newRole}
              {company ? ` at ${company}` : ''}
            </p>
          </div>
        </div>
        <StarRating rating={rating} />
      </div>

      {testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous testimonial"
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <Icon name="ChevronLeftIcon" size={16} aria-hidden="true" />
          </button>
          <span className="text-xs text-muted-foreground tabular-nums" aria-live="polite">
            {index + 1} / {testimonials.length}
          </span>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next testimonial"
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <Icon name="ChevronRightIcon" size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
